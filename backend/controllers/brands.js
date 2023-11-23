const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllBrands = async (req, res) => {
  try {
    const brands = await mongodb.db.collection('brands').find().toArray();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleBrand = async (req, res) => {
  try {
    const brand = await mongodb.db.collection('brands').findOne({ _id: ObjectId(req.params.id) });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const createBrand = async (req, res) => {
  try {
    const brand = await mongodb.db.collection('brands').insertOne(req.body);
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await mongodb.db.collection('brands').updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const deleteBrand = async (req, res) => {
  try {
    const brand = await mongodb.db.collection('brands').deleteOne({ _id: ObjectId(req.params.id) });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
