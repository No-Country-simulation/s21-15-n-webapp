FROM eclipse-temurin:17-jdk
LABEL author=backend
COPY target/s21-15-0.0.1-SNAPSHOT.jar app_start.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/app_start.jar"]


