import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import AnalysisResponse
from .services.transcriber import transcribe_audio
from .services.summarizer import analyze_transcript

app = FastAPI(title="Magic Notes Pro API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Magic Notes Pro API is running"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_audio(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    try:
        # 1. Transcribe
        transcript_text = await transcribe_audio(file)
        
        # 2. Analyze (Summary, Tasks, Tags)
        analysis = await analyze_transcript(transcript_text)
        
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

