import { nanoid } from 'nanoid';
import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import AlbumRepositories from '../repositories/album-repositories.js';

export const createAlbum = async (req, res, next) => {
  const { name, year } = req.validated;

  const album_id = await AlbumRepositories.createAlbum({ name, year });

  if(!album_id){
    return next(new InvariantError('Album gagal ditambahkan'));
  }

  return response(res, 201, 'Album berhasil ditambahkan', { albumId: album_id });
};

export const getAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const album = await AlbumRepositories.getAlbumById(id)
  if (!album) {
    return next(new NotFoundError('Album tidak ditemukan'));
  }

  return response(res, 200, 'Berhasil mengambil album', { album });
};

export const editAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const { name, year } = req.validated;

  const album = await AlbumRepositories.editAlbum({
    id, 
    name,
    year
  }) 
  if (!album) {
    return next(new NotFoundError('Album tidak ditemukan'));
  }

  return response(res, 200, 'Album berhasil diperbarui', null);
};

export const deleteAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const album = await AlbumRepositories.deleteAlbum(id)

  if (!album) {
    return next(new NotFoundError('Album tidak ditemukan'));
  }

  return response(res, 200, 'Album berhasil dihapus', null);
}; 
