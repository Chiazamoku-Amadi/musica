This is a music player application. All data rendered on Musica is fetched from the Spotify for Developers Web API. Currently running in development mode, Musica has access to a select set of features provided by the API.

Technologies

- React: For frontend implementation
- React Router: For routing
- Redux: For state management
- Typescript: For type-checking
- Tailwind: For styling
- Axios: For making API calls

API
Spotify for Developers Web API

Features

- User Authentication with Spotify: Musica uses Spotify's authorisation code with PKCE flow to authenticate users. Users who don't have a Spotify account are prompted to create one. If the user is logged into Spotify on their browser, they can authorise Musica and proceed directly to the app.

- Access Live Data: Musica displays various data from Spotify:
- Trending albums
- Popular artists and their top albums and songs
- Genres
- Popular shows
- User's recently played tracks
- User's favorite tracks
- User's favorite shows
- User's playlists and songs within those playlists
- Featured playlists and songs within those playlists

- Create a New Playlist: Users can create a new playlist in Musica. This change will also reflect on their Spotify account.

- Track Previews: Due to Spotify's developer policies, users can listen to a 30-second preview of tracks. After the preview, they are prompted to continue listening on Spotify web or the Spotify app. Users can also play, pause, seek, and adjust volume in the player. Some tracks are available for preview only to Spotify Premium users.
