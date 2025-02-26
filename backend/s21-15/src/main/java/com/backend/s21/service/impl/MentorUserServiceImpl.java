package com.backend.s21.service.impl;

import com.backend.s21.model.users.MentorUser;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.repository.IMentorUserRepository;
import com.backend.s21.service.IMentorUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MentorUserServiceImpl extends CrudImpl<MentorUser, Integer> implements IMentorUserService {

    private final IMentorUserRepository repository;

    @Override
    IGenericRepo<MentorUser, Integer> getRepository() {
        return repository;
    }
}
