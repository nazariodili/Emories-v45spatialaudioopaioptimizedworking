import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import storyRoutes from './routes/storyRoutes.js';
import { getAvailablePresets } from './utils/fileManager.js';


const app = express();

// 🛠 Percorso corrente (per __dirname equivalente)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
app.use(express.static(path.join(__dirname, '../public')));
app.use('/stories', express.static(path.join(__dirname, '../stories')));

// Routing
app.use('/api/stories', storyRoutes);

// serve static files for presets
app.use('/presets', express.static(path.join(__dirname, '../presets')));


app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', message: 'API attiva' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});

// 📦 API per ottenere elenco preset disponibili
app.get('/api/presets', (req, res) => {
  const presets = getAvailablePresets();
  res.json(presets);
});

