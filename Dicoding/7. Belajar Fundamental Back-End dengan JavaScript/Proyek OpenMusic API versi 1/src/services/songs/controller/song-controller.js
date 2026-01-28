import { nanoid } from 'nanoid';
import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import SongRepositories from '../repositories/song-repositories.js';

export const createSong = async (req, res, next) => {
  const { title, year, genre, performer, duration, albumId } = req.validated;

  const song_id = await SongRepositories.createSong({ title, year, genre, performer, duration, albumId });

  if(!song_id){
    return next(new InvariantError('Song gagal ditambahkan'));
  }

  return response(res, 201, 'Song berhasil ditambahkan', { songId: song_id });
};

export const getSongs = async (req, res, next) => {
  const songs = await SongRepositories.getSongs()

  if (!songs) {
    return next(new NotFoundError('Songs tidak ditemukan'));
  }

  return response(res, 200, 'Berhasil mengambil songs', { songs });
}

export const getSongById = async (req, res, next) => {
  const { id } = req.params;
  const song = await SongRepositories.getSongById(id)

  if (!song) {
    return next(new NotFoundError('Song tidak ditemukan'));
  }

  return response(res, 200, 'Berhasil mengambil song', { song });
};

export const editSongById = async (req, res, next) => {
  const { id } = req.params;
  const { title, year, genre, performer, duration, albumId } = req.validated;

  const song = await SongRepositories.editSong({
    id, title, year, genre, 
    performer, duration, albumId
  }) 
  if (!song) {
    return next(new NotFoundError('Song tidak ditemukan'));
  }

  return response(res, 200, 'Song berhasil diperbarui', null);
};

export const deleteSongById = async (req, res, next) => {
  const { id } = req.params;
  const song = await SongRepositories.deleteSong(id)

  if (!song) {
    return next(new NotFoundError('Song tidak ditemukan'));
  }

  return response(res, 200, 'Song berhasil dihapus', null);
}; 
