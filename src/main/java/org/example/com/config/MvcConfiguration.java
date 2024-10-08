package org.example.com.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfiguration {
    @Configuration
    public static class LocalConfiguration implements WebMvcConfigurer {
        @Value("${app.upload.path}")
        private String uploadDir;

        @Value("${cors.allowed-origins}")
        private String[] corsAllowedOrigins;

        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry
                    .addResourceHandler("/upload/**")
                    .addResourceLocations("file:" + uploadDir + "/");
        }

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry
                    .addMapping("/**")
                    .allowedOrigins(corsAllowedOrigins)
                    .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE")
            ;
        }
    }
}
