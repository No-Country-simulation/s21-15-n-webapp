package com.backend.s21.controller;

import com.backend.s21.model.dto.ChallengeDTO;
import com.backend.s21.service.IChallengeService;
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
@RequestMapping("/challenges")
@Tag(name = "Desafíos", description = "Operaciones relacionadas con desafíos")
public class ChallengeControlller {

    private final IChallengeService IChallengeRepository;

    public ChallengeControlller(IChallengeService IChallengeRepository) {
        this.IChallengeRepository = IChallengeRepository;
    }

    @GetMapping
    @Operation(summary = "Listar desafíos", description = "Recupera una lista paginada de todos los desafíos disponibles.")
    @ApiResponse(responseCode = "200", description = "Lista de desafíos recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeDTO.class)))
    public ResponseEntity<Page<ChallengeDTO>> showChallengeList(Pageable pageable) {
        return ResponseEntity.ok(IChallengeRepository.findAll(pageable).map(ChallengeDTO::new));
    }
}
