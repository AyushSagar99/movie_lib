const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const { User, movieLib } = require("./mogo");
const router = express.Router();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", cors(), (req, res) => {
  res.send("Welcome to the API Please use /login in URL");
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user; 
    next();
  });
}

module.exports = authenticateToken;





app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

    return res.status(200).json({ message: "Logged In", token, user: user });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await User.findOne({ email: email });
    if (check) {
      return res.status(409).json({ error: "User already exists" }); 
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashedPassword });

      
      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'your_secret_key', { expiresIn: '1h' });

      return res.status(201).json({ message: "Signed In", token, user: newUser });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/add-movie', authenticateToken  ,async (req, res) => {
  const { title, year, image, userId } = req.body;

  try {
    const movieLibrary= await movieLib.findOne({user :userId})
    if(movieLibrary){
      const existingMovieIndex = movieLibrary.movies.findIndex(
        movie => movie.title === title
      );

      if (existingMovieIndex !== -1) {
        movieLibrary.movies[existingMovieIndex] = { title, year, image };
      } else {
        movieLibrary.movies.push({ title, year, image });
      }
  
      await movieLibrary.save();

    }
    else{
    const newMovie = await movieLib.create({
      user: userId,
      movies: [
        {
          title: title,
          year: year,
          image: image
        }
      ]
    });
  }
    
    return res.status(201).json('success');
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/movies',authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const movieLibrary = await movieLib.findOne({ user: userId });

    res.json({movies:movieLibrary.movies,userId});
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/isprivate", authenticateToken, async (req, res) => {
  const { userId, isPrivate } = req.body;

  try {
    const movieLibrary = await movieLib.findOneAndUpdate(
      { user: userId },
      { isPrivate: isPrivate },
    );

    if (!movieLibrary) {
      return res.status(404).json({ error: 'Movie library not found' });
    }

    res.status(200).json({ message: 'Privacy setting updated successfully', isPrivate: movieLibrary.isPrivate });
  } catch (error) {
    console.error('Error updating privacy setting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/movies/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const movieLibrary = await movieLib.findOne({ user: userId });

    if (!movieLibrary) {
      return res.status(404).json({ error: 'No movie library found for this user' });
    }

    return res.status(200).json({ movies: movieLibrary.movies, userId: movieLibrary.user, isPrivate: movieLibrary.isPrivate });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;

app.listen(3000, () => {
  console.log("port connected");
});
















