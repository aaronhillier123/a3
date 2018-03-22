package com.AssignmentThree.Main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

@EnableAutoConfiguration

@SpringBootApplication
@EnableJpaRepositories
public class AssignmentThreeApplication {

	public static void main(String[] args) {
		SpringApplication.run(AssignmentThreeApplication.class, args);
	}

}
