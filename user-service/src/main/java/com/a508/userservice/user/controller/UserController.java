package com.a508.userservice.user.controller;

import com.a508.userservice.common.jwt.TokenProvider;
import com.a508.userservice.common.response.SuccessResponse;
import com.a508.userservice.user.data.*;
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

	private final TokenProvider tokenProvider;
	private final UserService userService;

	@GetMapping("/userId")
	public Integer getUserIdByToken(@RequestParam String token) {
		return tokenProvider.getUserByToken(token).getId();
	}

	@PostMapping("/nickname")
	public SuccessResponse<Integer> settingNickname(HttpServletRequest request, @RequestBody NicknameReq nickname) {
		int userId = tokenProvider.getUserIdByToken(request);
		userService.updateNickname(userId, nickname.getNickname());
		return new SuccessResponse<>(HttpStatus.SC_OK);
	}

	@PostMapping("/category")
	public SuccessResponse<Integer> settingCategory(HttpServletRequest request, @RequestBody CategoryReq category) {
		int userId = tokenProvider.getUserIdByToken(request);
		userService.updateCategory(userId, category.getCategory1(), category.getCategory2());
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

		List<List<Double>> data = new ArrayList<>();
		List<Double> a1 = Arrays.asList(4.1, 2.2, 3.7, 4.1, 1.5);
		List<Double> a2 = Arrays.asList(3.1, 3.2, 4.3, 3.4, 3.5);
		data.add(a1);
		data.add(a2);
		return new SuccessResponse<>(data);
	}

	@PostMapping("/calendar")
	public SuccessResponse<List<Integer>> getCalenderInfo(HttpServletRequest request, @RequestBody LocalDate date) {

		int daysInMonth = date.lengthOfMonth();
		List<Integer> result = new ArrayList<>();

		for (int i = 1; i <= daysInMonth; i++) {
			result.add(new Random().nextInt(4));
		}
		return new SuccessResponse<>(result);
	}

	@PostMapping("/daystudy")
	public SuccessResponse<DailyStudyRes> getStudyByDay(HttpServletRequest request, @RequestBody LocalDate date) {

		List<DailyStudyRes.StudyInfo> dailyStudy = new ArrayList<>();
		dailyStudy.add(DailyStudyRes.StudyInfo.builder().problemType("정독훈련").isCorrect(true).build());
		dailyStudy.add(DailyStudyRes.StudyInfo.builder().problemType("순서맞추기").isCorrect(false).build());
		dailyStudy.add(DailyStudyRes.StudyInfo.builder().problemType("주제맞추기").isCorrect(true).build());

		return new SuccessResponse<>(DailyStudyRes.builder().DailyStudyList(dailyStudy).build());
	}

	@PostMapping("/attendance")
	public SuccessResponse<AttendanceRes> getAttendanceInfo(HttpServletRequest request, @RequestBody LocalDate date) {

		return new SuccessResponse<>(AttendanceRes.builder().days(10).registerDate(LocalDate.now()).build());
	}

	@PostMapping("/monthstudy")
	public SuccessResponse<MonthlyStudyRes> getStudyByMonth(HttpServletRequest request, @RequestBody LocalDate date) {

		return new SuccessResponse<>(MonthlyStudyRes.builder().daysCompleteLearning(3).mostLearnedStudy("정독훈련").mostReadCategory("과학/기술").build());
	}

	@GetMapping("/record")
	public SuccessResponse<RecordRes> getMatchRecord(HttpServletRequest request) {

		return new SuccessResponse<>(RecordRes.builder().numberOfWin(5).numberOfGame(15).rating(1549).rank(7).build());
	}
}
