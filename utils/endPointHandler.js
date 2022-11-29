import { NextApiResponse, NextApiRequest } from "next";
import HTTPError from "./HTTPError";

let a = () => {
  console.log("apollon re mounia");
};

function runMiddleware(req, res, ...args) {
  if (args.length > 0) {
    if (typeof args[0] === "function") {
      return args[0](req, res, (error, status = 500) => {
        if (!error) {
          runMiddleware(req, res, ...args.slice(1));
        } else {
          throw new HTTPError("Middleware error", status, error);
        }
      });
    } else {
      throw new Error("Middleware must be a function");
    }
  }
}

/**
 * *--The last item of args needs to be an object--*
 * @param  {...function|object} args
 * @returns {(req: NextApiRequest, res: NextApiResponse) => void}
 */
export default function endpointHandler(...args) {
  if (args.length < 1) {
    throw new Error("Endpoint handler inccorrectly configured");
  }
  let httpFunctions = args.pop();
  if (typeof httpFunctions !== "object") {
    throw new Error(
      "Endpoint handler inccorrectly configured last argument must be an object"
    );
  }

  /**
   * @param {NextApiRequest} req
   * @param {NextApiResponse} res
   */
  return async (req, res) => {
    let middleware = [...args];
    try {
<<<<<<< Updated upstream
      console.log("before middleware run");

=======
      console.log("request method", req.method);
>>>>>>> Stashed changes
      await runMiddleware(req, res, ...middleware);
      if (httpFunctions[req.method]) {
        await httpFunctions[req.method](req, res);
      } else {
        res
          .status(405)
          .json({ message: `Unsupported Method verb "${req.method}"` });
      }
    } catch (error) {
      if (error.name === "HTTPError") {
        res.status(error.status).json(error.body);
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
}
