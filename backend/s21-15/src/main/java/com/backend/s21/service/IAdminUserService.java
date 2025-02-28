package com.backend.s21.service;

import com.backend.s21.model.users.AdminUser;

public interface IAdminUserService extends ICRUD<AdminUser, Integer>{
//    AdminUser getReferenceByNickname(String nickname);
AdminUser findByNickname(String nickname);

}
