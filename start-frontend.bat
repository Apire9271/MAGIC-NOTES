@echo off
echo Iniciando Frontend de Magic Notes Pro...
cd frontend
if not exist node_modules (
    echo Instalando dependencias...
    call npm install
)
echo.
echo Frontend iniciando en http://localhost:3000
echo Presiona Ctrl+C para detener
echo.
call npm run dev



