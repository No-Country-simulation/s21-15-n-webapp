package com.backend.s21.controller;

import com.backend.s21.model.users.MentorUser;
import com.backend.s21.repository.MentorUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/mentor")
public class MentorUserController {

    @Autowired
    private MentorUserRepository mentorRepository;

    //Queda pendiente la respuesta a devolver con un MentorUserDTO para mejorar la seguridad.
    @PostMapping
    public ResponseEntity<MentorUser> registerJuniorUser(@RequestBody @Validated MentorUser mentorUser, UriComponentsBuilder uriComponentsBuilder) {
        MentorUser mentorUser1 = mentorRepository.save(mentorUser);
        URI url = uriComponentsBuilder.path("/mentor/{nickname}").buildAndExpand(mentorUser1.getNickname()).toUri();
        return ResponseEntity.created(url).body(mentorUser1);
    }

    //Obtener información de un Usuario Mentor a traves de una dirección PATH.
    //Pendiente devolver info como Dto por seguridad.
    @GetMapping("/{nickname}")
    public ResponseEntity<MentorUser> mostrarUsuario(@PathVariable String nickname) {
        MentorUser user = mentorRepository.getReferenceByNickname(nickname);
        return ResponseEntity.ok(user);
    }
}
