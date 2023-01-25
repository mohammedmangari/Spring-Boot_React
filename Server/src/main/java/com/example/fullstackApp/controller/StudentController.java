package com.example.fullstackApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.fullstackApp.model.Student;
import com.example.fullstackApp.repositorie.StudentRepo;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class StudentController {
	
	@Autowired
	StudentRepo SR;
	
	
	@GetMapping("/student")
	@CrossOrigin
	public List<Student> getStudents(){
		return SR.findAll();
	}
	

	@PostMapping("/student")
	@CrossOrigin
	public Student addStudent(@RequestBody Student student ) {
		if(student.getName().isEmpty() || student.getAddress().isEmpty()) {
			System.out.println("Failed to add new Student!!");
			return null;
		}else {
			 System.out.println("New Student  Added !!");
			return SR.save(student);
		}

	}
	
	
	@DeleteMapping("/student")
	@CrossOrigin
	public void clearAllStudent() {
		SR.deleteAll();
	}
	
	
	@DeleteMapping("/student/{id}")
	@CrossOrigin
	public void deleteStudent(@PathVariable("id") int id ) {
		
		 SR.deleteById(id);
	}
	
	
	

}
