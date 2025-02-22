package com.backend.s21.repository;

import com.backend.s21.model.learningPath.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
