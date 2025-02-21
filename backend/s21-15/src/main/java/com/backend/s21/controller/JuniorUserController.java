package com.backend.s21.controller;

import com.backend.s21.model.dto.junior.JuniorUserDTO;
import com.backend.s21.model.users.JuniorUser;
import com.backend.s21.repository.JuniorUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/junior")
public class JuniorUserController {

    @Autowired
    private JuniorUserRepository juniorRepository;

    @PostMapping
    public ResponseEntity<JuniorUserDTO> registerJuniorUser(@RequestBody @Validated JuniorUser juniorUser, UriComponentsBuilder uriComponentsBuilder) {
        JuniorUser juniorUser1 = juniorRepository.save(juniorUser);
        JuniorUserDTO juniorUserDto = new JuniorUserDTO(juniorUser);
        URI url = uriComponentsBuilder.path("/junior/{nickname}").buildAndExpand(juniorUserDto.getNickname()).toUri();
        return ResponseEntity.created(url).body(juniorUserDto);
    }
}
