const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/Users");

//@route  POST api/users
//@desc   Register user
//@access public
router.post(
  "/",
  [
    check("name", "Name is required and must be between 2 to 20 characters")
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 20 }),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 to 12 characters"
    ).isLength({
      min: 6,
      max: 12
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ code: 1, errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return (
          res
            .status(400)
            .json({ code: 1, errors: [{ msg: "User already exists" }] })
        );
      }

      user = new User({
        name: name,
        email: email,
        password: password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ code: 0, token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
