package com.a508.userservice.user.service;

import com.a508.userservice.user.data.UserListReq;
import com.a508.userservice.user.data.UserListRes;
import com.a508.userservice.user.domain.User;
import com.a508.userservice.user.domain.UserCategory;
import com.a508.userservice.user.repository.UserCategoryRepository;
import com.a508.userservice.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final UserCategoryRepository userCategoryRepository;

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
		List<Integer> userIdList=userListReq.getIdList();
		List<String> nicknameList=new ArrayList<>();
		for (int i=0;i<userIdList.size();i++){
			nicknameList.add(userRepository.findById(userIdList.get(i)).orElseThrow().getNickname());
		}

		return UserListRes.builder()
				.nicknameList(nicknameList)
				.build();
	}

	public String getNicknameByUserId(Integer userId) {
		return userRepository.findById(userId).orElseThrow().getNickname();
	}
}
