const Discord = require("discord.js");

const token = "NzQ4NjAwNzA0MzAxNzkzMzIw.X0fyvA.he--MVrPS7KEd76ZPa8mk62PaII";

const app = new Discord.Client();

app.on("ready", () => {
  console.log("Estou conectado");
});

app.on("message", (msg) => {
  if (msg.content == "!join") {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join();
    } else {
      msg.channel.send("Você precisa estar conectado a um canal de voz!");
    }
  } else if (msg.content == "!leave") {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.leave();
    } else {
      msg.channel.send("Você precisa estar conectado a um canal de voz!");
    }
  }
});

app.login(token);
