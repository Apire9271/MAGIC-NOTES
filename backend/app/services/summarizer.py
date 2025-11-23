import os
import json
from openai import AsyncOpenAI
from ..schemas import AnalysisResponse

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def analyze_transcript(transcript: str) -> AnalysisResponse:
    system_prompt = """
    You are an expert assistant that analyzes audio transcripts.
    Your goal is to extract structured information from the provided text.
    
    Return a JSON object with the following fields:
    - summary: A concise summary of the content.
    - key_points: A list of bullet points with key takeaways.
    - tasks: A list of action items or tasks mentioned.
    - tags: A list of relevant tags/keywords.
    - mind_map: A Mermaid.js graph definition (e.g., "graph TD; A-->B;"). Keep it simple and hierarchical.
    
    Ensure the output is valid JSON.
    """
    
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": transcript}
        ],
        response_format={ "type": "json_object" }
    )
    
    content = response.choices[0].message.content
    data = json.loads(content)
    
    return AnalysisResponse(
        transcript=transcript,
        summary=data.get("summary", ""),
        key_points=data.get("key_points", []),
        tasks=data.get("tasks", []),
        tags=data.get("tags", []),
        mind_map=data.get("mind_map", "")
    )

