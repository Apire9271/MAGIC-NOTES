@echo off
echo Iniciando Backend de Magic Notes Pro...
cd backend
if not exist venv (
    echo Creando entorno virtual...
    "C:\Users\aanpi\AppData\Local\Programs\Python\Python313\python.exe" -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt >nul 2>&1
echo.
echo Backend iniciando en http://localhost:8000
echo Presiona Ctrl+C para detener
echo.
uvicorn app.main:app --reload --port 8000



