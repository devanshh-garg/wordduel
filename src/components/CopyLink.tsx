import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from 'lucide-react';

interface CopyLinkProps {
  url: string;
}

const CopyLink: React.FC<CopyLinkProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className="w-full flex items-center mt-4 mb-4">
      <input
        type="text"
        readOnly
        value={url}
        className="flex-1 px-3 py-2 border border-r-0 border-slate-300 dark:border-gray-600 rounded-l-md bg-slate-50 dark:bg-gray-700 text-sm text-slate-700 dark:text-slate-300 truncate"
      />
      <button
        onClick={handleCopy}
        className={`
          px-3 py-2 rounded-r-md flex items-center 
          ${copied 
            ? 'bg-emerald-500 dark:bg-emerald-600 text-white' 
            : 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white'}
          transition-colors
        `}
      >
        {copied ? <CheckIcon size={18} /> : <ClipboardIcon size={18} />}
      </button>
    </div>
  );
};

export default CopyLink