@echo off
set "JAVA_HOME=C:\Program Files\Java\jdk-22"

if exist .env.local (
    for /F "usebackq eol=# tokens=1,* delims==" %%A IN (".env.local") DO (
        set "%%A=%%B"
    )
)

echo Starting ScholarPath AI Spring Boot Server...
.\mvnw.cmd spring-boot:run
