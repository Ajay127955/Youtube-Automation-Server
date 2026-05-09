const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/new-video", async (req, res) => {

    console.log("Video Received:");
    console.log(req.body);

    res.json({
        success: true,
        message: "Video received successfully"
    });

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});