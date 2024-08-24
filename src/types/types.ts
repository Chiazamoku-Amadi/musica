export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface AuthState {
  accessToken: string | null;
}

export interface UserResponse {
  id: string | null;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
}

export interface CurrentUserResponse {
  id: string;
  display_name: string;
  images: { url: string }[];
}

export interface AlbumResponse {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
}

export interface ArtistResponse {
  id: string;
  name: string;
  images: { url: string }[];
}

export interface ShowResponse {
  id: string;
  name: string;
  publisher: string;
  images: { url: string }[];
}

export interface TrackResponse {
  id: string;
  name: string;
  artists: ArtistResponse[];
  album: AlbumResponse;
}

export interface TracksResponse {
  track: TrackResponse;
}

export interface SavedShowsResponse {
  show: ShowResponse;
}

export interface PlaylistResponse {
  id: string;
  name: string;
  images: { url: string }[];
  owner: { display_name: string };
}

export interface NewPlaylistFormData {
  title: string;
  description: string;
  isPublic: boolean;
}
