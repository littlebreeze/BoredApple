package com.a508.gameservice.game.service;

import com.a508.gameservice.exception.CustomException;
import com.a508.gameservice.exception.ErrorCode;
import com.a508.gameservice.game.data.*;
import com.a508.gameservice.game.domain.BattleRecord;
import com.a508.gameservice.game.domain.GameRoom;
import com.a508.gameservice.game.domain.RoomPlayer;
import com.a508.gameservice.game.repository.BattleRecordRepository;
import com.a508.gameservice.game.repository.GameRoomRepository;
import com.a508.gameservice.game.repository.RoomPlayerRepository;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GameRoomService {


    private final GameRoomRepository gameRoomRepository;
    private final RoomPlayerRepository roomPlayerRepository;
    private final UserServiceClient userServiceClient;
    private final BattleRecordRepository battleRecordRepository;
    private final GameSchedulerManageService gameSchedulerManageService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private static final String AUTHORIZATION_HEADER = "Authorization";

    /**
     * 방 전체 목록 페이지별 반환
     */
    public GameRoomListRes getRooms(int pageNum) {

        PageRoomListDTO pageRoomListDTO = gameRoomRepository.getGameRoomsByPage(pageNum);

        List<GameRoom> gameRoomList = pageRoomListDTO.getGameRoomList();
        List<GameRoomRes> gameRoomResList = new ArrayList<>();
        List<Integer> userIdList = new ArrayList<>();

        for (int i = 0; i < gameRoomList.size(); i++) {
            userIdList.add(gameRoomList.get(i).getRoomCreatorId());
        }

        UserListRes userListRes = userServiceClient.getNicknameByUserId(UserListReq.builder().idList(userIdList).build());

        List<String> nicknameList = userListRes.getNicknameList();
        for (int i = 0; i < gameRoomList.size(); i++) {
            GameRoom gameRoom = gameRoomList.get(i);
            if (gameRoom != null) {
                GameRoomRes gameRoomRes = GameRoomRes.builder()
                        .id(gameRoom.getId())
                        .roomName(gameRoom.getRoomName())
                        .isSecret(gameRoom.getIsSecret())
                        .roomPassword(gameRoom.getRoomPassword())
                        .roomCreatorName(nicknameList.get(i))
                        .nowNum(roomPlayerRepository.playerCnt(gameRoom.getId()))
                        .maxNum(gameRoom.getMaxNum())
                        .quizCount(gameRoom.getQuizCount())
                        .isStarted(gameRoom.getIsStarted())
                        .build();
                gameRoomResList.add(gameRoomRes);
            }
        }

        return GameRoomListRes.builder()
                .gameRoomResList(gameRoomResList)
                .isEndPage(pageRoomListDTO.getIsEndPage())
                .build();
    }

    /**
     * 방 생성
     */
    public synchronized JoinRoomRes createRoom(HttpServletRequest request, GameRoomReq gameRoomReq) {

        int userId = getUserId(request);
        int roomId = getMinRoomId();
        //방 생성
        GameRoom gameRoom = GameRoom.builder()
                .id(String.valueOf(roomId))
                .roomName(gameRoomReq.getRoomName())
                .roomPassword(gameRoomReq.getRoomPassword())
                .roomCreatorId(userId)
                .quizCount(gameRoomReq.getQuizCount())
                .isSecret(gameRoomReq.getIsSecret())
                .isStarted(false)
                .maxNum(gameRoomReq.getMaxNum()).build();

        gameRoomRepository.saveGameRoom(gameRoom);
        //방 입장
        RoomPlayer roomPlayer = RoomPlayer.builder().userId(userId)
                .joinGameTime(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .build();
        roomPlayerRepository.addPlayerToRoom(String.valueOf(roomId), userId, roomPlayer);

        return JoinRoomRes.builder()
                .myNickname(userServiceClient.getNicknameByUserId(userId))
                .myUserId(userId)
                .roomId(roomId)
                .roomName(gameRoomReq.getRoomName())
                .maxNum(gameRoomReq.getMaxNum())
                .quizCount(gameRoomReq.getQuizCount())
                .creatorId(userId)
                .roomPlayerRes(null)
                .build();
    }

    /**
     * 방번호 작은 값 배정
     */
    public Integer getMinRoomId() {
        Set<Integer> idList = gameRoomRepository.getAllIds();
        int num = 1;
        while (true) {
            if (!idList.contains(num)) return num;
            num += 1;
        }
    }

    /**
     * 방에 회원넣기
     */
    public synchronized boolean createRoomPlayer(HttpServletRequest request, Integer roomId, boolean type) {
        int userId = getUserId(request);
        GameRoom gameRoom = gameRoomRepository.getGameRoom(String.valueOf(roomId));
        if (roomPlayerRepository.playerCnt(String.valueOf(roomId)) < gameRoom.getMaxNum()) {
            if (gameRoom.getIsStarted()) {
                if (type)
                    throw new CustomException(ErrorCode.GAME_IS_STARTED);
                else {
                    return false;
                }
            }
            RoomPlayer roomPlayer = RoomPlayer.builder().userId(userId)
                    .joinGameTime(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .build();
            roomPlayerRepository.addPlayerToRoom(String.valueOf(roomId), userId, roomPlayer);
            return true;
        } else {
            if (type)
                throw new CustomException(ErrorCode.PLAYER_IS_FULL_ERROR);
            else {
                return false;
            }
        }

    }

    /**
     * 방정보
     */
    public JoinRoomRes getRoomInfo(HttpServletRequest request, Integer roomId) {
        int userId = getUserId(request);
        GameRoom gameRoom = gameRoomRepository.getGameRoom(String.valueOf(roomId));
        List<Integer> userIdList = new ArrayList<>();
        for (Object userIdStr : roomPlayerRepository.getPlayersInRoom(String.valueOf(roomId)).keySet()) {
            userIdList.add(Integer.parseInt(String.valueOf(userIdStr)));
        }
        List<String> nicknameList = userServiceClient.getNicknameByUserId(UserListReq.builder()
                .idList(userIdList)
                .build()
        ).getNicknameList();
        String myNickname = "";
        List<RoomPlayerRes> roomPlayerResList = new ArrayList<>();
        for (int i = 0; i < userIdList.size(); i++) {
            int id = userIdList.get(i);
            if (id == userId) myNickname = nicknameList.get(i);
            else roomPlayerResList.add(
                    RoomPlayerRes.builder()
                            .userId(id)
                            .nickname(nicknameList.get(i)).build());
        }
        return JoinRoomRes.builder()
                .roomId(roomId)
                .roomName(gameRoom.getRoomName())
                .myUserId(userId)
                .myNickname(myNickname)
                .quizCount(gameRoom.getQuizCount())
                .maxNum(gameRoom.getMaxNum())
                .creatorId(gameRoom.getRoomCreatorId())
                .roomPlayerRes(roomPlayerResList)
                .build();
    }

    /**
     * 랭킹 조회
     */
    public RankingRes getRankings(HttpServletRequest request) {
        int userId = getUserId(request);
        //일단 내 랭킹이있는지 확인
        BattleRecord myBattleRecord = battleRecordRepository.findById(userId).orElseGet(() ->
                battleRecordRepository.save(
                        BattleRecord.builder()
                                .id(userId)
                                .game(0)
                                .rating(1500)
                                .victory(0)
                                .build()
                )
        );
        Sort sort = Sort.by(Sort.Direction.DESC, "rating");
        List<BattleRecord> battleRecords = battleRecordRepository.findAll(sort);
        List<Integer> userIdList = new ArrayList<>();
        List<TopRankingRes> rankingList = new ArrayList<>();
        userIdList.add(userId); //0번 자리 본인

        for (int i = 0; i < (battleRecords.size() > 10 ? 10 : battleRecords.size()); i++) {
            userIdList.add(battleRecords.get(i).getId());
        }

        List<String> nicknameList = userServiceClient.getNicknameByUserId(
                UserListReq.builder().idList(userIdList).build()
        ).getNicknameList();

        for (int i = 0; i < (battleRecords.size() > 10 ? 10 : battleRecords.size()); i++) {
            BattleRecord battleRecord = battleRecords.get(i);
            rankingList.add(TopRankingRes.builder()
                    .ranking(i + 1)
                    .rating(battleRecord.getRating())
                    .nickname(nicknameList.get(i + 1))
                    .build());
        }
        Integer myRanking = -1;
        for (int i = 0; i < (battleRecords.size() > 99 ? 99 : battleRecords.size()); i++) {
            if (userId == battleRecords.get(i).getId()) {
                myRanking = i + 1;
            }
        }
        return RankingRes.builder()
                .myNickname(nicknameList.get(0))
                .myRanking(myRanking)
                .myRating(myBattleRecord.getRating())
                .rankingList(rankingList)
                .build();


    }

    /**
     * request->토큰으로 내 id 반환
     */
    public int getUserId(HttpServletRequest request) {
        String accessToken = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        return userServiceClient.getUserIdByToken(accessToken);
    }

    /**
     * 게임 상태 변경
     */
    public void updateIsStarted(Integer roomId,boolean isStarted) {
        gameRoomRepository.updateIsStarted(String.valueOf(roomId),isStarted);
    }


    public MyBattleRecordRes getMyRecord(String token) {
        int userId = userServiceClient.getUserIdByToken(token);
        BattleRecord myBattleRecord = battleRecordRepository.findById(userId).orElseGet(() ->
                battleRecordRepository.save(
                        BattleRecord.builder()
                                .id(userId)
                                .game(0)
                                .rating(1500)
                                .victory(0)
                                .build()
                )
        );

        Sort sort = Sort.by(Sort.Direction.DESC, "rating");
        List<BattleRecord> battleRecords = battleRecordRepository.findAll(sort);
        Integer myRanking = -1;
        for (int i = 0; i < (battleRecords.size() > 100 ? 100 : battleRecords.size()); i++) {
            if (userId == battleRecords.get(i).getId()) {
                myRanking = i + 1;
            }
        }
        int odds = 0;
        if (myBattleRecord.getGame() != 0) odds = myBattleRecord.getVictory() / myBattleRecord.getGame() * 100;

        return MyBattleRecordRes.builder()
                .game(myBattleRecord.getGame())
                .victory(myBattleRecord.getVictory())
                .rating(myBattleRecord.getRating())
                .ranking(myRanking)
                .odds(odds)
                .build();
    }


    /**
     * 게임 결과 조회
     */
    public List<ResultRes> getResult(ResultListReq resultListReq) {
        if (resultListReq.getResultReqList() == null || resultListReq.getResultReqList().isEmpty()) {
            throw new CustomException(ErrorCode.RESULT_IS_EMPTY);
        }

        List<List<Integer>> data = new ArrayList<>();
        for (ResultReq resultReq : resultListReq.getResultReqList()) {
            List<Integer> element = Arrays.asList(
                    resultReq.getRanking(), resultReq.getUserId(),
                    battleRecordRepository.findById(resultReq.getUserId()).orElseThrow().getRating());
            data.add(element);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<List<List<Integer>>> requestEntity = new HttpEntity<>(data, headers);
        // RestTemplate을 사용하여 HTTP 요청 보내기
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "http://k10a508.p.ssafy.io:8082/elo",
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        Gson gson = new Gson();
        Type type = new TypeToken<List<List<Integer>>>() {
        }.getType();

        //파이썬 서버 반환 - [랭킹, userId, 차이, 갱신레이팅]
        List<List<Integer>> resultList = gson.fromJson(response.getBody(), type);

        List<Integer> userIdList = new ArrayList<>();
        for (int i = 0; i < resultList.size(); i++) {
            userIdList.add(resultList.get(i).get(1));
        }
        List<String> userNicknameList = userServiceClient.getNicknameByUserId(
                UserListReq.builder().idList(userIdList).build()
        ).getNicknameList();

        List<ResultRes> resultResList = new ArrayList<>();
        for (int i = 0; i < resultList.size(); i++) {
            List<Integer> result = resultList.get(i);
            resultResList.add(ResultRes.builder()
                    .userNickname(userNicknameList.get(i))
                    .ranking(result.get(0))
                    .diff(result.get(2))
                    .rating(result.get(3))
                    .build());
            BattleRecord battleRecord = battleRecordRepository.findById(result.get(1)).orElseThrow();
            //db 업데이트
            if (result.get(0) == 1) {
                battleRecord.victoryUp();
            }
            battleRecord.gameUp();
            battleRecord.setRating(result.get(3));
            battleRecordRepository.save(battleRecord);
        }

        return resultResList;
    }


    /**
     * 게임방 퇴장
     */
    public void removeRoomPlayer(Integer roomId, Integer senderId) {
        String id = String.valueOf(roomId);
        //방에 나 혼자
        if (roomPlayerRepository.playerCnt(id) == 1) {
            gameRoomRepository.removeGameRoom(id);
            gameSchedulerManageService.removeRoom(roomId);
            roomPlayerRepository.removePlayerToRoom(id, senderId);
        }
        //내가 방장일 경우
        else if (gameRoomRepository.getGameRoom(id).getRoomCreatorId().equals(senderId)) {
            roomPlayerRepository.removePlayerToRoom(id, senderId);
            //방장 새로 지정
            List<RoomPlayer> roomPlayers = roomPlayerRepository.getRoomPlayers(id);
            List<RoomPlayerDateTimeDTO> dateList = new ArrayList<>();
            for (int i = 0; i < roomPlayers.size(); i++) {
                RoomPlayer roomPlayer = roomPlayers.get(i);
                LocalDateTime dateTime = LocalDateTime.parse(roomPlayer.getJoinGameTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);

                dateList.add(RoomPlayerDateTimeDTO.builder()
                        .userId(roomPlayer.getUserId())
                        .joinGameTime(dateTime)
                        .build()
                );
            }
            dateList.sort(Comparator.comparing(RoomPlayerDateTimeDTO::getJoinGameTime));
            GameRoom gameRoom = gameRoomRepository.getGameRoom(id);
            gameRoom.setRoomCreatorId(dateList.get(0).getUserId());
            gameRoomRepository.saveGameRoom(gameRoom);
            //방장 정보 새로 전송
            ChatMessageRes manager = ChatMessageRes.builder().type(MessageType.MANAGER).target(dateList.get(0).getUserId()).build();
            simpMessagingTemplate.convertAndSend("/topic/chat/rooms/" + roomId, manager);
        } else {
            roomPlayerRepository.removePlayerToRoom(id, senderId);
        }


    }

    /**
     * 빠른 입장
     */
    public int quickEntryPlayer(HttpServletRequest request) {
        String roomId = "";
        do {
            // isStarted, isSecret False인 방 List
            List<GameRoom> gameRoomList = gameRoomRepository.findQuickEntryGameRoom();
            if (gameRoomList.isEmpty()) {
                throw new CustomException(ErrorCode.QUICK_ENTRY_ROOM_IS_EMPTY);}
            SecureRandom secureRandom = new SecureRandom();
            int random = secureRandom.nextInt(gameRoomList.size());
            roomId = gameRoomList.get(random).getId();
        } while (!createRoomPlayer(request, Integer.parseInt(roomId), false));
        return Integer.parseInt(roomId);
    }
}