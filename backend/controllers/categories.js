const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllCategories = async (req, res) => {
  try {
    const categories = await mongodb.db.collection('categories').find().toArray();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getSingleCategory = async (req, res) => {
  try {
    const category = await mongodb.db.collection('categories').findOne({ _id: ObjectId(req.params.id) });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const createCategory = async (req, res) => {
  try {
    const category = await mongodb.db.collection('categories').insertOne(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = await mongodb.db.collection('categories').updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const category = await mongodb.db.collection('categories').deleteOne({ _id: ObjectId(req.params.id) });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
