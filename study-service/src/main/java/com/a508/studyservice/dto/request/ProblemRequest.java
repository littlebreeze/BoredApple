package com.a508.studyservice.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProblemRequest {


	List<Integer> problemIdList;

	List<Integer> myAnswerList;


}
