package com.backend.s21.repository;

import com.backend.s21.model.learningPath.Course;

import java.util.List;

public interface ICourseRepository extends IGenericRepo<Course, Integer> {

    List<Course> findAllByInstructorId(Long id);
}
