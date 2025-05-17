import mongoose from 'mongoose';
import { config } from '../config/app.config';
import chalk from 'chalk';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log(chalk.greenBright('Connect to Mongo Database'));
  } catch (error) {
    console.log(chalk.red.bold('Error connecting to Mongo Database'));
    process.exit(1);
  }
};

export default connectToDatabase;
