package com.backend.s21.repository;

import com.backend.s21.model.learningPath.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICourseRepository extends IGenericRepo<Course, Integer> {

    Page<Course> findByInstructorId(Pageable pageable, int id);
}
