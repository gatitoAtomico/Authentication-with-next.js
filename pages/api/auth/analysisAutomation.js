// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import endpointHandler from "../../../utils/endPointHandler";
import isAuthenticatedMiddleware from "../../../utils/isAuthenticatedMiddleware";

async function GET(req, res) {
<<<<<<< Updated upstream
  res.status(200).json({ name: "Pokemon" });
=======
  //let user = req.user;
  console.log("apollon");
  res.status(200).json("Success");
>>>>>>> Stashed changes
}

export default endpointHandler(isAuthenticatedMiddleware, { GET });
