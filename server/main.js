// Get dependencies
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { seed, mongoUri } from './config';
import statisticsRoutes from './statistics/routes';
import statisticsSeed from './statistics/seed';

// Mongo configuration
const mongoDB = process.env.MONGODB_URI || mongoUri;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (seed) {
  try {
    statisticsSeed();
  }
  catch(err) {
    console.log('error while seeding the data');
  }
}

// Bodyparser and cors configuration
const app = express();

app.use(morgan('combined'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set our api routes
app.use('/api/statistics', statisticsRoutes);

app.get('*',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4200';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
