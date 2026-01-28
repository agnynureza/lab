import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import AuthorizationError from '../../../exceptions/authorization-error.js';
import PlaylistRepositories from '../repositories/playlist-repositories.js';

export const addPlaylist = async (req, res, next) => {
  const { name } = req.validated;
  const { id: owner } = req.user;

  const playlistId = await PlaylistRepositories.createPlaylist({ name, owner });

  if (!playlistId) {
    return next(new InvariantError('Playlist gagal ditambahkan'));
  }

  return response(res, 201, 'Playlist berhasil ditambahkan', { playlistId });
};

export const getPlaylists = async (req, res, next) => {
  const { id } = req.user;
  const playlists = await PlaylistRepositories.getPlaylists(id);
  if (playlists.length == 0) {
    return next(new NotFoundError('Playlists tidak ditemukan'));
  }

  return response(res, 200, 'Berhasil mengambil playlists', { playlists });
};

export const deletePlaylistById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isOwner = await PlaylistRepositories.verifyPlaylistOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError('Anda tidak berhak mengakses resource ini')
    );
  }

  const playlist = await PlaylistRepositories.deletePlaylist(id, owner);
  if (!playlist) {
    return next(new NotFoundError('Playlist tidak ditemukan'));
  }

  return response(res, 200, 'Song berhasil dihapus', null);
};

export const addSongPlaylist = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const { songId } = req.validated;

  // check song if exists
  const song = await PlaylistRepositories.songRepositories.getSongById(songId);
  if (!song) {
    return next(new NotFoundError('Song tidak ditemukan'));
  }

  // verify playlist owner
  const isOwner = await PlaylistRepositories.verifyPlaylistOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError('Anda tidak berhak mengakses resource ini')
    );
  }

  // add song to playlist
  const playlist_song = await PlaylistRepositories.addSongtoPlaylist(
    id,
    songId
  );
  if (!playlist_song) {
    return next(new InvariantError('Song gagal ditambahkan ke playlist'));
  }

  return response(res, 201, 'Song berhasil ditambahkan ke playlist', {});
};

export const getSongsInPlaylist = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isPlaylist = await PlaylistRepositories.checkPlaylist(id);
  if (!isPlaylist) {
    return next(new NotFoundError('Playlists tidak ditemukan'));
  }

  // verify playlist owner
  const isOwner = await PlaylistRepositories.verifyPlaylistOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError('Anda tidak berhak mengakses resource ini')
    );
  }

  // playlist in songs
  const result = await PlaylistRepositories.getPlaylistSongDetail(id);
  if (result.rows.length == 0) {
    return next(new NotFoundError('Song tidak ditemukan'));
  }

  const playlist = {
    id: result.rows[0].playlist_id,
    name: result.rows[0].playlist_name,
    username: result.rows[0].username,
    songs: result.rows
      .filter((row) => row.song_id !== null)
      .map((row) => ({
        id: row.song_id,
        title: row.song_title,
        performer: row.song_performer,
      })),
  };

  return response(res, 200, 'Berhasil mengambil playlist songs', { playlist });
};

export const deleteSongPlaylist = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const { songId } = req.validated;

  const isOwner = await PlaylistRepositories.verifyPlaylistOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError('Anda tidak berhak mengakses resource ini')
    );
  }

  const playlist = await PlaylistRepositories.deleteSongInPlaylist(id, songId);
  if (!playlist) {
    return next(new NotFoundError('Playlist tidak ditemukan'));
  }

  return response(res, 200, 'Song berhasil dihapus dari playlist', null);
};
