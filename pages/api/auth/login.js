import { sign } from "jsonwebtoken";
import randomToken from "random-token";
import connectionDB from "../../../utils/dbConnection";
import UserModel from "../../../models/users";

connectionDB();

//add it in the env
const secret = "ihdsabfiuwbfba";

export default async function (req, res) {
  console.log(secret);

  const { username, password } = req.body;
  //check if the user is in database
  //if a user with this username and password exists

  if (username === "Admin" && password === "Admin") {
    const token = sign(
      { foo: "bar", iat: Math.floor(Date.now() / 1000) - 30 }, //valid for 30 seconds
      secret
    );

    const refreshToken = randomToken(16) + "Admin"; //replace admin with user.id from DB
    console.log("success", token);
    res.status(200).json({ token, refreshToken });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
}
