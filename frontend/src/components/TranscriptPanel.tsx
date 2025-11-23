import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface TranscriptPanelProps {
  transcript: string;
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({ transcript }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Transcript</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        )}
      </button>

      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-0 border-t border-slate-100">
            <div className="prose prose-slate max-w-none mt-6">
              <p className="whitespace-pre-wrap text-slate-600 leading-relaxed font-mono text-sm bg-slate-50 p-6 rounded-xl border border-slate-100">
                {transcript}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

