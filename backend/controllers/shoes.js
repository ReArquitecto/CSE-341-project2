const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllShoes = async (req, res) => {
  //#swagger.tags=['Course-Instances'];
  try {
    const db = mongodb.getDb();
    const shoes = await db
      .collection('shoes')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shoes);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

const getSingleShoe = async (req, res) => {
  //#swagger.tags=['Shoes'];
  try {
    const db = mongodb.getDb();
    const shoe = await db
      .collection('shoes')
      .findOne({ _id: ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shoe);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

const createShoe = async (req, res) => {
  //#swagger.tags=['Shoes'];
  try {
    const db = mongodb.getDb();
    const shoe = await db
      .collection('shoes')
      .insertOne(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(shoe);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

const updateShoe = async (req, res) => {
  //#swagger.tags=['Shoes'];
  try {
    const db = mongodb.getDb();
    const shoe = await db
      .collection('shoes')
      .updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: req.body }
      );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shoe);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

const deleteShoe = async (req, res) => {
  //#swagger.tags=['Shoes'];
  try {
    const db = mongodb.getDb();
    const shoe = await db
      .collection('shoes')
      .deleteOne({ _id: ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shoe);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllShoes,
  getSingleShoe,
  createShoe,
  updateShoe,
  deleteShoe,
};
