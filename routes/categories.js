var express = require('express');
var router = express.Router();
let categorySchema = require('../schemas/category')

router.get('/', async function(req, res, next) {
  try {
    let categories = await categorySchema.find({isDeleted: false})
    res.status(200).send({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});


router.get('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categorySchema.findOne({_id: id, isDeleted: false})
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category khong ton tai"
      });
    }
    res.status(200).send({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).send({
      success: false, 
      message: error.message
    });
  }
});


router.post('/', async function(req, res, next) {
  try {
    let body = req.body;
    let newCategory = new categorySchema({
      name: body.name,
      description: body.description
    });
    await newCategory.save()
    res.status(201).send({
      success: true,
      data: newCategory
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});


router.put('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categorySchema.findOne({_id: id, isDeleted: false});
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category khong ton tai"
      });
    }
    let body = req.body;
    if (body.name) {
      category.name = body.name;
    }
    if (body.description !== undefined) {
      category.description = body.description;
    }
    await category.save()
    res.status(200).send({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});


router.delete('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categorySchema.findOne({_id: id, isDeleted: false});
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category khong ton tai"
      });
    }
    category.isDeleted = true;
    await category.save()
    res.status(200).send({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;