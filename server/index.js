const express = require("express");
const cors = require("cors");
const user = require("./mogo.js");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", cors(), (req, res) => {
  res.send("Welcome to the API");
});



app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await user.findOne({ email: email });
        if (users) {
            bcrypt.compare(password, users.password, (err, resp) => {
                if (resp) {

                    res.status(200).json({ message: "success" });
                } else if (err) {
                    console.log(err);
                    res.json("incorrect password"); 
                }
            });
        } else {
            res.json("not found"); 
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("Server error"); // Send response here for other errors
    }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await user.findOne({ email: email });
    if (check) {
      return res.json("exist");
    } else {
      // Hash the password and create the user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await user.create({ email, password: hashedPassword });
      
      // Respond with the created user
      return res.status(201).json({message: "Signed In", user: newUser });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8000, () => {
  console.log("port connected");
});
