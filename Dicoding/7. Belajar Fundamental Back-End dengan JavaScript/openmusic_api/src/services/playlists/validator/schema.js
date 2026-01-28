import Joi from'joi';

export const playlistSchema = Joi.object({
  name: Joi.string().required(),
});

export const songPlaylistSchema = Joi.object({
  songId: Joi.string().required(),
});