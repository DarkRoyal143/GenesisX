const DiscordMusicBot = require("./structures/DiscordMusicBot");
const client = new DiscordMusicBot();

client.build();

module.exports = client; //;-;

//auto pinging

let count = 0;
setInterval(
  () =>
    require("node-fetch")(process.env.URL).then(() =>
      console.log(`[${++count}] here i pinged ${process.env.URL}`)
    ),
  300000
);
