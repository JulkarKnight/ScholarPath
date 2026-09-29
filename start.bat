@echo off

if exist .env.local (
    for /F "usebackq eol=# tokens=1,* delims==" %%A IN (".env.local") DO (
        set "%%A=%%B"
    )
)

echo Starting ScholarPath AI Spring Boot Server...
.\mvnw.cmd spring-boot:run
