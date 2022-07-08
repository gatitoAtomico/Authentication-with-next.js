import mongoose from "mongoose";

var connection;

//using db atlas cluster, rememer to add them in the env
const CONNECTION_URL =
  "mongodb+srv://george:y0uJ6FfIXbcYpo9P@cluster0.mlvuq.mongodb.net/authenticationDatabase?retryWrites=true&w=majority";

export default async function connectionDB() {
  if (!connection) {
    connection = await mongoose
      .connect(CONNECTION_URL)
      .then((res) => {
        res;
        console.log("Database Conected");
      })
      .catch((err) => console.log("Database error: ", err.message));
  }
  return connection;
}

//where to use?
export async function closeMongoDBConnection() {
  return mongoose.connection.close();
}
