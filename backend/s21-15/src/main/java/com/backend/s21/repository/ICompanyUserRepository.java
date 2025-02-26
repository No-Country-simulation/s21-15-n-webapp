package com.backend.s21.repository;

import com.backend.s21.model.users.CompanyUser;

public interface ICompanyUserRepository extends IGenericRepo<CompanyUser, Integer> {

    CompanyUser getReferenceByNickname(String nickname);
}
