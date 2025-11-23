import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Network } from 'lucide-react';

interface MindMapPanelProps {
    definition: string;
}

export const MindMapPanel: React.FC<MindMapPanelProps> = ({ definition }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            mermaid.initialize({
                startOnLoad: true,
                theme: 'base',
                themeVariables: {
                    primaryColor: '#e0f2fe',
                    primaryTextColor: '#0f172a',
                    primaryBorderColor: '#38bdf8',
                    lineColor: '#94a3b8',
                    secondaryColor: '#f0f9ff',
                    tertiaryColor: '#fff',
                },
                fontFamily: 'inherit'
            });
            mermaid.contentLoaded();
        }
    }, [definition]);

    return (
        <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <Network className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Mind Map</h2>
            </div>
            <div className="overflow-x-auto p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                <div className="mermaid flex justify-center" ref={containerRef}>
                    {definition}
                </div>
            </div>
        </div>
    );
};
