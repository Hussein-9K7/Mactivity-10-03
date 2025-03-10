// routes/propertyRoutes.js
const express = require('express');
const Property = require('../models/property');

const router = express.Router();

router.post('/properties', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).send(newProperty);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).send(properties);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send({ message: 'Property not found' });
    }
    res.status(200).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/properties/:id', async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProperty) {
      return res.status(404).send({ message: 'Property not found' });
    }
    res.status(200).send(updatedProperty);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/properties/:id', async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).send({ message: 'Property not found' });
    }
    res.status(200).send({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
