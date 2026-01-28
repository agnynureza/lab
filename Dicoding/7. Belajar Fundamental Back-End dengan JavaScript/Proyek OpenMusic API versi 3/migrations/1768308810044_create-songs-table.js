/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('songs', {
        id:{
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title:{
            type: 'TEXT',
            notNull: true,
        },
        year:{
            type: 'INTEGER',
            notNull: true,
        },
        genre:{
            type: 'VARCHAR(50)',
            notNull: true,
        },
        performer:{
            type: 'VARCHAR(200)',
            notNull: true,
        },
        duration:{
            type: 'INTEGER',
            notNull: false,
        },
        album_id:{
            type: 'VARCHAR(50)',
            notNull: false,
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
