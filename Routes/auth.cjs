const jwt = require("jsonwebtoken");
const {User} = require("../Models/User.cjs");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid user or password");

    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if (!validpassword) return res.status(400).send("Invalid user or password");

    const token = jwt.sign(
        {
            _id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_KEY
    );
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    };
    return Joi.validate(req, schema);
}
module.exports = router;