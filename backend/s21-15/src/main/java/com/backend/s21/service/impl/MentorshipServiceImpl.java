package com.backend.s21.service.impl;

import com.backend.s21.model.learningPath.Mentorship;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.repository.IMentorshipRepository;
import com.backend.s21.service.IMentorshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MentorshipServiceImpl extends CrudImpl<Mentorship, Integer> implements IMentorshipService {

    private final IMentorshipRepository repository;

    @Override
    IGenericRepo<Mentorship, Integer> getRepository() {
        return repository;
    }
}
