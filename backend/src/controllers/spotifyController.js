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
  } catch (error) {
    console.error('Something went wrong when retrieving an access token', err);
  }
}

export async function getRandomSongsFromPlaylist(req, res) {
  const playlistId = req.params.playlistId;
  try {
    await getAccessToken();

    const data = await spotifyApi.getPlaylistTracks(playlistId);
    const tracks = data.body.items;

    if (tracks.length === 0) {
      return res.status(404).json({ message: 'No tracks found in the playlist' });
    }

    const randomIndex = Math.floor(Math.random() * tracks.length);
    const randomTrack = tracks[randomIndex].track;

    res.json(randomTrack);
  } catch (error) {
    console.error('Error retrieving playlist tracks', error);
    res.status(500).send('Internal Server Error');
  }
}



