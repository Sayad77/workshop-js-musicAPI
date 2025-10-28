const albumsModel = require("./model");

const getAll = async ({ res, next }) => {
  try {
    const [albums] = await albumsModel.readAll(); // Fetch all albums from the database
    res.json(albums); // Respond with the albums in JSON format
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [[album]] = await albumsModel.readOne(id);
    if (!album) res.sendStatus(404);
    else res.json(album);
  } catch (error) {
    next(error);
  }
};

const getTracksByAlbumId = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [[album]] = await albumsModel.readOne(id);
    if (!album) res.sendStatus(404);
    else {
      const [tracks] = await albumsModel.readTracksByAlbumId(id);
      album.tracks = tracks;
      res.json(album);
    }
  } catch (error) {
    next(error);
  }
};

const postAlbums = async (req, res, next) => {
  try {
    const { title, genre } = req.body;
    if (!title) return res.status(400).json("title is required");
    const [result] = await albumsModel.insertOne(title, genre);
    const [[album]] = await albumsModel.readOne(result.insertId);
    res.status(201).json(album);
  } catch (error) {
    next(error);
  }
};

const updateAlbums = async (req, res, next) => {
  try {
    const album = req.body;
    const id = Number(req.params.id);
    const [result] = await albumsModel.updateOne(id, album);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const deleteAlbums = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [result] = await albumsModel.destroyOne(id);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  getTracksByAlbumId,
  postAlbums,
  updateAlbums,
  deleteAlbums,
};
 
