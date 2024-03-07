import mongoose from "mongoose";

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI);
    return conn;
  } catch (error) {
    return error.message;
  }
};

export default connect;
