require("dotenv").config();

const express = require("express");
const cors = require("cors");

const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post("/new-video", async (req, res) => {

    try {

        console.log("\n===== VIDEO RECEIVED =====\n");

        console.log(req.body);

        const fileName = req.body.fileName;

        const cleanName =
            fileName.replace(".mp4", "");

        const completion =
            await groq.chat.completions.create({

                messages: [

                    {
                        role: "system",
                        content:
                            "You are a viral YouTube Shorts SEO expert."
                    },

                    {
                        role: "user",
                        content:
`
Generate:

1. Viral YouTube Shorts title
2. SEO optimized description
3. Trending hashtags
4. SEO tags

Video Topic:
${cleanName}

Make it modern, emotional, clickable and viral.
`
                    }

                ],

                model: "llama-3.3-70b-versatile",

                temperature: 0.9

            });

        const aiResponse =
            completion.choices[0].message.content;

        console.log(
            "\n===== AI GENERATED METADATA =====\n"
        );

        console.log(aiResponse);

        res.json({
            success: true,
            metadata: aiResponse
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