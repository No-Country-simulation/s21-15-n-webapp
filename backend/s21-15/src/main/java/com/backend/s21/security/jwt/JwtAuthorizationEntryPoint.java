package com.backend.s21.security.jwt;

import com.backend.s21.exception.MessageException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class JwtAuthorizationEntryPoint implements AuthenticationEntryPoint{

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        String message = (String) request.getAttribute("Exception");

        if(message == null){
            message = "UserName is invalid or not found";
        }
        MessageException msmException = new MessageException(LocalDateTime.now(), message, request.getServletPath());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(convertToJson(msmException));
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

    }

    private String convertToJson(MessageException msmException) throws JsonProcessingException {
        if(msmException == null){
            return null;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        return objectMapper.writeValueAsString(msmException);
    }

}
