package com.backend.s21.service.impl;

import com.backend.s21.model.users.JuniorUser;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.repository.IJuniorUserRepository;
import com.backend.s21.service.IJuniorUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JuniorUserServiceImpl extends CrudImpl<JuniorUser, Integer> implements IJuniorUserService {

    private final IJuniorUserRepository repository;

    @Override
    IGenericRepo<JuniorUser, Integer> getRepository() {
        return repository;
    }
}
