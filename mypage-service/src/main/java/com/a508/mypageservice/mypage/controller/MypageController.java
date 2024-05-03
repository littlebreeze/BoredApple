package com.a508.mypageservice.mypage.controller;

import com.a508.mypageservice.common.response.BaseResponse;
import com.a508.mypageservice.common.response.SuccessResponse;
import com.a508.mypageservice.mypage.data.AttendanceRes;
import com.a508.mypageservice.mypage.data.DailyStudyRes;
import com.a508.mypageservice.mypage.data.MonthlyStudyRes;
import com.a508.mypageservice.mypage.data.RecordRes;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MypageController {

	@PostMapping("/setnickname")
	public SuccessResponse<Boolean> settingNickname(HttpServletRequest request, @RequestBody String nickname) {

		return new SuccessResponse<>(true);
	}

	@PostMapping("/setcategory")
	public SuccessResponse<Boolean> settingCategory(HttpServletRequest request, @RequestBody String category) {

		return new SuccessResponse<>(true);
	}

	@PostMapping("/setstudytime")
	public SuccessResponse<Boolean> settingStudyTime(HttpServletRequest request, @RequestBody LocalTime time) {

		return new SuccessResponse<>(true);
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
