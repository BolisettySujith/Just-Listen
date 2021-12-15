import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-private", 
    "user-read-email", 
    "playlist-read-private", 
    "playlist-modify-private",
    "playlist-read-collaborative",
    "user-library-read",
    "user-top-read",
    "user-follow-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "streaming",
].join(",");

const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = "https://accounts.spotify.com/authorize?"+queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});


export default spotifyApi;

export { LOGIN_URL };