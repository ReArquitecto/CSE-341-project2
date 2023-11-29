const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllShoes = async (req, res) => {
  //#swagger.tags=['Shoes'];
  try {
    const db = mongodb.getDb();
    const shoes = await db
      .collection('shoes')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shoes);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const getSingleShoe = async (req, res) => {
  //#swagger.tags=['Shoes'];
  try {
    const db = mongodb.getDb();
    const shoe = await db
      .collection('shoes')
      .findOne({ _id: new ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shoe);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const createShoe = async (req, res) => {
  //#swagger.tags=['Shoes'];
  try {
    const db = mongodb.getDb();

    // Destructure and validate required fields
    const { name, brand, category, price, sizes, colors, description } = req.body;
    if (!name || !brand || !category || !price || !sizes || !colors || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate Brand ID
    const brandExists = await db.collection('brands').findOne({ _id: new ObjectId(brand) });
    if (!brandExists) {
      return res.status(400).json({ message: 'Brand not found' });
    }

    // Validate Category ID
    const categoryExists = await db.collection('categories').findOne({ _id: new ObjectId(category) });
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const shoe = { name, brand, category, price, sizes, colors, description };

    const response = await db.collection('shoes').insertOne(shoe);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const updateShoe = async (req, res) => {
  //#swagger.tags=['Shoes'];
  try {
    const db = mongodb.getDb();

    // Destructure and validate required fields
    const { name, brand, category, price, sizes, colors, description } = req.body;
    if (!name || !brand || !category || !price || !sizes || !colors || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate Brand ID
    const brandExists = await db.collection('brands').findOne({ _id: new ObjectId(brand) });
    if (!brandExists) {
      return res.status(400).json({ message: 'Brand not found' });
    }

    // Validate Category ID
    const categoryExists = await db.collection('categories').findOne({ _id: new ObjectId(category) });
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const shoe = { name, brand, category, price, sizes, colors, description };

    const response = await db.collection('shoes').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: shoe }
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
} catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const deleteShoe = async (req, res) => {
  //#swagger.tags=['Shoes'];
  try {
    const db = mongodb.getDb();
    const response = await db.collection('shoes').deleteOne({ _id: new ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

module.exports = {
  getAllShoes,
  getSingleShoe,
  createShoe,
  updateShoe,
  deleteShoe,
};
