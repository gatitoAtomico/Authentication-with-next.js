import connectionDB from "../../utils/dbConnection";
import bcrypt from "bcrypt";
import UserModel from "../../models/users";

export default async function handler(req, res) {
  await connectionDB();
  if (req.method === "POST") {
    var { username, password } = req.body;
    password = await bcrypt.hash(password, 12);
    let body = { username, password };
    const newUser = new UserModel(body);
    console.log(body);

    try {
      await newUser.save(); //this is also an async function
      res.status(201).json(newUser);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }

    // Process a POST request
  } else {
    res.status(404).json("not found");
    // Handle any other HTTP method
  }
}
