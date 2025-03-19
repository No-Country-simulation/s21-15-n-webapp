package com.backend.s21.service;

import com.backend.s21.model.learningPath.Mentorship;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IMentorshipService extends ICRUD<Mentorship, Integer>{

    //Agregado para retornar mentorías ligados a un instructor
    Page<Mentorship> findByMentorId(int id, Pageable pageable);
}
