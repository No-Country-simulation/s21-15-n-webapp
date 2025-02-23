package com.backend.s21.repository;

import com.backend.s21.model.learningPath.Course;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findAllByInstructorId(Long id);
}
