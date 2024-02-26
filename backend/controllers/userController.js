import User from '../models/usersModel.js';

export const editProfile = async (req, res) => {
    try {
        const { username, phone, email } = req.body;
        const currentUser = await User.findOne({ username });

        if (currentUser?.username !== username) {
            const usernameExist = await User.findOne({ _id: { $ne: currentUser._id }, username });
            if (usernameExist) {
                return res.status(400).json({ status: 'failed', message: 'Username already taken' });
            }
        }

        if (currentUser?.email !== email) {
            const emailExist = await User.findOne({ _id: { $ne: currentUser._id }, email });
            if (emailExist) {
                return res.status(400).json({ status: 'failed', message: 'Email already taken' });
            }
        }
        const updatedObj = {
            email,
            phone,
        };
        if (req.file) updatedObj.profile = req.file.filename;
        
        const user = await User.findOneAndUpdate(
            { username },
            {
                $set: updatedObj,
            },
            { new: true }
        );

        res.status(200).json({ status: 'success', message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ status: 'failed', message: 'Unable to update user' });
    }
};