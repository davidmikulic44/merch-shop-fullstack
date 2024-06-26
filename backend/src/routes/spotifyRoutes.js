import express from 'express';
import { getRandomSongsFromPlaylist } from '../controllers/spotifyController.js';

const router = express.Router();

router.get('/random-songs/:playlistId', getRandomSongsFromPlaylist);

export default router;
