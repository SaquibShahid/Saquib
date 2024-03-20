const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", async function (line) {
        try {
            var result = await model.generateContent(line);
        } catch (e) {
            console.log(e.message);
        }

        const response = await result.response;
        const text = response.text();
        console.log(text);
    })


}

run();


