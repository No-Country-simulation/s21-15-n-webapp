package com.backend.s21.security.factory;

import com.backend.s21.model.users.*;
import com.backend.s21.service.IAdminUserService;
import com.backend.s21.service.ICompanyUserService;
import com.backend.s21.service.IJuniorUserService;
import com.backend.s21.service.IMentorUserService;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.function.Supplier;

@Slf4j
public class UserFactory {
    private static final Map<String, Supplier<User>> userMap = new HashMap<>();

    static {
        userMap.put("admin", AdminUser::new);
        userMap.put("junior", JuniorUser::new);
        userMap.put("mentor", MentorUser::new);
        userMap.put("company", CompanyUser::new);
    }
    private final IJuniorUserService juniorService;
    private final IAdminUserService adminService;
    private final IMentorUserService mentorService;
    private final ICompanyUserService companyService;

    public UserFactory(IJuniorUserService juniorService, IAdminUserService adminService, IMentorUserService mentorService, ICompanyUserService companyService) {
        this.juniorService = juniorService;
        this.adminService = adminService;
        this.mentorService = mentorService;
        this.companyService = companyService;
    }

    public static User createUser(List<RoleRepresentation> role, UserRepresentation users) {
        String roleUser = role.stream().toList().get(0).getName().toUpperCase(Locale.ROOT);
        Supplier<User> supplier = userMap.get(roleUser.toLowerCase());

        if (supplier == null) {
            throw new IllegalArgumentException("Rol no válido: ");
        }
        User user = supplier.get();
        user.setKeycloakId(users.getId());
        user.setEmail(users.getEmail());
        user.setNickname(users.getUsername());
        user.setRole(User.Role.valueOf(roleUser));
        return user;
    }

}

