// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import endpointHandler from "../../../utils/endPointHandler";
import isAuthenticatedMiddleware from "../../../utils/isAuthenticatedMiddleware";

function GET(req, res) {
  let user = req.user;
  res.status(200).json(user);
}

export default endpointHandler(isAuthenticatedMiddleware, { GET });
