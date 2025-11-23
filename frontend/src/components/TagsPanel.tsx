import React from 'react';
import { Tag } from 'lucide-react';

interface TagsPanelProps {
  tags: string[];
}

export const TagsPanel: React.FC<TagsPanelProps> = ({ tags }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Tag className="h-4 w-4" />
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-default border border-slate-200"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

