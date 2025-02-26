package com.backend.s21.service.impl;

import com.backend.s21.model.users.AdminUser;
import com.backend.s21.repository.IAdminUserRepository;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.service.IAdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl extends CrudImpl<AdminUser, Integer> implements IAdminUserService {

    private final IAdminUserRepository repository;

    @Override
    IGenericRepo<AdminUser, Integer> getRepository() {
        return repository;
    }

    @Override
    public AdminUser findByNickname(String nickname) {
        return repository.findByNickname(nickname);
    }
}
