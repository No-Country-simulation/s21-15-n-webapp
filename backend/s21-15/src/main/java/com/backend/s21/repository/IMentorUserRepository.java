package com.backend.s21.repository;


import com.backend.s21.model.users.MentorUser;

public interface IMentorUserRepository extends IGenericRepo<MentorUser, Integer> {

    MentorUser getReferenceByNickname(String nickname);
}
