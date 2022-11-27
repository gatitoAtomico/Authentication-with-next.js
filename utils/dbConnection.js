import mongoose from "mongoose";

var connection;

//using db atlas cluster, rememer to add them in the env
const CONNECTION_URL = process.env.mongoDBAtlas;

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
