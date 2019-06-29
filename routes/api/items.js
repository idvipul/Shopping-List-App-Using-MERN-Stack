const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get all items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 }) // Desc order by Date
    .then(items => res.status(200).json(items))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route   POST api/items
// @desc    Create an item
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem
    .save()
    .then(item => res.status(200).json(item))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route   DELETE api/items/:id
// @desc    Delete an item
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item
        .remove()
        .then(() => res.status(200).json("Item Removed!"))
        .catch(err => res.status(400).json("Error: " + err))
    ) 
    .catch(err => res.status(404).json("Error: " + err));
});

module.exports = router;