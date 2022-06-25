import SpotifyWebApi from "spotify-web-api-node";

const scopes = ["user-read-email", "user-top-read", "user-read-recently-played"].join(",");

const params = {
	scope: scopes,
};

const queryParamstring = new URLSearchParams(params).toString();

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamstring}`;

export const spotifyApi = new SpotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
});
