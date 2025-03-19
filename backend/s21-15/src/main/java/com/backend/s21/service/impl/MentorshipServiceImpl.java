package com.backend.s21.service.impl;

import com.backend.s21.model.learningPath.Mentorship;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.repository.IMentorshipRepository;
import com.backend.s21.service.IMentorshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MentorshipServiceImpl extends CrudImpl<Mentorship, Integer> implements IMentorshipService {

    private final IMentorshipRepository repository;

    @Override
    IGenericRepo<Mentorship, Integer> getRepository() {
        return repository;
    }

    //Agregado para retornar mentorías ligados a un instructor
    @Override
    public Page<Mentorship> findByMentorId(int id, Pageable pageable) {
        return repository.findByMentorId(id, pageable);
    }
}
