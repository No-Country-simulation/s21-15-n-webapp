package com.backend.s21.service.impl;

import com.backend.s21.model.users.CompanyUser;
import com.backend.s21.repository.ICompanyUserRepository;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.service.ICompanyUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyUserServiceImpl extends CrudImpl<CompanyUser, Integer> implements ICompanyUserService {

    private final ICompanyUserRepository repository;

    @Override
    IGenericRepo<CompanyUser, Integer> getRepository() {
        return repository;
    }
}
