package com.backend.s21.service.impl;

import com.backend.s21.model.users.SocialNetwork;
import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.repository.ISocialNetworkRepository;
import com.backend.s21.service.ISocialNetworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SocialNetworkServiceImpl extends CrudImpl<SocialNetwork, Integer> implements ISocialNetworkService {

    private final ISocialNetworkRepository repository;

    @Override
    IGenericRepo<SocialNetwork, Integer> getRepository() {
        return repository;
    }
}
