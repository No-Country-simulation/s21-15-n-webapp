package com.backend.s21.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class SecurityContextValidator implements HandlerInterceptor {

    private static final int FORBIDDEN_STATUS = HttpServletResponse.SC_FORBIDDEN;
    private static final String FORBIDDEN_MESSAGE = "You do not have permission to perform this action.";

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            response.sendError(FORBIDDEN_STATUS, FORBIDDEN_MESSAGE);
            return false;
        }

        String authenticatedUser = authentication.getName();
        String username = request.getParameter("username");

        if (username != null && !username.isBlank() && !authenticatedUser.equals(username)) {
            response.sendError(FORBIDDEN_STATUS, FORBIDDEN_MESSAGE);
            return false;
        }

        return true;
    }
}

