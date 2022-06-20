const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_KEY, (err, Data) => {
            if (err) {

                return res.status(403).json("Invalid Token");
            }
            else {
                req.user=Data;
                next();}
        });
    }else {
        res.sendStatus(401).json("Unauthorized");
    }
}
const verifyAuthorisation = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin || req.user._id === req.params.id) {
            next();
        } else {
            res.status(403).json("You are not authorized to perform this action");
        }
    }   );
}
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not authorized to perform this action");
        }
    });
}
module.exports = {
    verifyToken,
    verifyAuthorisation,
    verifyAdmin
}
