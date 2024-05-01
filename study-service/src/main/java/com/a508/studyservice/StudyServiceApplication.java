package com.a508.studyservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
// @EnableDiscoveryClient
@EnableJdbcAuditing
@EnableScheduling
@EnableFeignClients
public class StudyServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudyServiceApplication.class, args);
	}

}



