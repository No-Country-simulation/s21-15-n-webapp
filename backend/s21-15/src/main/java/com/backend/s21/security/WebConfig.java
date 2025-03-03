package com.backend.s21.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final SecurityContextValidator validator;

    public WebConfig(SecurityContextValidator validator) {
        this.validator = validator;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(validator)
                .addPathPatterns("/keys/**")
                .addPathPatterns("/services/**")
                .addPathPatterns("/users/**");
    }
}
