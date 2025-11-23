#!/bin/bash
echo "Iniciando Backend de Magic Notes Pro..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creando entorno virtual..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt -q

echo ""
echo "Backend iniciando en http://localhost:8000"
echo "Presiona Ctrl+C para detener"
echo ""
uvicorn app.main:app --reload --port 8000



