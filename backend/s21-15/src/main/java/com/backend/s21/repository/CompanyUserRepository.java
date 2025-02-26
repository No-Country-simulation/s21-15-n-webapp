package com.backend.s21.repository;

import com.backend.s21.model.users.CompanyUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyUserRepository extends IGenericRepo<CompanyUser, Long> {

    CompanyUser getReferenceByNickname(String nickname);
}
