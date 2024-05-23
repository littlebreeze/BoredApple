package com.a508.userservice.user.controller;

import com.a508.userservice.common.jwt.TokenProvider;
import com.a508.userservice.common.response.SuccessResponse;
import com.a508.userservice.user.data.*;
import com.a508.userservice.user.kafka.NotificationMessage;
import com.a508.userservice.user.kafka.NotificationService;
import com.a508.userservice.user.service.GameServiceClient;
import com.a508.userservice.user.service.StudyServiceClient;
import com.a508.userservice.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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
	private final NotificationService notificationProducer;

	@GetMapping("/usertest1")
	public void testtest(){
		notificationProducer.sendNotification( "study-time-topic",new NotificationMessage("8", LocalTime.now().plusMinutes(1),"메세지입력"));
	}

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

		fiveDto avgAbilityRes = studyServiceClient.GetAvgAbility();
		DecimalFormat df = new DecimalFormat("#.##");

		List<Double> a1 = new ArrayList<>(), a2 = new ArrayList<>();
		a1.add(userAbilityRes.getData().getFact() / 10.0);
		a1.add(userAbilityRes.getData().getInference() / 10.0);
		a1.add(userAbilityRes.getData().getVoca() / 10.0);
		a1.add(userAbilityRes.getData().getRecognition() / 10.0);
		a1.add(userAbilityRes.getData().getSpeed() / 10.0);

		a2.add(Double.valueOf(df.format(avgAbilityRes.getData().getFact() / 10.0)));
		a2.add(Double.valueOf(df.format(avgAbilityRes.getData().getInference() / 10.0)));
		a2.add(Double.valueOf(df.format(avgAbilityRes.getData().getVoca() / 10.0)));
		a2.add(Double.valueOf(df.format(avgAbilityRes.getData().getRecognition() / 10.0)));
		a2.add(Double.valueOf(df.format(avgAbilityRes.getData().getSpeed() / 10.0)));

		List<List<Double>> data = new ArrayList<>();

		data.add(a1);
		data.add(a2);
		return new SuccessResponse<>(data);
	}

	@PostMapping("/calendar")
	public SuccessResponse<List<Integer>> getCalenderInfo(HttpServletRequest request, @RequestBody YearMonthReq date) {
		int daysInMonth = LocalDate.of(date.getYear(), date.getMonth(), 1).lengthOfMonth();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		List<Integer> result = new ArrayList<>();
		LocalDate da = LocalDate.of(date.getYear(),date.getMonth(),1);
		CalendarRes cal = studyServiceClient.GetMonthStudy(request.getHeader(AUTHORIZATION_HEADER).substring(7), da.format(formatter));

		return new SuccessResponse<>(cal.getData());
	}

	@PostMapping("/daystudy")
	public SuccessResponse<List<DateCalendarRes.DayStudyCalendar>> getStudyByDay(HttpServletRequest request, @RequestBody DateReq date) {

		LocalDate day = LocalDate.of(date.getYear(),date.getMonth(),date.getDay());
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

		DateCalendarRes dateCalendarRes = studyServiceClient.GetDateStudy(request.getHeader(AUTHORIZATION_HEADER).substring(7),day.format(formatter));

		return new SuccessResponse<>(dateCalendarRes.getData());
	}

	@PostMapping("/attendance")
	public SuccessResponse<AttendanceRes> getAttendanceInfo(HttpServletRequest request, @RequestBody YearMonthReq date) {

		return new SuccessResponse<>(userService.UserAttendance(tokenProvider.getUserIdByToken(request), date.getYear(), date.getMonth()));
	}

	@PostMapping("/monthstudy")
	public SuccessResponse<MonthlyStudyRes.MonthStudy> getStudyByMonth(HttpServletRequest request, @RequestBody YearMonthReq date) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate da = LocalDate.of(date.getYear(),date.getMonth(),1);
		MonthlyStudyRes monthlyStudyRes = studyServiceClient.MonthTotalStudy(request.getHeader(AUTHORIZATION_HEADER).substring(7),da.format(formatter));
		return new SuccessResponse<>(monthlyStudyRes.getData());
	}

	@GetMapping("/record")
	public SuccessResponse<RecordRes> getMatchRecord(HttpServletRequest request) {
		MyBattleRecordRes record = gameServiceClient.getMyRecord(request.getHeader(AUTHORIZATION_HEADER).substring(7));
		System.out.println(record.getGame());
		return new SuccessResponse<>(RecordRes.builder().numberOfWin(record.getVictory()).numberOfGame(record.getGame()).rating(record.getRating()).rank(record.getRanking()).odd(((double)record.getVictory()/ (double)record.getGame()*100)).build());
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
