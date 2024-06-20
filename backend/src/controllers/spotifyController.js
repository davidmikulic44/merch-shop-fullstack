// controllers/spotifyController.js

import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function getAccessToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
  } catch (err) {
    console.error('Something went wrong when retrieving an access token', err);
  }
}

export async function getRandomSongsFromPlaylist(req, res) {
  const playlistId = req.params.playlistId; // Get playlist ID from route parameters

  try {
    await getAccessToken();

    const data = await spotifyApi.getPlaylistTracks(playlistId);
    const tracks = data.body.items;

    const randomTracks = [];
    const numOfRandomTracks = 5; // Number of random songs you want to get
    for (let i = 0; i < numOfRandomTracks; i++) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      randomTracks.push(tracks[randomIndex].track);
      tracks.splice(randomIndex, 1); // Remove selected track to avoid duplicates
    }

    res.json(randomTracks);
  } catch (err) {
    console.error('Something went wrong when retrieving the playlist tracks', err);
    res.status(500).send('Internal Server Error');
  }
}
