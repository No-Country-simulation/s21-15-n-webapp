package com.backend.s21.repository;


import com.backend.s21.model.users.MentorUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MentorUserRepository extends IGenericRepo<MentorUser, Long> {

    MentorUser getReferenceByNickname(String nickname);
}
