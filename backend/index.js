import express from "express";
import { connection } from "./configs/db.js";
import { authentication } from "./middleware/authenticate.middleware.js";
import { notesRouter } from "./routes/Notes.route.js";
import { userRouter } from "./routes/User.route.js";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use(authentication);
app.use("/notes", notesRouter);

app.get("/", (req, res) => {
  res.send({ status: "Successfull", message: "Welcome to my application" });
});

// app.get("/data", (req, res) => {
//   const token = req.headers.authorization;
//   try {
//     jwt.verify(token, "privateKey", (err, decoded) => {
//       // console.log(decoded.course); // backend
//       if (err) {
//         res.send("Invalid token");
//       } else {
//         res.send({ status: "success", data: "This is your items" });
//       }
//     });
//   } catch (error) {
//     res.send({ message: "Something went wrong" });
//   }
// });

const port = 8080;
app.listen(port, async () => {
  try {
    await connection;
    console.log("Database connection successful");
  } catch (error) {
    console.log("Error while connecting to database");
    console.log(error);
  }
  console.log(`Server is listening on ${port}`);
});
