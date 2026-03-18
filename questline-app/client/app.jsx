import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SkillTree from './components/SkillTree';
import { BossBattle } from './components/BossBattle';

export default function App() {
  const [quests, setQuests] = useState([]);
  const [stats, setStats] = useState({ xp: 0, level: 1 });
  const [battle, setBattle] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/quests').then(res => setQuests(res.data));
    axios.get('http://localhost:5000/api/stats').then(res => setStats(res.data));
  }, []);

  const handleWin = async () => {
    const res = await axios.post('http://localhost:5000/api/complete', { questId: battle.id });
    setQuests(res.data.quests);
    setStats(res.data.stats);
    setBattle(null);
  };

  return (
    <div className="p-6">
      <header className="flex justify-between border-b-2 border-yellow-500 mb-8 p-4">
        <span className="font-black text-yellow-500">QUESTLINE</span>
        <div className="flex gap-4 font-bold">
          <span>LVL: {stats.level}</span>
          <span>XP: {stats.xp}</span>
        </div>
      </header>

      {battle ? (
        <BossBattle quest={battle} onWin={handleWin} onLose={() => setBattle(null)} />
      ) : (
        <SkillTree quests={quests} onSelect={setBattle} />
      )}
    </div>
  );
}