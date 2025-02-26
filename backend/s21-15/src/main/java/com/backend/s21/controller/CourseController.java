package com.backend.s21.controller;

import com.backend.s21.model.dto.junior.CourseDTO;
import com.backend.s21.repository.ICourseRepository;
import com.backend.s21.service.ICourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private ICourseService ICourseRepository;

    //Se obtiene una advertencia en el runtime.
    @GetMapping
    public ResponseEntity<Page<CourseDTO>> showCourseList(Pageable pageable) {
        return ResponseEntity.ok(ICourseRepository.findAll(pageable).map(CourseDTO::new));
    }


}
