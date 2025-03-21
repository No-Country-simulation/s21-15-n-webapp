package com.backend.s21.service.impl;

import com.backend.s21.model.learningPath.CourseHistory;
import com.backend.s21.repository.ICourseHistoryRepository;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.service.ICourseHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseHistoryServiceImpl extends CrudImpl<CourseHistory, Integer> implements ICourseHistoryService {

    private final ICourseHistoryRepository repository;

    @Override
    IGenericRepo<CourseHistory, Integer> getRepository() {
        return repository;
    }

}
