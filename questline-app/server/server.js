const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

// Load Quest Data
let quests = JSON.parse(fs.readFileSync('./data/quests.json', 'utf8'));
let userStats = { xp: 0, level: 1, gold: 0 };

app.get('/api/quests', (req, res) => res.json(quests));
app.get('/api/stats', (req, res) => res.json(userStats));

app.post('/api/complete-quest', (req, res) => {
    const { questId } = req.body;
    const quest = quests.find(q => q.id === questId);

    if (quest && quest.status === 'available') {
        quest.status = 'completed';
        userStats.xp += quest.xp_reward;
        
        // Level up logic: Level = 1 + every 500 XP
        userStats.level = Math.floor(userStats.xp / 500) + 1;

        // Unlock the next quest in the tree
        quests = quests.map(q => 
            q.prerequisite === questId ? { ...q, status: 'available' } : q
        );

        res.json({ stats: userStats, quests: quests, leveledUp: true });
    } else {
        res.status(400).json({ message: "Quest not available" });
    }
});

app.listen(5000, () => console.log("Game Engine active on Port 5000"));