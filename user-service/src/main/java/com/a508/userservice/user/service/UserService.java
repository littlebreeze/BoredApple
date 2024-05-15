package com.a508.userservice.user.service;

import com.a508.userservice.user.data.*;
import com.a508.userservice.user.domain.User;
import com.a508.userservice.user.domain.UserAttendance;
import com.a508.userservice.user.domain.UserCategory;
import com.a508.userservice.user.repository.UserAttendanceRepository;
import com.a508.userservice.user.repository.UserCategoryRepository;
import com.a508.userservice.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final UserCategoryRepository userCategoryRepository;
	private final UserAttendanceRepository userAttendanceRepository;

	public User getUser(int userId) {
		return userRepository.findById(userId).orElseThrow();
	}

	public void updateNickname(int userId, String nickname) {
		User user = getUser(userId);
		user.setNickname(nickname);
		user.setSignUpProcess(2);
		userRepository.save(user);
	}

	public void updateCategory(int userId, int category1, int category2) {
		User user = getUser(userId);
		String[] cat = {"", "인문", "사회", "과학", "기술", "예술"};
		UserCategory userCategory1 = UserCategory.builder().userId(userId).category(cat[category1]).build();
		UserCategory userCategory2 = UserCategory.builder().userId(userId).category(cat[category2]).build();
		userCategoryRepository.save(userCategory1);
		userCategoryRepository.save(userCategory2);
		user.setSignUpProcess(3);
		userRepository.save(user);
	}

	public void updateStudyTime(int userId, int hour, int minute) {
		User user = getUser(userId);
		user.setStudyTime(LocalTime.of(hour, minute));
		user.setSignUpProcess(4);
		userRepository.save(user);
	}

	public UserListRes getNicknameByUserIdList(UserListReq userListReq) {
		List<Integer> userIdList = userListReq.getIdList();
		List<String> nicknameList = new ArrayList<>();
		for (int i = 0; i < userIdList.size(); i++) {
			nicknameList.add(userRepository.findById(userIdList.get(i)).orElseThrow().getNickname());
		}

		return UserListRes.builder()
				.nicknameList(nicknameList)
				.build();
	}

	public String getNicknameByUserId(int userId) {
		return userRepository.findById(userId).orElseThrow().getNickname();
	}

	public UserCategoryRes getUserCategory(int userId) {
		List<String> category = new ArrayList<>();
		List<UserCategory> userCategories = userCategoryRepository.findByUserId(userId);
		for (UserCategory uc : userCategories) {
			category.add(uc.getCategory());
		}

		return UserCategoryRes.builder().userId(userId).categories(category).build();
	}

	public AllUserCategoryRes getAllUserCategory() {

		int maxId = userRepository.findMaxUserId() + 1;

		List<String>[] AllCategory = new List[maxId + 1];
		for (int i = 0; i <= maxId; i++) {
			AllCategory[i] = new ArrayList<>();
		}

		List<UserCategory> allUserCategory = userCategoryRepository.findAll();
		for (UserCategory uc : allUserCategory) {
			AllCategory[uc.getUserId()].add(uc.getCategory());
		}

		AllUserCategoryRes allUserCategoryRes = AllUserCategoryRes.builder().build();
		List<AllUserCategoryRes.UserCategoryInfo> userCategoryInfos = new ArrayList<>();

		for (int i = 0; i <= maxId; i++) {
			if (!AllCategory[i].isEmpty()) {
				AllUserCategoryRes.UserCategoryInfo userCategoryInfo = AllUserCategoryRes.UserCategoryInfo.builder().userId(i).categories(AllCategory[i]).build();
				userCategoryInfos.add(userCategoryInfo);
			}
		}

		allUserCategoryRes.setUsers(userCategoryInfos);
		return allUserCategoryRes;
	}

	public void UserAttendanceCheck(int userId, LocalDate date) {

		UserAttendance userAttendance = UserAttendance.builder().userId(userId).attendanceDate(date).build();
		List<UserAttendance> Attchk = userAttendanceRepository.findByUserIdAndDate(userId, date);

		if (Attchk.isEmpty()) {

			userAttendanceRepository.save(userAttendance);
		}
	}

	public AttendanceRes UserAttendance(int userId, int year, int month) {

		UserAttendanceCheck(userId, LocalDate.now());

		LocalDate yearmonth = LocalDate.of(year, month, 1);

		LocalDateTime createDate = userRepository.findById(userId).orElseThrow().getCreatedDate();


		List<UserAttendance> userAttendances = userAttendanceRepository.findByUserId(userId);

		int useratt = 0;
		int startdate = 0;
		if (createDate.getYear() == year && createDate.getMonthValue() == month)
			startdate = createDate.getDayOfMonth() - 1;
		for (UserAttendance attendance : userAttendances) {
			if (attendance.getAttendanceDate().getYear() == year && attendance.getAttendanceDate().getMonthValue() == month) {
				useratt++;
			}
		}
		return AttendanceRes.builder().days(useratt).ratio((int) (useratt / (double) (LocalDate.now().getDayOfMonth() - startdate) * 100)).registerDate(createDate.toLocalDate()).build();
	}

	public String getNickname(Integer userId) {

		return userRepository.findById(userId).orElseThrow().getNickname();
	}


	public List<StudyTimeRes> getStudyTime(){
		List<User> userList = userRepository.findAll();
		List<StudyTimeRes> studyTimeResList = new ArrayList<>();
		for(User user : userList){studyTimeResList.add(new StudyTimeRes(user.getId(),user.getStudyTime()));}
		return studyTimeResList;
	}


}
