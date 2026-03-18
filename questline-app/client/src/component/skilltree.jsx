import React from 'react';

export default function SkillTree({ quests, onSelect }) {
  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      {quests.map((q, i) => (
        <React.Fragment key={q.id}>
          <div 
            onClick={() => q.status === 'available' && onSelect(q)}
            className={`w-40 h-40 rounded-full border-4 flex flex-col items-center justify-center transition-all cursor-pointer
            ${q.status === 'completed' ? 'bg-green-600 border-green-400' : 
              q.status === 'available' ? 'bg-blue-600 border-blue-400 animate-pulse' : 'bg-gray-800 border-gray-900 opacity-50'}`}
          >
            <span className="text-[10px] uppercase font-bold">{q.status}</span>
            <h3 className="text-center font-black px-2">{q.title}</h3>
            <p className="text-xs">{q.xp_reward} XP</p>
          </div>
          {i < quests.length - 1 && <div className="w-1 h-10 bg-gray-700" />}
        </React.Fragment>
      ))}
    </div>
  );
}