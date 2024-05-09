package com.a508.gameservice.game.service;

import com.a508.gameservice.exception.CustomException;
import com.a508.gameservice.exception.ErrorCode;
import com.a508.gameservice.game.data.*;
import com.a508.gameservice.game.domain.BattleRecord;
import com.a508.gameservice.game.domain.GameRoom;
import com.a508.gameservice.game.repository.BattleRecordRepository;
import com.a508.gameservice.game.repository.GameRoomRepository;
import com.a508.gameservice.game.repository.GameRoomTemplateRepository;
import com.a508.gameservice.game.repository.RoomPlayerRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class GameRoomService {

    private final GameRoomRepository gameRoomRepository;
    private final GameRoomTemplateRepository gameRoomTemplateRepository;
    private final RoomPlayerRepository roomPlayerRepository;
    private final UserServiceClient userServiceClient;
    private final BattleRecordRepository battleRecordRepository;
    private static final String AUTHORIZATION_HEADER = "Authorization";

    /**
     * 방 전체 목록 페이지별 반환
     */
    public List<GameRoomRes> getRooms(int pageNum) {
        Pageable pageable = PageRequest.of(pageNum - 1, 6, Sort.by("id").ascending());
        Page<GameRoom> gameRoomList = gameRoomRepository.findAll(pageable);
        Boolean isEndPage = false;
        if (pageNum == gameRoomList.getTotalPages()) isEndPage = true;
        List<GameRoomRes> gameRoomResList = new ArrayList<>();
        List<Integer> userIdList = new ArrayList<>();
        for (int i = 0; i < gameRoomList.getContent().size(); i++) {
            userIdList.add(gameRoomList.getContent().get(i).getRoomCreatorId());
        }
        UserListRes userListRes = userServiceClient.getNicknameByUserId(UserListReq.builder().idList(userIdList).build());
        List<String> nicknameList=userListRes.getNicknameList();
        for (int i = 0; i < gameRoomList.getContent().size(); i++) {
            GameRoom gameRoom= gameRoomList.getContent().get(i);
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
                    .isEndPage(isEndPage)
                    .build();
            gameRoomResList.add(gameRoomRes);
        }

        return gameRoomResList;
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
        gameRoomRepository.save(gameRoom);
        //방 입장
        roomPlayerRepository.addPlayerToRoom(String.valueOf(roomId), userId);

        return JoinRoomRes.builder()
                .myNickname(userServiceClient.getNicknameByUserId(userId))
                .myUserId(userId)
                .roomId(roomId)
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
        Set<Integer> idList = gameRoomTemplateRepository.getAllIds();
        int num = 1;
        while (true) {
            if (!idList.contains(num)) return num;
            num += 1;
        }
    }

    /**
     * 방에 회원넣기
     */
    public synchronized void createRoomPlayer(HttpServletRequest request, Integer roomId) {
        int userId = getUserId(request);
        if (roomPlayerRepository.playerCnt(String.valueOf(roomId)) < gameRoomRepository.findById(String.valueOf(roomId)).orElseThrow().getMaxNum()) {
            roomPlayerRepository.addPlayerToRoom(String.valueOf(roomId), userId);
        } else {
            throw new CustomException(ErrorCode.PLAYER_IS_FULL_ERROR);
        }
    }

    public JoinRoomRes getRoomInfo(HttpServletRequest request, Integer roomId) {
        int userId = getUserId(request);
        GameRoom gameRoom = gameRoomRepository.findById(String.valueOf(roomId)).orElseThrow();
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
                .myUserId(userId)
                .myNickname(myNickname)
                .quizCount(gameRoom.getQuizCount())
                .maxNum(gameRoom.getMaxNum())
                .creatorId(gameRoom.getRoomCreatorId())
                .roomPlayerRes(roomPlayerResList)
                .build();
    }

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
        for (int i = 0; i < (battleRecords.size() > 100 ? 100 : battleRecords.size()); i++) {
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

    public int getUserId(HttpServletRequest request) {
        String accessToken = request.getHeader(AUTHORIZATION_HEADER).substring(7);
        return userServiceClient.getUserIdByToken(accessToken);
    }
}
