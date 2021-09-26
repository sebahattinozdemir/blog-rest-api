const router = require("express").Router();
const Category = require("../models/Category");

// create category
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get category
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update category
router.put("/:id", async (req, res) => {
    
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
