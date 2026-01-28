import InvariantError from "../../../exceptions/invariant-error.js";
import response from "../../../utils/response.js";
import NotFoundError from "../../../exceptions/not-found-error.js";
import AlbumRepositories from "../repositories/album-repositories.js";
import albumRepositories from "../repositories/album-repositories.js";
import ClientError from "../../../exceptions/client-error.js";
import RedisService from "../../../cache/redis-service.js";

export const createAlbum = async (req, res, next) => {
  const { name, year } = req.validated;

  const album_id = await AlbumRepositories.createAlbum({ name, year });

  if (!album_id) {
    return next(new InvariantError("Album gagal ditambahkan"));
  }

  return response(res, 201, "Album berhasil ditambahkan", {
    albumId: album_id,
  });
};

export const getAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const album = await AlbumRepositories.getAlbumById(id);
  if (!album) {
    return next(new NotFoundError("Album tidak ditemukan"));
  }

  return response(res, 200, "Berhasil mengambil album", { album });
};

export const editAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const { name, year } = req.validated;

  const album = await AlbumRepositories.editAlbum({
    id,
    name,
    year,
  });
  if (!album) {
    return next(new NotFoundError("Album tidak ditemukan"));
  }

  return response(res, 200, "Album berhasil diperbarui", null);
};

export const deleteAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const album = await AlbumRepositories.deleteAlbum(id);

  if (!album) {
    return next(new NotFoundError("Album tidak ditemukan"));
  }

  return response(res, 200, "Album berhasil dihapus", null);
};

export const uploadCover = async (req, res, next) => {
  const { id } = req.params;

  if (!req.file) {
    return next(new ClientError("No file uploaded"));
  }

  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 5000;

  const encodedFilename = encodeURIComponent(req.file.filename);
  const fileLocation = `http://${host}:${port}/uploads/${encodedFilename}`;

  // update albums
  const albumId = await albumRepositories.editAlbumCover({ id, fileLocation });

  return response(res, 201, "Sampul berhasil diunggah", { fileLocation });
};

export const addLikes = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: albumId } = req.params;
  const cacheKeyTotal = `like:total:${albumId}`;

  // check album existence
  const album = await albumRepositories.getAlbumById(albumId);
  if (!album) {
    return next(new NotFoundError("Album tidak ditemukan"));
  }

  // check if already liked
  const isLiked = await albumRepositories.checkUserLikeAlbum({
    userId,
    albumId,
  });
  if (isLiked) {
    return next(new ClientError("Anda sudah menyukai album ini"));
  }

  const result = await albumRepositories.addUserLikeAlbum({ userId, albumId });
  if (!result) {
    return next(new NotFoundError("Album tidak ditemukan"));
  }

  await RedisService._client.del(cacheKeyTotal);

  return response(res, 201, "Berhasil menyukai album", null);
};

export const getLikes = async (req, res, next) => {
  const { id: albumId } = req.params;
  const cacheKeyTotal = `like:total:${albumId}`;
  try {
    const cachedTotal = await RedisService._client.get(cacheKeyTotal);
    if (cachedTotal) {
      return response(
        res,
        200,
        "Berhasil mengambil jumlah likes album",
        {
          likes: parseInt(cachedTotal, 10),
        },
        { "X-Data-Source": "cache" },
      );
    } else {
      const totalLikes = await albumRepositories.getAlbumLikes(albumId);
      if (totalLikes === null) {
        return next(new NotFoundError("Album tidak ditemukan"));
      }
      await RedisService._client.set(cacheKeyTotal, totalLikes, 1800);
      return response(res, 200, "Berhasil mengambil jumlah likes album", {
        likes: totalLikes,
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const delLikes = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: albumId } = req.params;
  const cacheKeyTotal = `like:total:${albumId}`;

  // check if already liked
  const isLiked = await albumRepositories.checkUserLikeAlbum({
    userId,
    albumId,
  });
  if (!isLiked) {
    return next(new ClientError("Anda belum menyukai album ini"));
  }
  const result = await albumRepositories.deleteUserLikeAlbum({
    userId,
    albumId,
  });
  if (!result) {
    return next(new NotFoundError("Album tidak ditemukan"));
  }
  await RedisService._client.del(cacheKeyTotal);

  return response(res, 200, "Berhasil batal menyukai album", null);
};
