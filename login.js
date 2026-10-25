const fs = require("fs");
const login = require("ws3-fca");

let credentials;
try {
    credentials = {
        appState: JSON.parse(fs.readFileSync("appstate.json", "utf8"))
    };
} catch (err) {
    console.error("❌ Hindi mahanap o sira ang appstate.json file mo.", err);
    process.exit(1);
}

login(credentials, (err, api) => {
    if (err) {
        return console.error("❌ Login Error:", err);
    }

    console.log("✅ Matagumpay na naka-log in gamit ang ws3-fca!");

    // Itakda ang bot para makinig sa mga pumapasok na mensahe
    api.listenMqtt((err, event) => {
        if (err) return console.error("Listen error:", err);

        // Halimbawa ng simpleng tugon
        if (event.type === "message" && event.body === "hi") {
            api.sendMessage("Hello! Online na ang bot gamit ang ws3-fca.", event.threadID);
        }
    });
});
