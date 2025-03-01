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

import java.net.URI;

@RestController
@RequestMapping("/mentor")
public class MentorUserController {

    private final IMentorUserService mentorRepository;

    private final ICourseService ICourseRepository;

    private final IMentorshipService IMentorshipRepository;

    public MentorUserController(IMentorUserService mentorRepository, ICourseService ICourseRepository,
                                IMentorshipService IMentorshipRepository) {
        this.mentorRepository = mentorRepository;
        this.ICourseRepository = ICourseRepository;
        this.IMentorshipRepository = IMentorshipRepository;
    }

    @PostMapping
    public ResponseEntity<MentorUser> registerMentorUser(@RequestBody @Validated MentorUser userJson,
                                                         UriComponentsBuilder uri) {
        MentorUser user = mentorRepository.save(userJson);
        URI url = uri.path("/mentor/{nickname}").buildAndExpand(user.getNickname()).toUri();
        return ResponseEntity.created(url).body(user);
    }


    @GetMapping("/{id}")
    public ResponseEntity<MentorUser> showUser(@PathVariable int id) {
        MentorUser user = mentorRepository.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{id}/createcourse")
    @Transactional
    public ResponseEntity<CourseDTO> createCourse(@RequestBody @Validated Course courseinfo, @PathVariable int id,
                                                  UriComponentsBuilder uri) {
        Course course = ICourseRepository.save(courseinfo);
        User instructor = mentorRepository.findById(id);
        course.setInstructor(instructor);
        CourseDTO courseDTO = new CourseDTO(course);
        URI url = uri.path("/course/{id}").buildAndExpand(courseDTO.getId()).toUri();
        return ResponseEntity.created(url).body(courseDTO);
    }

    @GetMapping("/{id}/yourcourselist")
    public ResponseEntity<Page<CourseDTO>> listCoursesFromMentor(@PathVariable int id) {
        User user = mentorRepository.findById(id);
        Page<Course> listCourses = ICourseRepository.findByInstructorId(Pageable.unpaged(), user.getId());

        return ResponseEntity.ok(listCourses.map(CourseDTO::new));
    }

    @PostMapping("/{id}/creatementorship")
    @Transactional
    public ResponseEntity<MentorshipDTO> createMentorship(@PathVariable int id,
                                                          @RequestBody @Validated Mentorship mentorshipJson,
                                                          UriComponentsBuilder uri) {
        MentorUser mentor = mentorRepository.findById(id);
        Mentorship mentorship = new Mentorship(null, mentor, mentorshipJson.getTitle(),
                mentorshipJson.getDescription(), null, null);
        IMentorshipRepository.save(mentorship);
        URI url = uri.path("/mentorship/{id}").buildAndExpand(mentorship.getId()).toUri();
        return ResponseEntity.created(url).body(new MentorshipDTO(mentorship));
    }

}
