const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllCategories = async (req, res) => {
  //#swagger.tags=['Course-Instances'];
  try {
    const db = mongodb.getDb();
    const categories = await db
      .collection('categories')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(categories);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

const getSingleCategory = async (req, res) => {
  //#swagger.tags=['Categories'];
  try {
    const db = mongodb.getDb();
    const category = await db
      .collection('categories')
      .findOne({ _id: ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(category);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

const createCategory = async (req, res) => {
  //#swagger.tags=['Categories'];
  try {
    const db = mongodb.getDb();
    const category = await db
      .collection('categories')
      .insertOne(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(category);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

const updateCategory = async (req, res) => {
  //#swagger.tags=['Categories'];
  try {
    const db = mongodb.getDb();
    const category = await db
      .collection('categories')
      .updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: req.body }
      );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(category);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

const deleteCategory = async (req, res) => {
  //#swagger.tags=['Categories'];
  try {
    const db = mongodb.getDb();
    const category = await db
      .collection('categories')
      .deleteOne({ _id: ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(category);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
