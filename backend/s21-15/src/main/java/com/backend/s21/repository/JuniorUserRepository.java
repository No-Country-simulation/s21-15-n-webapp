package com.backend.s21.repository;


import com.backend.s21.model.users.JuniorUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JuniorUserRepository extends JpaRepository<JuniorUser, Long> {

}
