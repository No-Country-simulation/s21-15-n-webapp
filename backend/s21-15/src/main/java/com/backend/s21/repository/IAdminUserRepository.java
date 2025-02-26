package com.backend.s21.repository;


import com.backend.s21.model.users.AdminUser;

public interface IAdminUserRepository extends IGenericRepo<AdminUser, Integer> {
    AdminUser findByNickname(String nickname);
}
