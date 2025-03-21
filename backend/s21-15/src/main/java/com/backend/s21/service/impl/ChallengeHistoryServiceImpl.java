package com.backend.s21.service.impl;

import com.backend.s21.model.learningPath.ChallengeHistory;
import com.backend.s21.repository.IChallengeHistoryRepository;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.service.IChallengeHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChallengeHistoryServiceImpl extends CrudImpl<ChallengeHistory, Integer> implements IChallengeHistoryService {

    private final IChallengeHistoryRepository repository;

    @Override
    IGenericRepo<ChallengeHistory, Integer> getRepository() {
        return repository;
    }
}
