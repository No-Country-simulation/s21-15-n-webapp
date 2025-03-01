package com.backend.s21.service;

import com.backend.s21.model.learningPath.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICourseService extends ICRUD<Course, Integer>{

    //Agregado para devolver cursos ligados a un instructor
    Page<Course> findByInstructorId(Pageable pageable, int id);
}
