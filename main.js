const Discord = require("discord.js");
const Youtube = require("simple-youtube-api");
const Ytdl = require("ytdl-core");

const { TOKEN_DISCORD, TOKEN_YOUTUBE_API } = require("./config");

const preffixCommand = "!";
const rowMusics = [];

const youtube = new Youtube(TOKEN_YOUTUBE_API);
const app = new Discord.Client();

app.on("ready", () => {
  console.log("Estou conectado");
});

app.on("message", async (msg) => {
  if (msg.content == `${preffixCommand}join`) {
    if (msg.member.voice.channel) {
      msg.member.voice.channel.join();
    } else {
      msg.channel.send("Você precisa estar conectado a um canal de voz!");
    }
  } else if (msg.content == `${preffixCommand}leave`) {
    if (msg.member.voice.channel) {
      msg.member.voice.channel.leave();
    } else {
      msg.channel.send("Você precisa estar conectado a um canal de voz!");
    }
  } else if (msg.content.startsWith(`${preffixCommand}play `)) {
    let whichSong = msg.content.replace(`${preffixCommand}play `, "");
    try {
      if (whichSong.startsWith("http")) {
        let video = await youtube.getVideo(whichSong);
        msg.channel.send(`O video encontrado foi ${video.title}`);
      } else {
        let searchedVideo = await youtube.searchVideos(whichSong, 1);
        let findedVideo = await youtube.getVideoByID(searchedVideo[0].id);

        rowMusics.push(`https://www.youtube.com/watch?v=${findedVideo.id}`);

        msg.channel.send(`Vou tocar ${findedVideo.title}`);
      }

      if (rowMusics.length === 1) {
        playMusic(msg);
      }
    } catch (error) {
      console.log(error);
      msg.channel.send(`Nenhum video encontrado com ${whichSong}`);
    }
  }

  function playMusic(msg) {
    msg.member.voice.channel.join().then((connection) => {
      connection
        .play(Ytdl(rowMusics[0], { quality: "highestaudio" }))
        .on("end", () => {
          rowMusics.shift();
          if (rowMusics.length >= 1) {
            playMusic(msg);
          }
        });
    });
  }
});

app.login(TOKEN_DISCORD);
