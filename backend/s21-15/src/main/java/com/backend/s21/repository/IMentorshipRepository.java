package com.backend.s21.repository;

import com.backend.s21.model.learningPath.Mentorship;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IMentorshipRepository extends IGenericRepo<Mentorship, Integer> {

    Page<Mentorship> findByMentorId(int id, Pageable pageable);

}
