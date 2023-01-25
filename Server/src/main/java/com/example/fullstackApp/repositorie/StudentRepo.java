package com.example.fullstackApp.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fullstackApp.model.Student;

public interface StudentRepo extends JpaRepository<Student, Integer> {

	

}
