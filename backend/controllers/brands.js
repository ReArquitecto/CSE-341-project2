const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllBrands = async (req, res) => {
  //#swagger.tags=['Course-Instances'];
  try {
    const db = mongodb.getDb();
    const brands = await db
      .collection('brands')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(brands);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

const getSingleBrand = async (req, res) => {
  //#swagger.tags=['Brands'];
  try {
    const db = mongodb.getDb();
    const brand = await db
      .collection('brands')
      .findOne({ _id: ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(brand);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

const createBrand = async (req, res) => {
  //#swagger.tags=['Brands'];
  try {
    const db = mongodb.getDb();
    const brand = await db
      .collection('brands')
      .insertOne(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(brand);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

const updateBrand = async (req, res) => {
  //#swagger.tags=['Brands'];
  try {
    const db = mongodb.getDb();
    const brand = await db
      .collection('brands')
      .updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: req.body }
      );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(brand);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

const deleteBrand = async (req, res) => {
  //#swagger.tags=['Brands'];
  try {
    const db = mongodb.getDb();
    const brand = await db
      .collection('brands')
      .deleteOne({ _id: ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(brand);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
