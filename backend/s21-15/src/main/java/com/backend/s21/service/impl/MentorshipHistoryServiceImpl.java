package com.backend.s21.service.impl;

import com.backend.s21.model.learningPath.MentorshipHistory;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.repository.IMentorshipHistoryRepository;
import com.backend.s21.service.IMentorshipHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MentorshipHistoryServiceImpl extends CrudImpl<MentorshipHistory, Integer> implements IMentorshipHistoryService {

    private final IMentorshipHistoryRepository repository;

    @Override
    IGenericRepo<MentorshipHistory, Integer> getRepository() {
        return repository;
    }
}
