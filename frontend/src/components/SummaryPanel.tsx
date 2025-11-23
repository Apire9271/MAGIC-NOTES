import React from 'react';
import { FileText } from 'lucide-react';

interface SummaryPanelProps {
  summary: string;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({ summary }) => {
  return (
    <div className="glass-card rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          <FileText className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Executive Summary</h2>
      </div>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-700 leading-relaxed text-lg">{summary}</p>
      </div>
    </div>
  );
};

