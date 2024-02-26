import User from "../models/usersModel.js";

export const fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.status(200).json({
            "users": users
        });
    } catch (error) {
        res.status(500).send({ "status": "failed", "message": "Unable to fetch users data" });
    }
};

export const editUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body._id, {
            $set: {
                username: req.body.username,
                phone: req.body.phone,
                email: req.body.email
            }
        });

        res.status(200).json({ status: 'success', message: 'Updated user successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ status: 'failed', message: 'Unable to update user' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.body.id;

        if (!userId) {
            return res.status(400).json({ status: 'failed', message: 'Invalid user ID' });
        }

        await User.deleteOne({ _id: userId });

        res.status(200).json({ status: 'success', message: 'Deleted user successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ status: 'failed', message: 'Unable to delete user' });
    }
};
