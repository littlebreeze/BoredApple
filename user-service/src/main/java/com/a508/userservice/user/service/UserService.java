package com.a508.userservice.user.service;

import com.a508.userservice.user.domain.User;
import com.a508.userservice.user.domain.UserCategory;
import com.a508.userservice.user.repository.UserCategoryRepository;
import com.a508.userservice.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final UserCategoryRepository userCategoryRepository;

	public User getUser(int userId) { return userRepository.findById(userId).orElseThrow(); }

	public void updateNickname(int userId, String nickname) {
		User user = getUser(userId);
		user.setNickname(nickname);
		user.setSignUpProcess(2);
		userRepository.save(user);
	}

	public void updateCategory(int userId, int[] category) {
		User user = getUser(userId);
		String[] cat = {"","인문","사회","과학","기술","예술"};
		for(int i : category) {
			UserCategory userCategory = UserCategory.builder().userId(userId).category(cat[i]).build();
			userCategoryRepository.save(userCategory);
		}
		user.setSignUpProcess(3);
		userRepository.save(user);
	}

	public void updateStudyTime(int userId, int hour, int minute) {
		User user = getUser(userId);
		user.setStudyTime(LocalTime.of(hour,minute));
		user.setSignUpProcess(4);
		userRepository.save(user);
	}

}
