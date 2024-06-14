import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

const URI =
  "mongodb+srv://admin:password1234@sitemate.yru3sdi.mongodb.net/?retryWrites=true&w=majority&appName=sitemate";

const DATABASENAME = "sitemate";

const COLLECTIONS = [
  /**
    This stores all the issues in the following form:
    {
      id: string,
      name: string,
      description: string,
    }
  */
  "issues",
];

export class Database {
  /**
   * If set to true, it will run a mongodb server in memory
   * instead of connecting to the deployment server
   */
  constructor() {
    // Makes a mongodb client instance
    this.client = null;
    // Stores the mongodb database instance
    this.database = null;
    // This stores the mongodb test server if it is in
    // test mode
    this.mongoTestServer = null;
  }

  async getIssues() {
    const issues = this.database.collection("issues");
    if (issues !== null) {
      return issues;
    }
    return null;
  }

  /**
   * Connect to the database
   */
  async connect() {
    let uri = URI;
    console.log("Starting temporary database...");
    // Start test server in memory
    this.mongoTestServer = await MongoMemoryServer.create();
    // Get uri string
    uri = this.mongoTestServer.getUri();
    // Start client
    this.client = new MongoClient(uri);
    // Connect to server
    try {
      // console.log('Connecting to MongoDB database...');
      await this.client.connect();
      // console.log('Successfully connected to MongoDB database');
    } catch (err) {
      // console.error('Unable to connect to MongoDb database');
    }
    // Initialise database
    this.database = this.client.db(DATABASENAME);
    for (const collection of COLLECTIONS) {
      const cursor = this.database.listCollections({ name: collection });
      const hasNext = await cursor.hasNext();
      cursor.close();
      if (!hasNext) {
        // console.log(`Creating ${collection}`);
        await this.database.createCollection(collection);
      }
    }
  }

  /**
   * Disconnects from the database
   */
  async disconnect() {
    this.client.close();
    this.mongoTestServer.stop();
  }
}
