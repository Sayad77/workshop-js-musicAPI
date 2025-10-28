const db = require("../../config/database"); // Import the database connection

const readAll = () => {
  return db.query("SELECT * FROM albums");
};

const readOne = (id) => {
  return db.query("SELECT * FROM albums WHERE id = ?", [id]);
};

const readTracksByAlbumId = (id) => {
  return db.query("SELECT * FROM tracks WHERE id_album = ?", [id]);
};

const insertOne = (title, genre) => {
  return db.query("INSERT INTO albums (title, genre) VALUES (?, ?)", [
    title,
    genre,
  ]);
};

const updateOne = (id, album) => {
  return db.query("UPDATE albums SET ? WHERE id = ?", [album, id]);
};

const destroyOne = (id) => {
  return db.query("DELETE FROM albums WHERE id = ?", [id]);
};

// add more function for each action you want to perform on the albums table

module.exports = {
  readAll,
  readOne,
  readTracksByAlbumId,
  insertOne,
  updateOne,
  destroyOne,
};


 
