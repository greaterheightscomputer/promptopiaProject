import mongoose from 'mongoose';

let isConnected = false; //its allow us to track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true); //to avoid getting warning or error on the console

  if (isConnected) {
    console.log('MongoDB is already connected');
    return; //to stop it from reconnecting
  }

  try {
    //for new connection to mongodb
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
