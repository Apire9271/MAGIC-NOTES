import React from 'react';
import { CheckSquare } from 'lucide-react';

interface TasksPanelProps {
  tasks: string[];
}

export const TasksPanel: React.FC<TasksPanelProps> = ({ tasks }) => {
  return (
    <div className="glass-card rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg text-green-600">
          <CheckSquare className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Action Items</h2>
      </div>
      <ul className="space-y-4">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-3 group">
            <div className="mt-1 flex-shrink-0">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 transition-all cursor-pointer"
              />
            </div>
            <span className="text-slate-700 group-hover:text-slate-900 transition-colors text-base">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

