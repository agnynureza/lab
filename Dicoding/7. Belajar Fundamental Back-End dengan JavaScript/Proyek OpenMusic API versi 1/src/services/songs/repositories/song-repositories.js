import { Pool } from "pg";
import { nanoid } from "nanoid";

class SongRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async createSong({ title, year, genre, performer, duration, albumId }) {
    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO songs(id, title, year, genre, performer, duration, album_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this.pool.query(query);
    return result.rows[0].id;
  }

  async getSongs(){
    const query = {
      text: "SELECT id, title, performer FROM songs",
    };

    const result = await this.pool.query(query);

    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: "SELECT * FROM songs WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async editSong({  id, title, year, genre, performer, duration, albumId }) {
    const query = {
      text: "UPDATE songs SET title = $1, year = $2, genre=$3, performer=$4, duration=$5, album_id=$6 WHERE id = $7 RETURNING id",
      values: [title, year, genre, performer, duration, albumId, id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteSong(id) {
    const query = {
      text: "DELETE FROM songs WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

export default new SongRepositories();
