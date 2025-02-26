package com.backend.s21.service.impl;

import com.backend.s21.model.learningPath.Course;
import com.backend.s21.repository.ICourseRepository;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.service.ICourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl extends CrudImpl<Course, Integer> implements ICourseService {

    private final ICourseRepository repository;

    @Override
    IGenericRepo<Course, Integer> getRepository() {
        return repository;
    }
}
