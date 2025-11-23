import React, { useCallback, useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { Upload, Loader2, Mic, Square, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface UploadCardProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const UploadCard: React.FC<UploadCardProps> = ({ onUpload, isAnalyzing }) => {
  const [mode, setMode] = useState<'upload' | 'record'>('upload');
  const [recordedFile, setRecordedFile] = useState<File | null>(null);

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isAnalyzing || mode === 'record') return;

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('audio/')) {
        onUpload(file);
      }
    },
    [onUpload, isAnalyzing, mode]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  // Convert blob URL to File object when recording stops
  useEffect(() => {
    if (status === 'stopped' && mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "recording.wav", { type: "audio/wav" });
          setRecordedFile(file);
        });
    }
  }, [status, mediaBlobUrl]);

  const handleUploadRecording = () => {
    if (recordedFile) {
      onUpload(recordedFile);
    }
  };

  const resetRecording = () => {
    clearBlobUrl();
    setRecordedFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Mode Switcher */}
      <div className="flex justify-center mb-6">
        <div className="bg-slate-100 p-1 rounded-xl inline-flex">
          <button
            onClick={() => setMode('upload')}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              mode === 'upload'
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Upload File
          </button>
          <button
            onClick={() => setMode('record')}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              mode === 'record'
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Record Audio
          </button>
        </div>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          "relative overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 bg-white/50 backdrop-blur-sm",
          isAnalyzing ? "opacity-50 cursor-not-allowed border-slate-200" :
            mode === 'upload' ? "border-slate-200 hover:border-primary/50 hover:bg-blue-50/30" : "border-transparent bg-white shadow-xl ring-1 ring-slate-900/5"
        )}
      >
        <div className="p-12 text-center">
          {mode === 'upload' ? (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="rounded-full bg-blue-50 p-6 text-blue-600 ring-8 ring-blue-50/50 transition-transform hover:scale-110 duration-300">
                {isAnalyzing ? (
                  <Loader2 className="h-10 w-10 animate-spin" />
                ) : (
                  <Upload className="h-10 w-10" />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900">
                  {isAnalyzing ? 'Analyzing Audio...' : 'Upload Audio File'}
                </h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Drag and drop your audio file here, or click to browse.
                  Supports MP3, WAV, M4A.
                </p>
              </div>

              <input
                type="file"
                accept="audio/*"
                onChange={handleChange}
                disabled={isAnalyzing}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="relative">
                {status === 'recording' && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
                <div className={cn(
                  "rounded-full p-6 ring-8 ring-offset-2 transition-all duration-500",
                  status === 'recording'
                    ? "bg-red-50 text-red-600 ring-red-50"
                    : "bg-slate-50 text-slate-600 ring-slate-50"
                )}>
                  <Mic className={cn("h-10 w-10", status === 'recording' && "animate-pulse")} />
                </div>
              </div>

              <div className="space-y-4 w-full max-w-xs">
                {status === 'idle' || status === 'stopped' && !recordedFile ? (
                  <button
                    onClick={startRecording}
                    className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Start Recording
                  </button>
                ) : status === 'recording' ? (
                  <button
                    onClick={stopRecording}
                    className="w-full py-3 px-4 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Square className="h-4 w-4 fill-current" /> Stop Recording
                  </button>
                ) : (
                  <div className="space-y-3">
                    <audio src={mediaBlobUrl || undefined} controls className="w-full" />
                    <div className="flex gap-2">
                      <button
                        onClick={resetRecording}
                        className="flex-1 py-2 px-4 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" /> Discard
                      </button>
                      <button
                        onClick={handleUploadRecording}
                        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        Analyze
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

