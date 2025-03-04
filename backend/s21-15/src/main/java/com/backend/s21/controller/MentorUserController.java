package com.backend.s21.controller;

import com.backend.s21.model.dto.CourseDTO;
import com.backend.s21.model.dto.MentorshipDTO;
import com.backend.s21.model.learningPath.Course;
import com.backend.s21.model.learningPath.Mentorship;
import com.backend.s21.model.users.MentorUser;
import com.backend.s21.model.users.User;
import com.backend.s21.service.ICourseService;
import com.backend.s21.service.IMentorUserService;
import com.backend.s21.service.IMentorshipService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.InvocationTargetException;
import java.net.URI;

@RestController
@RequestMapping("/mentor")
public class MentorUserController {

    private final IMentorUserService mentorRepository;

    private final ICourseService courseRepository;

    private final IMentorshipService mentorshipRepository;

    public MentorUserController(IMentorUserService mentorRepository, ICourseService courseRepository,
                                IMentorshipService mentorshipRepository) {
        this.mentorRepository = mentorRepository;
        this.courseRepository = courseRepository;
        this.mentorshipRepository = mentorshipRepository;
    }

    @PostMapping
    public ResponseEntity<?> registerMentorUser(@RequestBody @Validated MentorUser userJson,
                                                         UriComponentsBuilder uri) {
        try {
            MentorUser user = mentorRepository.save(userJson);
            URI url = uri.path("/mentor/{nickname}").buildAndExpand(user.getNickname()).toUri();
            return ResponseEntity.created(url).body(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showUser(@PathVariable int id) {
        try {
            MentorUser user = mentorRepository.findById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/createcourse")
    @Transactional
    public ResponseEntity<?> createCourse(@RequestBody @Validated Course courseJson, @PathVariable int id,
                                                  UriComponentsBuilder uri) {
        try {
            Course course = courseRepository.save(courseJson);
            User instructor = mentorRepository.findById(id);
            course.setInstructor(instructor);
            CourseDTO courseDTO = new CourseDTO(course);
            URI url = uri.path("/course/{id}").buildAndExpand(courseDTO.getId()).toUri();
            return ResponseEntity.created(url).body(courseDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/yourcourselist")
    public ResponseEntity<Page<CourseDTO>> listCoursesFromMentor(@PathVariable int id) {
        try {
            User user = mentorRepository.findById(id);
            Page<Course> listCourses = courseRepository.findByInstructorId(Pageable.unpaged(), user.getId());
            return ResponseEntity.ok(listCourses.map(CourseDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/creatementorship")
    @Transactional
    public ResponseEntity<?> createMentorship(@PathVariable int id,
                                                          @RequestBody @Validated Mentorship mentorshipJson,
                                                          UriComponentsBuilder uri) {
        try {
            MentorUser mentor = mentorRepository.findById(id);
            Mentorship mentorship = new Mentorship(mentor, mentorshipJson);
            mentorshipRepository.save(mentorship);
            URI url = uri.path("/mentorship/{id}").buildAndExpand(mentorship.getId()).toUri();
            return ResponseEntity.created(url).body(new MentorshipDTO(mentorship));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@RequestBody @Validated MentorUser userJson, @PathVariable int id) {
        try {
            MentorUser user = mentorRepository.update(userJson, id);
            return ResponseEntity.ok(user);
        } catch (InvocationTargetException | IllegalAccessException | NoSuchMethodException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deleteUser(@PathVariable int id) {
        MentorUser user = mentorRepository.findById(id);
        user.setDeleted(true);
        return ResponseEntity.ok("El usuario ha sido eliminado con exito.");
    }

    @GetMapping("/{id}/yourmentorshiplist")
    public ResponseEntity<Page<MentorshipDTO>> listMentorshipFromMentor(@PathVariable int id, Pageable pageable) {
        try {
            MentorUser user = mentorRepository.findById(id);
            Page<Mentorship> mentorshipList = mentorshipRepository.findByMentorId(user.getId(), pageable);
            return ResponseEntity.ok(mentorshipList.map(MentorshipDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
