import mongoose from 'mongoose';

const Connection = async () => {
    try {
        const URL = "mongodb://127.0.0.1:27017/Users";
        mongoose.set('strictQuery', false);
        await mongoose.connect(URL);
        console.log("Connected to database succesfully.");
    } catch (error) {
        console.log(error);
    }
};

export default Connection;