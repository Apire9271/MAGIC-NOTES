import { useState } from 'react';
import { UploadCard } from './components/UploadCard';
import { SummaryPanel } from './components/SummaryPanel';
import { TasksPanel } from './components/TasksPanel';
import { TagsPanel } from './components/TagsPanel';
import { TranscriptPanel } from './components/TranscriptPanel';
import { MindMapPanel } from './components/MindMapPanel';
import { analyzeAudio, AnalysisResult } from './lib/api';
import { Wand2, Sparkles, Copy, Check } from 'lucide-react';
import { cn } from './lib/utils';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await analyzeAudio(file);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze audio. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const md = `
# ${result.summary}

## Key Points
${result.key_points.map(p => `- ${p}`).join('\n')}

## Action Items
${result.tasks.map(t => `- [ ] ${t}`).join('\n')}

## Transcript
${result.transcript}
    `.trim();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-slate-50/50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/50 bg-white/50 backdrop-blur-xl supports-[backdrop-filter]:bg-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Magic Notes Pro
            </h1>
          </div>
          {result && (
            <button
              onClick={() => setResult(null)}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              New Analysis
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Hero / Upload Section */}
        {!result && (
          <section className="max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-800">
                <Sparkles className="mr-2 h-3 w-3" />
                <span>AI-Powered Meeting Assistant</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                Turn Audio into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Actionable Intelligence
                </span>
              </h2>
              <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
                Upload your meeting recordings, voice notes, or lectures.
                We'll generate summaries, tasks, and mind maps instantly.
              </p>
            </div>

            <UploadCard onUpload={handleUpload} isAnalyzing={isAnalyzing} />

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-center animate-in fade-in slide-in-from-bottom-2">
                {error}
              </div>
            )}
          </section>
        )}

        {/* Results Section */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Left Column: Summary & Tasks */}
            <div className="lg:col-span-8 space-y-6">
              <SummaryPanel summary={result.summary} />
              {result.mind_map && <MindMapPanel definition={result.mind_map} />}
              <TasksPanel tasks={result.tasks} />
              <TranscriptPanel transcript={result.transcript} />
            </div>

            {/* Right Column: Tags & Meta */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 space-y-6">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-slate-900">Actions</h3>
                    <button
                      onClick={handleCopy}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                        copied
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      )}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'Copied!' : 'Copy Markdown'}
                    </button>
                  </div>
                  <TagsPanel tags={result.tags} />
                </div>

                {/* Key Points */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    Key Points
                  </h3>
                  <ul className="space-y-4">
                    {result.key_points.map((point, i) => (
                      <li key={i} className="flex gap-3 text-slate-700 text-sm leading-relaxed">
                        <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                          {i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

