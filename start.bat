@echo off
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-8.0.504.1-hotspot"

if exist .env.local (
    for /F "usebackq eol=# tokens=1,* delims==" %%A IN (".env.local") DO (
        set "%%A=%%B"
    )
)

echo Starting ScholarPath AI Spring Boot Server...
.\mvnw.cmd spring-boot:run
