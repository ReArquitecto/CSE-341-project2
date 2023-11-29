const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllCategories = async (req, res) => {
  //#swagger.tags=['Categories'];
  try {
    const db = mongodb.getDb();
    const categories = await db
      .collection('categories')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const getSingleCategory = async (req, res) => {
  //#swagger.tags=['Categories'];
  try {
    const db = mongodb.getDb();
    const category = await db
      .collection('categories')
      .findOne({ _id: new ObjectId(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const createCategory = async (req, res) => {
  //#swagger.tags=['Categories'];
  try {
    const db = mongodb.getDb();

    // Destructure and validate required fields
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if category already exists
    const categoryExists = await db.collection('categories').findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = { name };

    const response = await db.collection('categories').insertOne(category);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}

const updateCategory = async (req, res) => {
  //#swagger.tags=['Categories'];
  try {
    const db = mongodb.getDb();
    
    // Destructure and validate required fields
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if category already exists
    const categoryExists = await db.collection('categories').findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = { name };
    
    const response = await db
      .collection('categories')
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: category },
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

const deleteCategory = async (req, res) => {
  //#swagger.tags=['Categories'];
  try {
    const db = mongodb.getDb();
    const categoryId = new ObjectId(req.params.id);

    // Check if any shoes are using this category
    const shoeUsingCategory = await db.collection('shoes').findOne({ category: categoryId });
    if (shoeUsingCategory) {
      return res.status(400).json({ message: 'Cannot delete category, it is being used in shoes' });
    }

    const category = await db.collection('categories').deleteOne({ _id: categoryId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ 
      message: 'Error occurred', 
      error: err.message,
    });
  }
}


module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
