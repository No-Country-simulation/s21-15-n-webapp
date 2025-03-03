package com.backend.s21.controller;

import com.backend.s21.model.dto.CourseDTO;
import com.backend.s21.service.ICourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/courses")
@Tag(name = "Cursos", description = "Operaciones relacionadas con cursos")
public class CourseController {

    private final ICourseService ICourseRepository;

    public CourseController(ICourseService ICourseRepository) {
        this.ICourseRepository = ICourseRepository;
    }

    @GetMapping
    @Operation(summary = "Listar cursos", description = "Recupera una lista paginada de todos los cursos disponibles.")
    @ApiResponse(responseCode = "200", description = "Lista de cursos recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CourseDTO.class)))
    public ResponseEntity<Page<CourseDTO>> showCourseList(Pageable pageable) {
        return ResponseEntity.ok(ICourseRepository.findAll(pageable).map(CourseDTO::new));
    }


}
