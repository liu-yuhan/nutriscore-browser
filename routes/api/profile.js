const { check, validationResult } = require("express-validator/check");
const express = require("express");
const router = express.Router();
const auth = require("../../routes/middleware/auth");
const User = require("../../models/Users");


//@route  GET api/profile
//@desc   Profile Route
//@access private
router.get("/", auth, async (req, res) => {
<<<<<<< master
    // console.log(req);
=======
>>>>>>> Ajout de tests mocha (Profile/Début products)
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//@route  PUT api/profile/edit
//@desc   Edit Profile Route
//@access public
router.post(
    "/edit",
    [
        check("name", "Name is required and must be between 2 to 20 characters")
            .not()
            .isEmpty()
            .isLength({ min: 2, max: 20 }),
        check("email", "Please include a valid email").isEmail(),
    ],
    async (req, res) => {
        console.log('Req Edit', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ code: 1, errors: errors.array() });
        }

        let query = { _id: req.body.id };
        let update = {
            name: req.body.name,
            email: req.body.email
        };
        // const { id, name, email } = req.body;
        // console.log(name);
        User.findOneAndUpdate(query, update, {new: true}, (err, user) => {
            console.log(user);
            if(err){
                res.send(JSON.stringify({
                    message: 'Server error'
                }));
                console.log(err)
            }
            else {
                res.send(JSON.stringify({
                    message: 'Successful',
                }))
            }
        })
    }
);



module.exports = router;
