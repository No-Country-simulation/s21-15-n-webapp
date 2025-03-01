package com.backend.s21.controller;

import com.backend.s21.model.dto.ChallengeDTO;
import com.backend.s21.model.dto.JuniorUserDTO;
import com.backend.s21.model.learningPath.Challenge;
import com.backend.s21.model.users.AdminUser;
import com.backend.s21.model.users.JuniorUser;
import com.backend.s21.service.IAdminUserService;
import com.backend.s21.service.IChallengeService;
import com.backend.s21.service.IJuniorUserService;
import com.backend.s21.service.IMentorUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminUserController {

    private final IAdminUserService adminService;

    private final IChallengeService IChallengeService;

    private final IJuniorUserService juniorService;

    private final IMentorUserService mentorService;

    public AdminUserController(IAdminUserService adminService, IMentorUserService mentorService, IJuniorUserService juniorService, IChallengeService IChallengeService) {
        this.adminService = adminService;
        this.mentorService = mentorService;
        this.juniorService = juniorService;
        this.IChallengeService = IChallengeService;
    }

    @PostMapping
    public ResponseEntity<AdminUser> registerAdminUser(@RequestBody @Validated AdminUser user, UriComponentsBuilder uri) {
        AdminUser adminUser = adminService.save(user);
        URI url = uri.path("/admin/{id}").buildAndExpand(adminUser.getId()).toUri();
        return ResponseEntity.created(url).body(adminUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminUser> showUser(@PathVariable int id) {
        AdminUser user = adminService.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{id}/createchallenge")
    public ResponseEntity<ChallengeDTO> createChallenge(@RequestBody @Validated Challenge challengeinfo, @PathVariable int id,
                                                        UriComponentsBuilder uri) {
        Challenge challenge = IChallengeService.save(challengeinfo);
        ChallengeDTO challengeDTO = new ChallengeDTO(challenge);
        URI url = uri.path("/challenge/{id}").buildAndExpand(challengeDTO.getId()).toUri();
        return ResponseEntity.created(url).body(challengeDTO);
    }

    @GetMapping("/{id}/juniorlist")
    public ResponseEntity<Page<JuniorUserDTO>> showJuniorUserList(@PathVariable int id) {
        List<JuniorUser> juniorList = juniorService.findAll();
        return ResponseEntity.ok(new PageImpl<>(juniorList, org.springframework.data.domain.Pageable.unpaged(),
                juniorList.size()).map(JuniorUserDTO::new));
    }

}
