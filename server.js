const express = require("express");
const path = require("path");
const bookRoutes = require("./routes/book-routes");
const connectToDb = require("./database/db");
const app = express();

// Middleware to parse JSON body
app.use(express.json()); // This is necessary for handling JSON payloads

const PORT = process.env.PORT || 5000;  // Set to 5000 as per your URL

// Connect to database
connectToDb();

// Middleware to serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Add routes
app.use("/api/books", bookRoutes);

// Serve the home page (index.html) for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
``