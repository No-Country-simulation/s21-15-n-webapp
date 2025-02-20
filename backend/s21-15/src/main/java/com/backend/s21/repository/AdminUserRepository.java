package com.backend.s21.repository;


import com.backend.s21.model.users.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

}
