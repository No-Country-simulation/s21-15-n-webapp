package com.backend.s21.controller;

import com.backend.s21.model.dto.ChallengeDTO;
import com.backend.s21.model.learningPath.Challenge;
import com.backend.s21.service.IChallengeService;
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
import java.net.URI;

@RestController
@RequestMapping("/challenges")
@Tag(name = "Desafíos", description = "Operaciones relacionadas con desafíos")
public class ChallengeControlller {

    private final IChallengeService challengeRepository;

    public ChallengeControlller(IChallengeService challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    @GetMapping
    @Operation(summary = "Listar desafíos", description = "Recupera una lista paginada de todos los desafíos disponibles.")
    @ApiResponse(responseCode = "200", description = "Lista de desafíos recuperada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeDTO.class)))
    @ApiResponse(responseCode = "400", description = "Solicitud inválida")
    public ResponseEntity<Page<ChallengeDTO>> showChallengeList(Pageable pageable) {
        try {
            return ResponseEntity.ok(challengeRepository.findAll(pageable).map(ChallengeDTO::new));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createChallenge(@RequestBody Challenge challengeJson, UriComponentsBuilder uri) {
        try {
            Challenge challenge = challengeRepository.save(challengeJson);
            URI url = uri.path("/{id}").buildAndExpand(challenge.getId()).toUri();
            return ResponseEntity.created(url).body(new ChallengeDTO(challenge));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChallenge(@PathVariable int id) {
        try {
            challengeRepository.deleteById(id);
            return ResponseEntity.ok("El reto ha sido eliminado con exito.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateChallenge(@PathVariable int id, @RequestBody @Valid Challenge challengeJson) {
        try {
            Challenge challenge = challengeRepository.update(challengeJson, id);
            return ResponseEntity.ok(new ChallengeDTO(challenge));
        } catch (InvocationTargetException | IllegalAccessException | NoSuchMethodException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showChallenge(@PathVariable int id) {
        try {
            return ResponseEntity.ok(new ChallengeDTO(challengeRepository.findById(id)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
