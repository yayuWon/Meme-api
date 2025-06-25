const express = require('express');
const app = express();
app.use(express.json()); // For JSON body parsing

// In-memory "database" of memes
let memes = [
  { id: 1, title: "Distracted Boyfriend", url: "https://i.imgflip.com/1bij.jpg", votes: 0 },
  { id: 2, title: "Waiting Skeleton", url: "https://i.imgflip.com/9vct.jpg", votes: 0 },
];

// 1. Get all memes
app.get('/memes', (req, res) => {
  res.json(memes);
});

// 2. Get random meme
app.get('/memes/random', (req, res) => {
  const randomMeme = memes[Math.floor(Math.random() * memes.length)];
  res.json(randomMeme);
});

// 3. Upvote/downvote a meme (PUT /memes/:id/vote?direction=up)
app.put('/memes/:id/vote', (req, res) => {
  const { id } = req.params;
  const { direction } = req.query;
  const meme = memes.find(m => m.id === parseInt(id));

  if (!meme) return res.status(404).send('Meme not found');

  if (direction === 'up') meme.votes++;
  else if (direction === 'down') meme.votes--;
  else return res.status(400).send('Invalid direction (use "up" or "down")');

  res.json(meme);
});

// BONUS: Submit new meme
app.post('/memes', (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) return res.status(400).send('Missing title/URL');

  const newMeme = { id: memes.length + 1, title, url, votes: 0 };
  memes.push(newMeme);
  res.status(201).json(newMeme);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Meme API running at http://localhost:${PORT}`);
});
