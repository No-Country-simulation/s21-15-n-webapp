package com.backend.s21.controller;

import com.backend.s21.model.dto.junior.ChallengeDTO;
import com.backend.s21.model.dto.junior.CourseDTO;
import com.backend.s21.model.learningPath.Challenge;
import com.backend.s21.model.learningPath.Course;
import com.backend.s21.model.users.MentorUser;
import com.backend.s21.model.users.User;
import com.backend.s21.repository.ChallengeRepository;
import com.backend.s21.repository.CourseRepository;
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

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    //Queda pendiente la respuesta a devolver con un MentorUserDTO para mejorar la seguridad.
    @PostMapping
    public ResponseEntity<MentorUser> registerMentorUser(@RequestBody @Validated MentorUser mentorUser, UriComponentsBuilder uriComponentsBuilder) {
        MentorUser mentorUser1 = mentorRepository.save(mentorUser);
        URI url = uriComponentsBuilder.path("/mentor/{nickname}").buildAndExpand(mentorUser1.getNickname()).toUri();
        return ResponseEntity.created(url).body(mentorUser1);
    }

    //Obtener información de un Usuario Mentor a traves de una dirección PATH.
    //Pendiente devolver info como Dto por seguridad.
    @GetMapping("/{nickname}")
    public ResponseEntity<MentorUser> showUser(@PathVariable String nickname) {
        MentorUser user = mentorRepository.getReferenceByNickname(nickname);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{nickname}/createcourse")
    public ResponseEntity<CourseDTO> createCourse(@RequestBody @Validated Course courseinfo, @PathVariable String nickname, UriComponentsBuilder uriComponentsBuilder) {
        Course course = courseRepository.save(courseinfo);
        User instructor = mentorRepository.getReferenceByNickname(nickname);
        course.setInstructor(instructor);
        CourseDTO courseDTO = new CourseDTO(course);
        URI url = uriComponentsBuilder.path("/course/{id}").buildAndExpand(courseDTO.getId()).toUri();
        return ResponseEntity.created(url).body(courseDTO);
    }

    @PostMapping("/{nickname}/createchallenge")
    public ResponseEntity<ChallengeDTO> createChallenge(@RequestBody @Validated Challenge challengeinfo, @PathVariable String nickname, UriComponentsBuilder uriComponentsBuilder) {
        Challenge challenge = challengeRepository.save(challengeinfo);
        ChallengeDTO challengeDTO = new ChallengeDTO(challenge);
        URI url = uriComponentsBuilder.path("/challenge/{id}").buildAndExpand(challengeDTO.getId()).toUri();
        return ResponseEntity.created(url).body(challengeDTO);
    }
}
