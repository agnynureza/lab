import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import SongRepositories from '../../songs/repositories/song-repositories.js';

class PlaylistRepositories {
  constructor() {
    this.pool = new Pool();
    this.songRepositories = SongRepositories;
  }

  async createPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlists(id, name, owner) VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this.pool.query(query);
    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    const query = {
      text: `SELECT p.id, name, u.username FROM playlists p 
             INNER JOIN users u on u.id = p.owner
             WHERE owner = $1`,
      values: [owner],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async checkPlaylist(id){
    const query = {
      text: 'SELECT * from playlists where id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows.length > 0;
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      return null;
    }

    const playlist = result.rows[0];
    if (playlist.owner !== owner) {
      return null;
    }

    return result.rows[0];
  }

  async deletePlaylist(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async addSongtoPlaylist(playlistId, songId) {
    const id = `playlist-song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_songs(id, playlist_id, song_id) VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this.pool.query(query);
    return result.rows[0].id;
  }

  async getPlaylistSongDetail(playlistId) {
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

    return await this.pool.query(query, [playlistId]);
  }

  async deleteSongInPlaylist(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 and song_id=$2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new PlaylistRepositories();
