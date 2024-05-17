// Import MongoDB module
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Get the MongoDB connection option on default values
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Construct the MongoDB connection URI
    const uri = `mongodb://${host}:${port}/${database}`;

    // Create a MongoDB client
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    // Initialize and connect to the MongoDB server
    this.client.connect((error) => {
      if (error) {
        console.error('Error connecting to MongoDB:', error);
      } else {
        console.log('Connected to MongoDB successfully.');
      }
    });
  }

  isAlive() {
    // MongoDB client connected to the server
    return this.client.isConnected();
  }

  async nbUsers() {
    // Use the MongoDB client to count the number of documents in the users collection
    const db = this.client.db();
    const usersCollection = db.collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    const db = this.client.db();
    const filesCollection = db.collection('files');
    return filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
