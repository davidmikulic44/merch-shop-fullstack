// routes/spotifyRoutes.js

import express from 'express';
import { getRandomSongsFromPlaylist } from '../controllers/spotifyController.js';

const router = express.Router();

// Define route for getting random songs from a playlist
router.get('/random-songs/:playlistId', getRandomSongsFromPlaylist);

export default router;
