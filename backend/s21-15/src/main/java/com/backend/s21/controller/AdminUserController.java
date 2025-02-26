package com.backend.s21.controller;

import com.backend.s21.model.dto.junior.ChallengeDTO;
import com.backend.s21.model.dto.junior.JuniorUserDTO;
import com.backend.s21.model.learningPath.Challenge;
import com.backend.s21.model.users.AdminUser;
import com.backend.s21.service.IAdminUserService;
import com.backend.s21.service.IChallengeService;
import com.backend.s21.service.IJuniorUserService;
import com.backend.s21.service.IMentorUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminUserController {

    @Autowired
    private IAdminUserService adminService;

    @Autowired
    private IChallengeService IChallengeService;

    @Autowired
    private IJuniorUserService juniorService;

    @Autowired
    private IMentorUserService mentorService;

    @PostMapping
    public ResponseEntity<AdminUser> registerAdminUser(@RequestBody @Validated AdminUser user, UriComponentsBuilder uriComponentsBuilder) {
        AdminUser adminUser = adminService.save(user);
        URI url = uriComponentsBuilder.path("/junior/{nickname}").buildAndExpand(adminUser.getNickname()).toUri();
        return ResponseEntity.created(url).body(adminUser);
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<AdminUser> showUser(@PathVariable String nickname) {
        try {
            AdminUser user = adminService.findByNickname(nickname);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @PostMapping("/{nickname}/createchallenge")
    public ResponseEntity<ChallengeDTO> createChallenge(@RequestBody @Validated Challenge challengeinfo, @PathVariable String nickname, UriComponentsBuilder uriComponentsBuilder) {
        Challenge challenge = IChallengeService.save(challengeinfo);
        ChallengeDTO challengeDTO = new ChallengeDTO(challenge);
        URI url = uriComponentsBuilder.path("/challenge/{id}").buildAndExpand(challengeDTO.getId()).toUri();
        return ResponseEntity.created(url).body(challengeDTO);
    }

    @GetMapping("/{nickname}/juniorlist")
    public ResponseEntity<List<JuniorUserDTO>> showJuniorUserList(@PathVariable String nickname) {
        return ResponseEntity.ok(juniorService.findAll().stream().map(JuniorUserDTO::new).toList());
    }

}
