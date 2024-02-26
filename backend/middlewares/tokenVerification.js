import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

const tokenVerification = async (req, res, next) => {
    const token = req.cookies.jwt;

    try {
        if (!token) {
            throw new Error("Unauthorized user, no token");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const currentUser = await User.findById(decoded.userId).select('-password');

        if (!currentUser) {
            throw new Error("Unauthorized user");
        }

        if (currentUser.role !== 'admin') {
            throw new Error("Insufficient permissions");
        }

        return next();
    } catch (error) {
        const status = error.message === "Insufficient permissions" ? 403 : 401;
        res.status(status).send({ "status": "failed", "message": error.message });
    }
};

export default tokenVerification;