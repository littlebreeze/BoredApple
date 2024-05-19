package com.a508.studyservice.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;
import java.util.TreeSet;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a508.studyservice.dto.response.DayResponse;
import com.a508.studyservice.dto.response.MonthResponse;
import com.a508.studyservice.dto.response.TodayLearningResponse;
import com.a508.studyservice.dto.response.TotalResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.entity.Intensive;
import com.a508.studyservice.entity.SentenceInsert;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.entity.TopicProblem;
import com.a508.studyservice.feign.UserServiceFeignClient;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.EssayRepository;
import com.a508.studyservice.repository.IntensiveRepository;
import com.a508.studyservice.repository.SentenceInsertRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import com.a508.studyservice.repository.TopicRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TodayLearningServiceImpl implements TodayLearningService {

    private final TodayLearningRepository todayLearningRepository;
    //    private final UserServiceFeignClient userServiceFeignClient;
    private final ChoiceRepository choiceRepository;
    private final IntensiveRepository intensiveRepository;
    private final SentenceInsertRepository sentenceInsertRepository;
    private final TopicRepository topicRepository;
    private final UserServiceFeignClient userServiceFeignClient;
    private final EssayRepository essayRepository;

    private static final List<String> categories = new ArrayList<>(Arrays.asList("인문", "사회", "과학", "예술", "기술"));
    @Override
        public List<TodayLearningResponse> getTodayLearning(String token) {

        int userId = 0;
        log.info(token);
        if( token != null && token.length() >25) {
            String actualToken = token.substring(7);
            userId = userServiceFeignClient.getUserId(actualToken);}
        log.info("userId = " + userId );
        log.info(" token 정보가 들어옵니다. ");
            List<String> personalCategories = new ArrayList<>();
            /*
            Feign 을 통한 token 로직 추가되어야 함.
            필요한 거 userId, 선호 카테고리
             */
            LocalDateTime date = LocalDateTime.now();
            LocalDateTime startDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MIN); // 오늘의 시작
            LocalDateTime endDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MAX); // 오늘의 끝

            List<TodayLearningResponse> todayLearningResponses = new ArrayList<>();

            List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetween(userId,startDate,endDate);
            log.info(String.valueOf(todayLearnings));


            if(todayLearnings.isEmpty()){
                log.warn(" 해당 유저는 신규 가입 유저거나 GUEST 입니다. ");
               TodayLearningResponse dummy1 = todayLearningFactory("정독훈련","인문");
               TodayLearningResponse dummy2 = todayLearningFactory("문장삽입","인문");
               TodayLearningResponse dummy3 = todayLearningFactory("주제맞추기","사회");
                todayLearningResponses.add(dummy1);
                todayLearningResponses.add(dummy2);
                todayLearningResponses.add(dummy3);
                newbie(userId,personalCategories);
                    return todayLearningResponses;
            } else{
                log.info(" 오늘의 학습 조회가 성공적으로 이루어졌습니다. ");
            }

            TreeSet<String> treeSet = new TreeSet<>();

            for(TodayLearning todayLearning : todayLearnings)treeSet.add(todayLearning.getType());

            for(TodayLearning todayLearning : todayLearnings ){
                if( treeSet.contains(todayLearning.getType())) {
                    List<ChoiceSolved> choiceSolvedResponseList = choiceRepository.findByTypeAndProblemId(todayLearning.getType(),todayLearning.getProblemId());
                    TodayLearningResponse response = todayLearningToDto(todayLearning);
                    int difficulty = 0 ;
                    for( ChoiceSolved choiceSolved : choiceSolvedResponseList) if(choiceSolved.isCorrect()) difficulty++;
                    int size = Math.max(choiceSolvedResponseList.size() , 1);
                    double ratio = (double)difficulty / size;
                    if( ratio >= 0.2) response.setDifficulty(5);
                    if( ratio >= 0.4) response.setDifficulty(4);
                    if( ratio >= 0.6) response.setDifficulty(3);
                    if( ratio >= 0.8) response.setDifficulty(2);
                    if( ratio >= 1) response.setDifficulty(1);

                    if( size <= 3 ) response.setDifficulty(2);

                    todayLearningResponses.add(response);

                    treeSet.remove(todayLearning.getType());
                }

            }
            return todayLearningResponses;
        }

    @Override
    public List<Integer> getMonths(LocalDateTime dateTime, String token) {
        log.info( "Month 데이터를 받아옵니다 요청자 : " + token);
        int userid = userServiceFeignClient.getUserId(token);
        log.info(dateTime.toString());
        List<Integer> monthResponses = new ArrayList<>();

        YearMonth currentYearMonth = YearMonth.of(dateTime.getYear(), dateTime.getMonth());

        // 해당 월의 첫 번째 날
        LocalDateTime firstDayOfMonth = currentYearMonth.atDay(1).atStartOfDay();

        // 해당 월의 마지막 날
        LocalDateTime lastDayOfMonth = currentYearMonth.atEndOfMonth().atTime(23, 59, 59);

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetween(userid,firstDayOfMonth,lastDayOfMonth);
        int[] cnt = new int[32];
        for (TodayLearning todayLearning : todayLearnings){
            if(todayLearning.isCorrect()) {cnt[todayLearning.getCreateAt().getDayOfMonth()] +=1; }
        }
        for (int idx = 1 ; idx <= lastDayOfMonth.getDayOfMonth() ; idx++){
            int value = cnt[idx] / 3;
            monthResponses.add(value);
        }

        log.info("반환하는 값은 : " + monthResponses);
        return monthResponses;
    }

    @Override
    public List<DayResponse> getDays(LocalDateTime dateTime, String token) {
        log.info( "Day 데이터를 받아옵니다 요청자 : " + token);
        log.info(dateTime.toString());
        int userid = userServiceFeignClient.getUserId(token);
        List<DayResponse> dayResponses = new ArrayList<>();


        LocalDateTime startDate = LocalDateTime.of(dateTime.toLocalDate(), LocalTime.MIN); // 오늘의 시작
        LocalDateTime endDate = LocalDateTime.of(dateTime.toLocalDate(), LocalTime.MAX); // 오늘의 끝

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetween(userid,startDate,endDate);

        boolean intensiveDay = false;
        boolean insertDay = false;
        boolean sentenceDay = false;
        boolean topicDay = false;
        boolean vocaDay = false;

        TreeSet<String> stringList  = new TreeSet<>();
        for (TodayLearning todayLearning : todayLearnings) {
            if( !todayLearning.isCorrect()) continue;;

            stringList.add(todayLearning.getType());
            if(todayLearning.getType().equals("정독훈련") && !intensiveDay ){
                    boolean check = choiceRepository.findByUserIdAndTypeAndProblemId(userid,todayLearning.getType(),todayLearning.getProblemId()).isCorrect();
                    if(!check) {intensiveDay = true;}
                }

                if(todayLearning.getType().equals("순서맞추기") && !sentenceDay){
                    boolean check = choiceRepository.findByUserIdAndTypeAndProblemId(userid,todayLearning.getType(),todayLearning.getProblemId()).isCorrect();
                    if(!check) {sentenceDay = true;}
                }

                if(todayLearning.getType().equals("문장삽입") && !insertDay){
                    boolean check = choiceRepository.findByUserIdAndTypeAndProblemId(userid,todayLearning.getType(),todayLearning.getProblemId()).isCorrect();
                    if(!check) {insertDay = true;}
                }

                if(todayLearning.getType().equals("주제맞추기") && !topicDay){
                     int similarity = essayRepository.findByUserIdAndProblemId(userid,todayLearning.getProblemId()).getSimilarity();
                     if( similarity < 60) {topicDay = true;}
                }

                if(todayLearning.getType().equals("어휘") && !vocaDay){
                    boolean check = choiceRepository.findByUserIdAndTypeAndProblemId(userid,todayLearning.getType(),todayLearning.getProblemId()).isCorrect();
                    if(!check) {vocaDay = true;}
                }



        }
        log.info(stringList.toString());

        for(String string : stringList){
            log.info(string);
            if(string.equals("정독훈련")){
                log.info("정독");
                if(intensiveDay) dayResponses.add(new DayResponse("정독훈련",false));
                else dayResponses.add(new DayResponse("정독훈련",true));
            }
            if(string.equals("어휘")){
                log.info("어휘");
                if(vocaDay) dayResponses.add(new DayResponse("어휘",false));
                else dayResponses.add(new DayResponse("어휘",true));
            }
            if(string.equals("주제맞추기")){
                log.info("주제맞추기");
                if(topicDay) dayResponses.add(new DayResponse("주제맞추기",false));
                else dayResponses.add(new DayResponse("주제맞추기",true));
            }
            if(string.equals("순서맞추기")){
                log.info("순서맞추기");
                if(sentenceDay) dayResponses.add(new DayResponse("순서맞추기",false));
                else dayResponses.add(new DayResponse("순서맞추기",true));
            }
            if(string.equals("문장삽입")){
                log.info("문장삽입");
                if(insertDay) dayResponses.add(new DayResponse("문장삽입",false));
                else dayResponses.add(new DayResponse("문장삽입",true));
            }
        }

        return dayResponses;
    }

    @Override
    public TotalResponse getTotal(LocalDateTime dateTime,String token) {
        log.info( "월별 총제적 데이터를 받아옵니다 요청자 : " + token);
        int userid = userServiceFeignClient.getUserId(token);

        YearMonth currentYearMonth = YearMonth.of(dateTime.getYear(), dateTime.getMonth());

        // 해당 월의 첫 번째 날
        LocalDateTime firstDayOfMonth = currentYearMonth.atDay(1).atStartOfDay();

        // 해당 월의 마지막 날
        LocalDateTime lastDayOfMonth = currentYearMonth.atEndOfMonth().atTime(23, 59, 59);

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetween(userid,firstDayOfMonth,lastDayOfMonth);

        int size = Math.max(todayLearnings.size(),1);
        int minus = 0;


        //과학 , 기술 , 예술, 인문, 사회
        int science=0, tech=0 , art=0, human = 0, social = 0;
        int intensive=0, sentence=0, insert = 0, topic = 0, voca = 0;




        for( TodayLearning todayLearning : todayLearnings){
            String type = todayLearning.getType();
            String category = todayLearning.getCategory();
            if( type.equals("정독훈련")){intensive +=1;}
            if( type.equals("순서맞추기")){sentence+=1;}
            if( type.equals("문장삽입")){insert+=1;}
            if( type.equals("주제맞추기")){topic+=1;}
            if( type.equals("어휘")){voca+=1;}
            if( category.equals("과학")) {science+=1;}
            if( category.equals("기술")) {tech+=1;}
            if( category.equals("예술")) {art+=1;}
            if( category.equals("인문")) {human+=1;}
            if( category.equals("사회")) {social+=1;}
            if(todayLearning.isCorrect()) minus += 1;
        }
        PriorityQueue<Integer> priorityQueue = new PriorityQueue<>(Collections.reverseOrder());
        priorityQueue.add(science);
        priorityQueue.add(tech);
        priorityQueue.add(art);
        priorityQueue.add(human);
        priorityQueue.add(social);

        int categoryMax= 0;
        if(!priorityQueue.isEmpty())categoryMax= priorityQueue.poll();
        priorityQueue.clear();

        priorityQueue.add(intensive);
        priorityQueue.add(sentence);
        priorityQueue.add(insert);
        priorityQueue.add(topic);
        priorityQueue.add(voca);
        int typeMax= 0;

        if(!priorityQueue.isEmpty())typeMax= priorityQueue.poll();
        TotalResponse totalResponse = new TotalResponse();
        if( categoryMax != 0 ) {
            if (categoryMax == science)
                totalResponse.setCategory("과학");
            if (categoryMax == tech)
                totalResponse.setCategory("기술");
            if (categoryMax == art)
                totalResponse.setCategory("예술");
            if (categoryMax == human)
                totalResponse.setCategory("인문");
            if (categoryMax == social)
                totalResponse.setCategory("사회");
        }
        if(typeMax != 0) {
            if(typeMax == intensive) { totalResponse.setType("정독훈련");}
            if(typeMax == sentence) {totalResponse.setType("순서맞추기");}
            if(typeMax == insert) {totalResponse.setType("문장삽입");}
            if(typeMax == topic) {totalResponse.setType("주제맞추기");}
            if(typeMax == voca) {totalResponse.setType("어휘");}
        }
        minus /= 3;
        totalResponse.setTotalCnt(minus);
        double va = (double) minus/size;
        totalResponse.setCompletePercent(va);

        return totalResponse;
    }






    // 더미 오늘의 학습 팩토리 매서드
    public TodayLearningResponse todayLearningFactory(String type, String category){
        TodayLearningResponse todayLearningResponse = new TodayLearningResponse();
        todayLearningResponse.setCategory(category);
        todayLearningResponse.setType(type);
        todayLearningResponse.setSolved(false);
        todayLearningResponse.setDifficulty(2);
        return todayLearningResponse;
    }

    //Entity -> Dto 변환
    public TodayLearningResponse todayLearningToDto(TodayLearning todayLearning){
        return TodayLearningResponse.builder()
                .category(todayLearning.getCategory())
                .type(todayLearning.getType())
                .solved(todayLearning.isCorrect())
                .build();
    }


    // 신규 가입 유저들 오늘의 학습 데이터 생성
    @Transactional
    public void newbie(Integer userId, List<String> personalCategories){
        //정독훈련, 문장삽입, 주제맞추기
//        UserFeignResponse userFeignResponse = new UserFeignResponse(1,new ArrayList<>());
        /*
        Feign 요청을 통해서
         */
        int size = personalCategories.size();

        if( size < 3 ) {
            while(personalCategories.size() < 3){
                Collections.shuffle(categories);
                if(!personalCategories.contains(categories.get(0))) {personalCategories.add(categories.get(0));}
            }
        }

        // 카테고리
        String fir = personalCategories.get(0);
        String sec = personalCategories.get(1);
        String thi = personalCategories.get(2);
        List<Intensive>  intensiveList = intensiveRepository.findByCategory(fir);
        List<SentenceInsert> sentenceInsertList = sentenceInsertRepository.findByCategory(sec);
        List<TopicProblem> topicProblemList = topicRepository.findByCategory(thi);

        log.info( "정독훈련의 문제들의 값이 들어온지 : " +(intensiveList.size()));
        log.info("정독훈련의 문제들의 값이 들어온지 : "+ (sentenceInsertList.size()));
        log.info("정독훈련의 문제들의 값이 들어온지 : "+ (topicProblemList.size()));
        for(int idx = 0 ; idx < 3 ; idx++){
            todayLearningRepository.save(makeEntity(userId, intensiveList.get(idx).getId(), "정독훈련", fir));
            todayLearningRepository.save(makeEntity(userId, sentenceInsertList.get(idx).getId(), "문장삽입", fir));
            todayLearningRepository.save(makeEntity(userId, topicProblemList.get(idx).getId(), "주제맞추기", fir));
        }





    }

    // 오늘의학습 인스턴스 생성  메소드
    static TodayLearning makeEntity(int userId, int problemId,String type, String category){
        return TodayLearning.builder()
            .userId(userId)
            .problemId(problemId)
            .type(type)
            .category(category)
            .correct(false)
            .createAt(LocalDateTime.now())
            .build();
    }


}
