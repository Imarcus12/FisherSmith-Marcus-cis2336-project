const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Allow Express to read form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Temporary storage
const artworkSubmissions = [];

// GET request - return all submitted artworks
app.get("/api/artworks", function (req, res) {
    res.json(artworkSubmissions);
});

// POST request - receive artwork submission
app.post("/submit-artwork", function (req, res) {

    const artwork = {
        artistName: req.body.artistName,
        artistEmail: req.body.artistEmail,
        artworkTitle: req.body.artworkTitle,
        artworkCategory: req.body.artworkCategory,
        artworkPrice: req.body.artworkPrice,
        artworkDescription: req.body.artworkDescription
    };

    artworkSubmissions.push(artwork);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Submission Successful</title>
        </head>

        <body>

            <h1>Submission Successful</h1>

            <p>Your artwork has been submitted successfully.</p>

            <p>
                <strong>Artwork:</strong>
                ${artwork.artworkTitle}
            </p>

            <p>
                <strong>Artist:</strong>
                ${artwork.artistName}
            </p>

            <a href="/pages/submission.html">
                Submit Another Artwork
            </a>

            <br><br>

            <a href="/">
                Return Home
            </a>

        </body>
        </html>
    `);
});

// Start server
app.listen(PORT, function () {
    console.log(`ArtConnect server running at http://localhost:${PORT}`);
});