package com.a508.userservice.user.controller;

import com.a508.userservice.common.jwt.TokenProvider;
import com.a508.userservice.common.response.SuccessResponse;
import com.a508.userservice.user.data.*;
import com.a508.userservice.user.service.GameServiceClient;
import com.a508.userservice.user.service.StudyServiceClient;
import com.a508.userservice.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@RestController
@RequiredArgsConstructor
public class UserController {

	private static final String AUTHORIZATION_HEADER = "Authorization";
	private final TokenProvider tokenProvider;
	private final UserService userService;
	private final GameServiceClient gameServiceClient;
	private final StudyServiceClient studyServiceClient;

	/**
	 * feign
	 */
	@GetMapping("/userId")
	public Integer getUserIdByToken(@RequestHeader(value = "Authorization") String token) {
		return tokenProvider.getUserByToken(token).getId();
	}

	/**
	 * feign
	 */
	@GetMapping("/usercategories")
	public UserCategoryRes userCategory(@RequestParam String token) {

		return userService.getUserCategory(tokenProvider.getUserByToken(token).getId());
	}

	/**
	 * feign
	 */
	@GetMapping("/allusercategories")
	public AllUserCategoryRes allUserCategory() {

		return userService.getAllUserCategory();
	}

	@GetMapping("/nickname")
	public String getNickname(HttpServletRequest request) {

		return userService.getNickname(tokenProvider.getUserIdByToken(request));
	}

	@PostMapping("/nickname")
	public SuccessResponse<Integer> settingNickname(HttpServletRequest request, @RequestBody NicknameReq nickname) {

		userService.updateNickname(tokenProvider.getUserIdByToken(request), nickname.getNickname());
		return new SuccessResponse<>(HttpStatus.SC_OK);
	}

	@PostMapping("/category")
	public SuccessResponse<Integer> settingCategory(HttpServletRequest request, @RequestBody CategoryReq category) {
		userService.updateCategory(tokenProvider.getUserIdByToken(request), category.getCategory1(), category.getCategory2());
		return new SuccessResponse<>(HttpStatus.SC_OK);
	}

	@PostMapping("/studytime")
	public SuccessResponse<Integer> settingStudyTime(HttpServletRequest request, @RequestBody StudyTimeReq studyTime) {
		int userId = tokenProvider.getUserIdByToken(request);
		userService.updateStudyTime(userId, studyTime.getHour(), studyTime.getMinute());
		return new SuccessResponse<>(HttpStatus.SC_OK);
	}

	@GetMapping("/ability")
	public SuccessResponse<List<List<Double>>> userAbility(HttpServletRequest request) {

		fiveDto userAbilityRes = studyServiceClient.GetUserAbility(request.getHeader(AUTHORIZATION_HEADER).substring(7));
		System.out.println(userAbilityRes.getData().getVoca());

		fiveDto avgAbilityRes = studyServiceClient.GetAvgAbility();

		System.out.println(avgAbilityRes.getData().getFact());

		List<Double> a1 = new ArrayList<>(), a2 = new ArrayList<>();
		a1.add(userAbilityRes.getData().getFact() / 10.0);
		a1.add(userAbilityRes.getData().getInference() / 10.0);
		a1.add(userAbilityRes.getData().getVoca() / 10.0);
		a1.add(userAbilityRes.getData().getRecognition() / 10.0);
		a1.add(userAbilityRes.getData().getSpeed() / 10.0);

		a2.add(avgAbilityRes.getData().getFact() / 10.0);
		a2.add(avgAbilityRes.getData().getInference() / 10.0);
		a2.add(avgAbilityRes.getData().getVoca() / 10.0);
		a2.add(avgAbilityRes.getData().getRecognition() / 10.0);
		a2.add(avgAbilityRes.getData().getSpeed() / 10.0);

		List<List<Double>> data = new ArrayList<>();

		data.add(a1);
		data.add(a2);
		return new SuccessResponse<>(data);
	}

	@PostMapping("/calendar")
	public SuccessResponse<List<Integer>> getCalenderInfo(HttpServletRequest request, @RequestBody YearMonthReq date) {

		int daysInMonth = LocalDate.of(date.getYear(), date.getMonth(), 1).lengthOfMonth();
		List<Integer> result = new ArrayList<>();
		CalendarRes cal = studyServiceClient.GetMonthStudy(request.getHeader(AUTHORIZATION_HEADER).substring(7), LocalDate.of(date.getYear(), date.getMonth(), 1));
		for (int i = 0; i < daysInMonth; i++) {
			result.add(cal.getData().getGetMonths().get(i).getSolveCnt());
		}
		return new SuccessResponse<>(result);
	}

	@PostMapping("/daystudy")
	public SuccessResponse<DailyStudyRes> getStudyByDay(HttpServletRequest request, @RequestBody DateReq date) {

		List<DailyStudyRes.StudyInfo> dailyStudy = new ArrayList<>();
		dailyStudy.add(DailyStudyRes.StudyInfo.builder().problemType("정독훈련").isCorrect(true).build());
		dailyStudy.add(DailyStudyRes.StudyInfo.builder().problemType("순서맞추기").isCorrect(false).build());
		dailyStudy.add(DailyStudyRes.StudyInfo.builder().problemType("주제맞추기").isCorrect(true).build());

		return new SuccessResponse<>(DailyStudyRes.builder().DailyStudyList(dailyStudy).build());
	}

	@PostMapping("/attendance")
	public SuccessResponse<AttendanceRes> getAttendanceInfo(HttpServletRequest request, @RequestBody YearMonthReq date) {

		return new SuccessResponse<>(userService.UserAttendance(1, date.getYear(), date.getMonth()));
	}

	@PostMapping("/monthstudy")
	public SuccessResponse<MonthlyStudyRes> getStudyByMonth(HttpServletRequest request, @RequestBody YearMonthReq date) {

		return new SuccessResponse<>(MonthlyStudyRes.builder().daysCompleteLearning(3).mostLearnedStudy("정독훈련").mostReadCategory("과학/기술").build());
	}

	@GetMapping("/record")
	public SuccessResponse<RecordRes> getMatchRecord(HttpServletRequest request) {
		System.out.println(11);
		MyBattleRecordRes record = gameServiceClient.getMyRecord(request.getHeader(AUTHORIZATION_HEADER).substring(7));
		System.out.println(record.getGame());
		return new SuccessResponse<>(RecordRes.builder().numberOfWin(record.getVictory()).numberOfGame(record.getGame()).rating(record.getRating()).rank(record.getRanking()).odd(record.getOdds()).build());
	}


	/**
	 * feign
	 */
	@PostMapping("/nicknames")
	public UserListRes getNicknameByUserId(@RequestBody UserListReq userListReq) {
		return userService.getNicknameByUserIdList(userListReq);
	}

	/**
	 * feign
	 */
	@GetMapping("/nicknames")
	public String getNicknameByUserId(@RequestParam Integer userId) {
		return userService.getNicknameByUserId(userId);
	}


	@GetMapping("/studytime")
	public SuccessResponse<List<StudyTimeRes>> getStudyTime(HttpServletRequest request){
		return new SuccessResponse<>(userService.getStudyTime());
	}

}
