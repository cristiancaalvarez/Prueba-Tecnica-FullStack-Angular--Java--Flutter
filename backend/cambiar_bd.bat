@echo off
echo ====================================
echo   CONFIGURADOR DE BASE DE DATOS
echo ====================================
echo.
echo Selecciona la base de datos a usar:
echo 1. H2 (desarrollo/testing)
echo 2. MySQL (produccion/phpMyAdmin)
echo.
set /p choice="Ingresa tu opcion (1 o 2): "

if "%choice%"=="1" (
    echo.
    echo Configurando para H2...
    copy /Y "src\main\resources\application.properties" "src\main\resources\application-backup.properties" >nul
    echo ✅ Backup creado
    echo ✅ Ya tienes H2 configurado en application.properties
    echo.
    echo Para ejecutar con H2:
    echo mvn spring-boot:run
) else if "%choice%"=="2" (
    echo.
    echo Configurando para MySQL...
    copy /Y "src\main\resources\application.properties" "src\main\resources\application-h2-backup.properties" >nul
    copy /Y "application-mysql.properties" "src\main\resources\application.properties" >nul
    echo ✅ Backup de H2 creado como application-h2-backup.properties
    echo ✅ Configuracion MySQL aplicada
    echo.
    echo IMPORTANTE:
    echo 1. Ve a phpMyAdmin: http://localhost/phpmyadmin
    echo 2. Ejecuta el script database_mysql.sql
    echo 3. Luego ejecuta: mvn spring-boot:run
) else (
    echo ❌ Opcion invalida
    pause
    exit /b 1
)

echo.
echo ====================================
pause
