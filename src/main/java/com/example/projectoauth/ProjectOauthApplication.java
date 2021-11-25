package com.example.projectoauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ProjectOauthApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectOauthApplication.class, args);
	}

}
