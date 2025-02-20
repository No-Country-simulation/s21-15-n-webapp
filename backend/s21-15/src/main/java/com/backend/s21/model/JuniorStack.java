package com.backend.s21.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "junior_stacks")
@Getter
@Setter
public class JuniorStack {

    @Id
    @Column(name = "programming_language", nullable = false)
    private String programmingLanguage;

    @ManyToOne
    @JoinColumn(name = "id_junior", referencedColumnName = "id", nullable = false)
    private JuniorUser juniorUser;

}

