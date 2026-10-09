import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkAuth = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).send({
            error: "You are not logged in!"
        });
    }

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send({
                error: "User not found"
            });
        }

        req.user = {
            fullName: user.fullName,
            email: user.email,
            isAdmin: user.isAdmin,
            _id: user._id,
        };

        next();

    } catch (err) {
        return res.status(401).send({
            error: "Invalid or expired token"
        });
    }
};

const checkAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        next();
    }
    else {
        res.status(403).send({error: "You are not authorized to perform this operation"});
    }
};

export {checkAuth, checkAdmin};