// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import endpointHandler from "../../../utils/endPointHandler";
import isAuthenticatedMiddleware from "../../../utils/isAuthenticatedMiddleware";
import React, { useState } from "react";

async function GET(req, res) {
  res.status(200).json({ name: "Pikachu" });
}

export default endpointHandler(isAuthenticatedMiddleware, { GET });
