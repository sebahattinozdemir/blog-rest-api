const router = require("express").Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const Post = require("./../models/Post");

//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      await Post.deleteMany({ username: user.username });
      const user = await User.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can only update your account!");
  }
});

//delete
router.delete("/:id", async (req, res) => {
  if ( String(req.body.userId).includes(req.params.id)) {
    try {
      const user = User.findById(req.body.userId);
      try {
        await User.findByIdAndDelete(req.body.userId);
        res.status(200).json("user deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("USER NOT FOUND");
    }
  } else {
    res.status(401).json("You can only delete your account!");
  }
});

// get user

router.get("/:id",async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others);

    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;
