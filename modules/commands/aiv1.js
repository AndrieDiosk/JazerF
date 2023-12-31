const axios = require("axios");

const config = {
  name: "aiv1",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jazer",
  description: "OpenAI official AI with no prefix",
  commandCategory: "ai",
  usages: "...",
  cooldowns: 0
};

const handleEvent = async function ({ api, event, client, __GLOBAL }) {

  if (event.body.indexOf("ai") === 0 || event.body.indexOf("Ai") === 0) {
    const { threadID, messageID } = event;
    const input = event.body;
    const message = input.split(" ");

    if (message.length < 2) {
      api.sendMessage("Please provide a question first.", event.threadID, event.messageID);
    } else {
      try {
        api.sendMessage('Please wait while I think through your request...', event.threadID, event.messageID);
        const ris = await axios.get(`https://kazuv4.peachwings.repl.co/api/ai?question=${message.slice(1).join(" ")}`);
        const result = ris.data.answer;
        const a = "credits: www.facebook.com/devs150";
        const jazer = `𝗝𝗔𝗭𝗘𝗥 🤖:\n\n${result}${a}`;
        api.sendMessage(jazer, event.threadID, event.messageID);
      } catch (err) {
        console.error(err);
        api.sendMessage("An error occurred while fetching the data from API.", event.threadID, event.messageID);
      }
    }
  }
};

const run = function ({ api, event, client, __GLOBAL }) {
};

module.exports = { config, handleEvent, run };