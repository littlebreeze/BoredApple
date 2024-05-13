package com.a508.studyservice.global.common.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	/**
	 * HTTP Status Code
	 * 400 : Bad Request
	 * 401 : Unauthorized
	 * 403 : Forbidden
	 * 404 : Not Found
	 * 500 : Internal Server Error
	 *
	 */
	// 잘못된 서버 요청
	BAD_REQUEST_ERROR(400, "G-001", "Bad Request Exception"),
	// @RequestBody 데이터 미 존재
	REQUEST_BODY_MISSING_ERROR(400, "G-002", "Required request body is missing"),
	// 유효하지 않은 타입
	INVALID_TYPE_VALUE(400, "G-003", " Invalid Type Value"),
	// Request Parameter 로 데이터가 전달되지 않을 경우
	MISSING_REQUEST_PARAMETER_ERROR(400, "G-004", "Missing RequestParameter Exception"),
	// 입력/출력 값이 유효하지 않음
	IO_ERROR(400, "G-005", "I/O Exception"),
	// com.google.gson JSON 파싱 실패
	JSON_PARSE_ERROR(400, "G-006", "JsonParseException"),
	// com.fasterxml.jackson.core Processing Error
	JACKSON_PROCESS_ERROR(400, "G-007", "com.fasterxml.jackson.core Exception"),
	// 권한이 없음
	FORBIDDEN_ERROR(403, "G-008", "Forbidden Exception"),
	// 서버로 요청한 리소스가 존재하지 않음
	NOT_FOUND_ERROR(404, "G-009", "Not Found Exception"),
	// NULL Point Exception 발생
	NULL_POINT_ERROR(404, "G-010", "Null Point Exception"),
	// @RequestBody 및 @RequestParam, @PathVariable 값이 유효하지 않음
	NOT_VALID_ERROR(400, "G-011", "handle Validation Exception"),
	// Header 값이 없음
	NOT_VALID_HEADER_ERROR(400, "G-012", "Missing Header Exception"),
	// Token 기간 만료
	EXPIRED_TOKEN_ERROR(401, "G-013", "Expired Token Exception"),
	// 잘못된 Token
	SECURITY_TOKEN_ERROR(401, "G-014", "Security Token Exception"),
	// 지원하지 않은 Token
	UNSUPPORTED_TOKEN_ERROR(401, "G-015", "Unsupported Token Exception"),
	// 잘못된 Token
	WRONG_TOKEN_ERROR(401, "G-016", "Wrong Token Exception"),
	// 사용자의 Token이 아님
	NOT_MATCH_TOKEN_ERROR(401, "G-017", "Not Match Token Exception"),
	// 이미 토큰을 발행함
	EXIST_TOKEN_ERROR(401, "G-018", "Exist Token Exception"),
	// FeignClient에서 400 이상의 에러가 오는 경우
	FEIGN_ERROR(502, "G-019", "Feign Exception"),
	// Method Not Allowed
	METHOD_NOT_ALLOWED_ERROR(405, "G-020", "Method Not Allowed Exception"),
	// 서버가 처리 할 방법을 모르는 경우 발생,
	INTERNAL_SERVER_ERROR(500, "G-999", "Internal Server Error Exception"),

	// 오늘의 학습 문제가 생성되지 않음
	NO_TODAY_LEARNING(405, "G-999", "Scheduler not activated" ),

	NOT_AUTHORIZATION_POST(409,"G-999","당신은 정답을 낼 자격이 없습니다."),
	// 그러한 문제는 존재하지 않습니다.
	NOT_EXIST_QUESTION(406,"G-999", "Problem is not exist" );




	private final int status;
	private final String code;
	private final String message;
}
