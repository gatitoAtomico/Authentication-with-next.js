import refreshToken from "../../models/refreshToken";
import { sign } from "jsonwebtoken";
import users from "../../models/users";
import connectionDB from "../../utils/dbConnection";

export default async function handler(req, res) {
  try {
    await connectionDB();
    let rfToken = await refreshToken.findOne({ token: req.body.refreshToken });

    const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const timeDiffInMs = now.getTime() - rfToken.createdAt.getTime();

    if (timeDiffInMs >= twoDaysInMs) {
      console.log("refresh token is older than 2 days");
      //need to logout the user
      res.status(401).json({ message: "your session has expired" });
    } else {
      console.log("refresh token is not older than 2 days");

      let user = await users.findById(rfToken.user.toString());

      const jwtToken = sign(
        user.toJSON(), //valid for 30 seconds
        process.env.secret,
        { expiresIn: "30s" }
      );
      res.status(200).json({ message: "new jwt token created", jwtToken });
    }
  } catch (error) {
    console.log(error.message);
    res.status(403).json({ message: "invalid credentials" });
  }
}
