package com.a508.studyservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TotalResponse {

	String category;
	String type;
	Integer totalCnt;
	double completePercent;

}
