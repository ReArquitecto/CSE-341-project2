const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllShoes = async (req, res) => {
  try {
    const shoes = await mongodb.db.collection('shoes').find().toArray();
    res.json(shoes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleShoe = async (req, res) => {
  try {
    const shoe = await mongodb.db.collection('shoes').findOne({ _id: ObjectId(req.params.id) });
    res.json(shoe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const createShoe = async (req, res) => {
  try {
    const shoe = await mongodb.db.collection('shoes').insertOne(req.body);
    res.status(201).json(shoe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateShoe = async (req, res) => {
  try {
    const shoe = await mongodb.db.collection('shoes').updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(shoe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const deleteShoe = async (req, res) => {
  try {
    const shoe = await mongodb.db.collection('shoes').deleteOne({ _id: ObjectId(req.params.id) });
    res.json(shoe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllShoes,
  getSingleShoe,
  createShoe,
  updateShoe,
  deleteShoe,
};
