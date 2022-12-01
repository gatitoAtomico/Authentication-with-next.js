import verify from "jsonwebtoken/verify";

export default async function (req, res, next) {
  console.log("after middleware run");
  if (!req.headers.authorization) {
    next({ message: "badRequest" }, 400);
    return;
  }

  let jwt = req.headers.authorization.replace("Bearer ", "");
  //console.log("exists", jwt.substring(0, 10));
  console.log("this is from an authenticated endpoint");

  try {
    let user = await verify(jwt, process.env.secret);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next({ message: "tokenExpired" }, 403);
      return "hello";
    } else {
      next({ message: "invalidToken" }, 401);
    }
  }
}
