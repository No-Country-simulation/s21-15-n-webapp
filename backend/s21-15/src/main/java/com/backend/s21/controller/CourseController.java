package com.backend.s21.controller;

import com.backend.s21.model.dto.CourseDTO;
import com.backend.s21.model.learningPath.Course;
import com.backend.s21.service.ICourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.InvocationTargetException;

@RestController
@RequestMapping("/courses")
@Tag(name = "Cursos", description = "Operaciones relacionadas con cursos")
public class CourseController {

    private final ICourseService courseRepository;

    public CourseController(ICourseService courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    @Operation(summary = "Listar cursos", description = "Recupera una lista paginada de todos los cursos disponibles.")
    @ApiResponse(responseCode = "200", description = "Lista de cursos recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CourseDTO.class)))
    public ResponseEntity<Page<CourseDTO>> showCourseList(Pageable pageable) {
        return ResponseEntity.ok(courseRepository.findAll(pageable).map(CourseDTO::new));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestBody @Valid Course courseJson, UriComponentsBuilder uri) {
        try {
            Course course = courseRepository.save(courseJson);
            return ResponseEntity.ok(new CourseDTO(course));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showCourse(@PathVariable int id) {
        try {
            return ResponseEntity.ok(new CourseDTO(courseRepository.findById(id)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable int id, Course courseJson) {
        try {
            Course course = courseRepository.update(courseJson, id);
            return ResponseEntity.ok(new CourseDTO(course));
        } catch (InvocationTargetException | NoSuchMethodException | IllegalAccessException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable int id) {
        try {
            courseRepository.deleteById(id);
            return ResponseEntity.ok("El curso ha sido elimado con exito.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
