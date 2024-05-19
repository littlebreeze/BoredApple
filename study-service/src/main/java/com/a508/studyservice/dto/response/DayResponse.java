package com.a508.studyservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DayResponse {

	String problemType;
	boolean isCorrect;
}
