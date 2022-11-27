import { sign } from "jsonwebtoken";
import randomToken from "random-token";
import connectionDB from "../../utils/dbConnection";
import UserModel from "../../models/users";
import RefreshToken from "../../models/refreshToken";
import bcrypt from "bcrypt";
import endpointHandler from "../../utils/endPointHandler";

//add it in the env
const secret = process.env.secret;

async function POST(req, res) {
  await connectionDB();
  console.log(secret);

  const { username, password } = req.body;
  //check if the user is in database
  //if a user with this username and password exists

  try {
    let user = await UserModel.findOne({ username: username });
    //check if password is correct

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const jwtToken = sign(
        user.toJSON(), //valid for 30 seconds
        secret,
        { expiresIn: "30s" }
      );

      await user.save();
      console.log("this is the current user id", user._id);

      //check if already has a refresh token
      let hasRefreshToken = await RefreshToken.findOne({}, "_id").select({
        user: user._id,
      });
      console.log("this is ref", hasRefreshToken);

      if (hasRefreshToken) {
        console.log("already has refresh token");
        await RefreshToken.findByIdAndRemove(hasRefreshToken._id.toString());
      }

      const refreshToken = randomToken(16) + "Admin"; //replace admin with user.id from DB
      console.log("this is the user id", user._id);

      //create refresh token
      let refTokenBody = {
        token: refreshToken,
        user: user,
      };

      const refreshTtoken = new RefreshToken(refTokenBody);

      try {
        await refreshTtoken.save(); //this is also an async function
        console.log("refresh token has been created");
      } catch (error) {
        console.log("refresh token error");
      }

      console.log("refresh token JSON", refreshTtoken.toJSON());

      let response = { jwt: jwtToken, refreshToken: refreshToken };

      return res
        .status(200)
        .json({ message: "user sucessfulyy logged in", response });
    }
    res.status(401).json({ message: "passwords do not match" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Credentials" });
  }
}

export default endpointHandler({ POST });
