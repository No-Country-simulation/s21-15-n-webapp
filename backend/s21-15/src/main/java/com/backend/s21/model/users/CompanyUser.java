package com.backend.s21.model.users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "company_users")
public class CompanyUser extends User {

    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(name = "country", nullable = false, length = 100)
    private String country;
}

