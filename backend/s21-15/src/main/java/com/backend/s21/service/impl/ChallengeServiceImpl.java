package com.backend.s21.service.impl;

import com.backend.s21.model.learningPath.Challenge;
import com.backend.s21.repository.IChallengeRepository;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.service.IChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl extends CrudImpl<Challenge, Integer> implements IChallengeService {

    private final IChallengeRepository repository;

    @Override
    IGenericRepo<Challenge, Integer> getRepository() {
        return repository;
    }
}
