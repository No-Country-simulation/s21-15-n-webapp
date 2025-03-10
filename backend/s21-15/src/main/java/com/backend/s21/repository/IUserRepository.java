package com.backend.s21.repository;

import com.backend.s21.model.users.User;

import java.util.Optional;

public interface IUserRepository extends  IGenericRepo<User, Integer> {
    Optional<User> findByNickname(String nickname);
}
