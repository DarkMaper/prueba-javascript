import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to database'))
.catch(err => console.error(err));