import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const uri = process.env.MONGDB_URL;
console.log('my url',uri)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

connectDB();

const db = client.db("mernJobPortal");
const jobsCollections = db.collection("demoJobs");
const usersCollection = db.collection("users"); // Add users collection for storing account data

// Post a job
app.post("/post-job", async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date();
    const result = await jobsCollections.insertOne(body);
    if (result.insertedId) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send({
        message: "Cannot insert! Try again later",
        status: false
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Get all jobs
app.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await jobsCollections.find().toArray();
    res.send(jobs);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Create account (Sign up)
app.post('/create-account', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if the email already exists in the database
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists!" });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    // Insert the new user into the database
    const result = await usersCollection.insertOne(newUser);

    if (result.insertedId) {
      return res.status(200).send({ message: "Account created successfully!" });
    } else {
      return res.status(400).send({ message: "Account creation failed! Try again later." });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
