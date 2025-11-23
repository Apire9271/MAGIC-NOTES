import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface AnalysisResult {
  transcript: string;
  summary: string;
  key_points: string[];
  tasks: string[];
  tags: string[];
  mind_map: string;
}

export const api = axios.create({
  baseURL: API_URL,
});

export const analyzeAudio = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<AnalysisResult>('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

