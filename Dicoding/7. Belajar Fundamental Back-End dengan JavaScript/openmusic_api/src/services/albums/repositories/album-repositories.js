import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class AlbumRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async createAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
  
    const query = {
      text: 'INSERT INTO albums(id, name, year) VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this.pool.query(query);
    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async editAlbum({ id, name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async editAlbumCover({ id, fileLocation }){
    const query = {
      text: 'UPDATE albums SET "coverUrl" = $1 WHERE id = $2 RETURNING id',
      values: [fileLocation, id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteAlbum(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async checkUserLikeAlbum({ userId, albumId }) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async addUserLikeAlbum({ userId, albumId }) {
    const id = `like-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO user_album_likes(id, user_id, album_id) VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getAlbumLikes(albumId) {
    const query = {
      text: 'SELECT COUNT(*) FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };
    const result = await this.pool.query(query);
    return parseInt(result.rows[0].count, 10);
  }

  async deleteUserLikeAlbum({ userId, albumId }) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new AlbumRepositories();
