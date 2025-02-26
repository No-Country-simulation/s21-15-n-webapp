package com.backend.s21.repository;


import com.backend.s21.model.users.AdminUser;
import com.backend.s21.model.users.MentorUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminUserRepository extends IGenericRepo<AdminUser, Long> {

    AdminUser getReferenceByNickname(String nickname);
}
