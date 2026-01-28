import response from "../../../utils/response.js";
import ExportService from "../producers/export-service.js";
import PlaylistRepositories from "../../playlists/repositories/playlist-repositories.js";
import AuthorizationError from "../../../exceptions/authorization-error.js";
import NotFoundError from '../../../exceptions/not-found-error.js'

export const exportPlaylist = async (req, res, next) => {
  const { targetEmail } = req.validated;
  const { id: owner } = req.user;
  const { playlistId } = req.params;

  const isPlaylist = await PlaylistRepositories.checkPlaylist(playlistId);
  if (!isPlaylist) {
    return next(new NotFoundError('Playlists tidak ditemukan'));
  }

  // check owner playlist
  const isOwner = await PlaylistRepositories.verifyPlaylistOwner(
    playlistId,
    owner,
  );
  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses resource ini"),
    );
  }

  const message = {
    playlistId,
    targetEmail,
  };

  await ExportService.sendMessage("export:playlists", JSON.stringify(message));
  return response(res, 201, "Permintaan Anda sedang kami proses");
};
