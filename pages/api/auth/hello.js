// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import verify from "jsonwebtoken/verify";

export default function handler(req, res) {
  if (!req.headers.authorization) {
    res.status(400).json("Bad Request");
    return;
  }

  let jwt = req.headers.authorization.replace("Bearer ", "");
  //console.log("exists", jwt.substring(0, 10));

  console.log("this is from an authenticated endpoint");

  try {
    verify(jwt, process.env.secret);
    // res.status(200).json(decoded);
    res.status(200).json("this is a sucessfulll request");
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(403).json("expired jwt");
    } else {
      console.log("expired");
      res.status(400).json("invalid jwt");
    }
  }
}
