const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllBrands = async (req, res) => {
  //#swagger.tags=['Brands'];
  try {
    const db = mongodb.getDb();
    const brands = await db
      .collection('brands')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const getSingleBrand = async (req, res) => {
  //#swagger.tags=['Brands'];
  try {
    const db = mongodb.getDb();
    const brand = await db
      .collection('brands')
      .findOne({ _id: new ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(brand);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const createBrand = async (req, res) => {
  //#swagger.tags=['Brands'];
  try {
    const db = mongodb.getDb();

    // Destructure and validate required fields
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if brand already exists
    const brandExists = await db.collection('brands').findOne({ name });
    if (brandExists) {
      return res.status(400).json({ message: 'Brand already exists' });
    }

    const brand = { name };

    const response = await db.collection('brands').insertOne(brand);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const updateBrand = async (req, res) => {
  //#swagger.tags=['Brands'];
  try {
    const db = mongodb.getDb();
    
    // Destructure and validate required fields
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if brand already exists
    const brandExists = await db.collection('brands').findOne({ name });
    if (brandExists) {
      return res.status(400).json({ message: 'Brand already exists' });
    }

    const brand = { name };

    const response = await db
      .collection('brands')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: brand });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const deleteBrand = async (req, res) => {
  //#swagger.tags=['Brands'];
  try {
    const db = mongodb.getDb();
    const brandId = new ObjectId(req.params.id);

    // Check if any shoes are using this brand
    const shoesUsingBrand = await db.collection('shoes').findOne({ brand: brandId });
    if (shoesUsingBrand) {
      return res.status(400).json({ message: 'Brand is in use' });
    }

    const brand = await db.collection('brands').deleteOne({ _id: brandId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(brand);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

module.exports = {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
