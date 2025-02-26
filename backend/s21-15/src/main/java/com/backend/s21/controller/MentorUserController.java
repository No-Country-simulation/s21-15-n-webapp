package com.backend.s21.controller;

import com.backend.s21.model.users.MentorUser;
import com.backend.s21.service.ICourseService;
import com.backend.s21.service.IMentorUserService;
import com.backend.s21.service.IMentorshipService;
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
    private IMentorUserService mentorRepository;

    @Autowired
    private ICourseService ICourseRepository;

    @Autowired
    private IMentorshipService IMentorshipRepository;

    //Queda pendiente la respuesta a devolver con un MentorUserDTO para mejorar la seguridad.
    @PostMapping
    public ResponseEntity<MentorUser> registerMentorUser(@RequestBody @Validated MentorUser mentorUser, UriComponentsBuilder uriComponentsBuilder) {
        MentorUser mentorUser1 = mentorRepository.save(mentorUser);
        URI url = uriComponentsBuilder.path("/mentor/{nickname}").buildAndExpand(mentorUser1.getNickname()).toUri();
        return ResponseEntity.created(url).body(mentorUser1);
    }

    //Obtener información de un Usuario Mentor a traves de una dirección PATH.
    //Pendiente devolver info como Dto por seguridad.
//    @GetMapping("/{nickname}")
//    public ResponseEntity<MentorUser> showUser(@PathVariable String nickname) {
//        try {
//            MentorUser user = mentorRepository.getReferenceByNickname(nickname);
//            return ResponseEntity.ok(user);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }

//    @PostMapping("/{nickname}/createcourse")
//    public ResponseEntity<CourseDTO> createCourse(@RequestBody @Validated Course courseinfo, @PathVariable String nickname, UriComponentsBuilder uriComponentsBuilder) {
//        Course course = ICourseRepository.save(courseinfo);
//        User instructor = mentorRepository.getReferenceByNickname(nickname);
//        course.setInstructor(instructor);
//        CourseDTO courseDTO = new CourseDTO(course);
//        URI url = uriComponentsBuilder.path("/course/{id}").buildAndExpand(courseDTO.getId()).toUri();
//        return ResponseEntity.created(url).body(courseDTO);
//    }
//
//    @GetMapping("/{nickname}/yourcourselist")
//    public ResponseEntity<List<CourseDTO>> listCoursesFromMentor(@PathVariable String nickname) {
//        try {
//            MentorUser user = mentorRepository.getReferenceByNickname(nickname);
//            return ResponseEntity.ok(ICourseRepository.findAllByInstructorId(user.getId().longValue()).stream().map(CourseDTO::new).toList());
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().build();
//        }
//
//    }
//    //No funcional, falta implementar un metodo en @Service o contructor en @Entity para ligar el Usuario a la mentoría antes de persistir en BD.
//    @PostMapping("/{nickname}/creatementorship")
//    public ResponseEntity<MentorshipDTO> createMentorship(@PathVariable String nickname, Mentorship mentorshipInfo, UriComponentsBuilder uri) {
//        Mentorship mentorship = IMentorshipRepository.save(mentorshipInfo);
//        MentorUser mentor = mentorRepository.getReferenceByNickname(nickname);
//        mentorship.setMentor(mentor);
//        MentorshipDTO mentorshipDTO = new MentorshipDTO(mentorship);
//        URI url = uri.path("/course/{id}").buildAndExpand(mentorshipDTO.getId()).toUri();
//        return ResponseEntity.created(url).body(mentorshipDTO);
//    }

}
