import { app, database } from "./index.js";

// Set the command line argument as the port. If not given, it is set as 5050
let PORT = Number(process.argv[process.argv.length - 1]);
if (isNaN(PORT)) {
  PORT = 5050;
}

database.connect();

// Start the server instance
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
