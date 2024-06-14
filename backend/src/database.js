export class Database {
  /**
   * If set to true, it will run a mongodb server in memory
   * instead of connecting to the deployment server
   *
   * Set this as false on deployment otherwise leave as true
   * @param {boolean} testmode
   */
  constructor(testmode = true) {
    // Makes a mongodb client instance
    this.client = null;
    this.testmode = testmode;
    // Stores the mongodb database instance
    this.database = null;
    // This stores the mongodb test server if it is in
    // test mode
    this.mongoTestServer = null;
  }

  async connect() {
    let uri = URI;
    console.log("Starting temporary database...");
    // Start test server in memory
    this.mongoTestServer = await MongoMemoryServer.create();
    // Get uri string
    uri = this.mongoTestServer.getUri();
  }
}
