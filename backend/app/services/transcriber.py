import os
from fastapi import UploadFile
from openai import AsyncOpenAI
import aiofiles

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def transcribe_audio(file: UploadFile) -> str:
    # Save temp file
    temp_filename = f"temp_{file.filename}"
    async with aiofiles.open(temp_filename, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    
    try:
        with open(temp_filename, "rb") as audio_file:
            transcription = await client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file
            )
        return transcription.text
    finally:
        # Cleanup
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
