#!/bin/bash
echo "Iniciando Frontend de Magic Notes Pro..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias..."
    npm install
fi

echo ""
echo "Frontend iniciando en http://localhost:3000"
echo "Presiona Ctrl+C para detener"
echo ""
npm run dev



