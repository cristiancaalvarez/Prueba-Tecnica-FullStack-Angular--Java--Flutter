@echo off
echo ====================================
echo   VERIFICACION DE PHPMYADMIN/MYSQL
echo ====================================
echo.

echo 1. Verificando si MySQL esta corriendo...
netstat -an | findstr :3306 >nul
if %errorlevel% == 0 (
    echo ✅ MySQL esta corriendo en puerto 3306
) else (
    echo ❌ MySQL NO esta corriendo en puerto 3306
    echo    Por favor inicia XAMPP/WAMP
    pause
    exit /b 1
)

echo.
echo 2. Verificando si Apache esta corriendo...
netstat -an | findstr :80 >nul
if %errorlevel% == 0 (
    echo ✅ Apache esta corriendo en puerto 80
) else (
    echo ⚠️  Apache NO esta corriendo en puerto 80
    echo    phpMyAdmin podria no estar disponible
)

echo.
echo 3. URLs importantes:
echo    📊 phpMyAdmin: http://localhost/phpmyadmin
echo    🚀 Aplicacion: http://localhost:8080
echo.

echo 4. Proximo paso:
echo    - Ve a phpMyAdmin
echo    - Ejecuta el script database_mysql.sql
echo    - Luego ejecuta: mvn spring-boot:run
echo.

echo 5. Credenciales por defecto phpMyAdmin:
echo    Usuario: root
echo    Contraseña: (vacía)
echo.

pause
