# Magic Notes Pro

Una aplicación web full-stack que transcribe audio y genera resúmenes, tareas y etiquetas utilizando la IA de OpenAI.

## Requisitos Previos

- Python 3.8+
- Node.js 16+
- Clave de API de OpenAI (OpenAI API Key)

## Configuración e Instalación

### Backend (Servidor)

1. Navega al directorio `backend`:
   ```bash
   cd backend
   ```
2. Crea un entorno virtual (opcional pero recomendado):
   ```bash
   python -m venv venv
   # En Windows:
   venv\Scripts\activate
   # En Mac/Linux:
   source venv/bin/activate
   ```
3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Configura las variables de entorno:
   - Copia el archivo `.env.example` y renómbralo a `.env`.
   - Abre `.env` y pega tu `OPENAI_API_KEY`.

5. Inicia el servidor:
   ```bash
   uvicorn app.main:app --reload
   ```
   El backend correrá en `http://localhost:8000`.

### Frontend (Cliente)

1. Navega al directorio `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
   *Nota: Si encuentras errores de permisos en PowerShell, intenta ejecutar este comando en `cmd` (Símbolo del sistema).*

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El frontend correrá generalmente en `http://localhost:5173`.

## Uso

1. Abre la URL del frontend en tu navegador.
2. Arrastra o selecciona un archivo de audio (mp3, wav, m4a).
3. Espera a que la IA procese el archivo (puede tardar unos segundos dependiendo de la duración).
4. Visualiza el resumen ejecutivo, la lista de tareas y las etiquetas generadas.
5. Usa el botón "Copy Full Report as Markdown" para copiar todo el informe al portapapeles.

