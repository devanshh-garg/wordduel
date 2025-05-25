import React from 'react';

interface GameInstructionsProps {
  createdBy?: string;
}

const GameInstructions: React.FC<GameInstructionsProps> = ({ createdBy }) => {
  const creatorText = createdBy 
    ? `Challenge by: ${createdBy}` 
    : null;
  
  return (
    <div className="max-w-md mx-auto mt-4 mb-6 px-4">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-center text-indigo-700 font-medium mb-3">{creatorText}</p>
        
        <h2 className="text-lg font-bold text-slate-800 mb-2">How to play:</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 mt-0.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
            <span><strong>Green</strong> means the letter is correct and in the right position</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 mt-0.5 rounded-full bg-amber-400 flex-shrink-0"></span>
            <span><strong>Yellow</strong> means the letter is in the word but in the wrong position</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 mt-0.5 rounded-full bg-slate-500 flex-shrink-0"></span>
            <span><strong>Gray</strong> means the letter is not in the word</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GameInstructions;