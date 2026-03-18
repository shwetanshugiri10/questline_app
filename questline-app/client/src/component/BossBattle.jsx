import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export const BossBattle = ({ quest, onWin, onLose }) => {
  const [hp, setHp] = useState(100);
  const [shake, setShake] = useState(false);

  const checkAnswer = (isCorrect) => {
    if (isCorrect) {
      setHp(0);
      confetti({ particleCount: 150, spread: 60 });
      setTimeout(onWin, 1500);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className={`max-w-md mx-auto p-10 bg-slate-900 border-2 border-red-500 rounded-2xl ${shake ? 'shake' : ''}`}>
      <h2 className="text-red-500 font-bold mb-2 uppercase">Boss: The Exam Golem</h2>
      <div className="w-full bg-gray-800 h-4 mb-6 rounded-full overflow-hidden">
        <div className="bg-red-600 h-full transition-all duration-500" style={{ width: `${hp}%` }} />
      </div>
      <p className="text-xl mb-6">{quest.boss_data.question}</p>
      <div className="grid gap-3">
        {quest.boss_data.options.map((opt, i) => (
          <button key={i} onClick={() => checkAnswer(opt.isCorrect)} className="p-3 bg-slate-800 hover:bg-slate-700 rounded border border-slate-600">
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};