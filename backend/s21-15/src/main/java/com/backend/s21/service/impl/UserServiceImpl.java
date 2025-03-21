package com.backend.s21.service.impl;

import com.backend.s21.model.users.User;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.repository.IUserRepository;
import com.backend.s21.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl extends CrudImpl<User, Integer> implements IUserService {

    private final IUserRepository repository;
    @Override
    IGenericRepo<User, Integer> getRepository() { return repository; }
}
