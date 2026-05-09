require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash"
});

app.post("/new-video", async (req, res) => {

    try {

        console.log("\n===== VIDEO RECEIVED =====\n");

        console.log(req.body);

        const fileName = req.body.fileName;

        const cleanName =
            fileName.replace(".mp4", "");

        const prompt = `
Generate:

1. Viral YouTube Shorts title
2. SEO optimized description
3. Trending hashtags
4. SEO tags

Video topic:
${cleanName}

Make it modern, clickable and viral.
`;

        const result =
            await model.generateContent(prompt);

        const response =
            result.response.text();

        console.log(
            "\n===== AI GENERATED METADATA =====\n"
        );

        console.log(response);

        res.json({
            success: true,
            metadata: response
        });

    } catch (error) {

        console.log("\n===== ERROR =====\n");

        console.log(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

app.get("/", (req, res) => {

    res.send(
        "YouTube Automation Server Running 🚀"
    );

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});