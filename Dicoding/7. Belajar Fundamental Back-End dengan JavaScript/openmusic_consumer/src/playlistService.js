import { Pool } from "pg";

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsInPlaylist(playlistId) {
    const query = `
    SELECT 
      p.id as playlist_id,
      p.name as playlist_name,
      u.username as username,
      s.id as song_id,
      s.title as song_title,
      s.performer as song_performer
    FROM playlists p
    LEFT JOIN users u ON p.owner = u.id
    LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
    LEFT JOIN songs s ON ps.song_id = s.id
    WHERE p.id = $1`;

    const result = await this._pool.query(query, [playlistId]);
    if (result.rows.length == 0) {
      return next(new NotFoundError("Song tidak ditemukan"));
    }

    const playlistSongs = {
      playlist: {
        id: result.rows[0].playlist_id,
        name: result.rows[0].playlist_name,
        songs: result.rows
          .filter((row) => row.song_id !== null)
          .map((row) => ({
            id: row.song_id,
            title: row.song_title,
            performer: row.song_performer,
          })),
      },
    };

    return playlistSongs;
  }
}

export default PlaylistService;
