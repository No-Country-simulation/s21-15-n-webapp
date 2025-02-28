package com.backend.s21.repository;


import com.backend.s21.model.users.JuniorUser;

public interface IJuniorUserRepository extends IGenericRepo<JuniorUser, Integer> {

    JuniorUser getReferenceByNickname(String nickname);
}
