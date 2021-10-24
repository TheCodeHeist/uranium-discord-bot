import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import dictionary from "./commands/dictionary";
import periodicTable from "./commands/periodicTable";
import config from "./config";
import axios from "axios";
dotenv.config();

console.clear();

const bot = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

bot.on("ready", () => {
  console.log('Uranium Ready! Version: "^' + config.version + '"');
});

bot.on("guildCreate", (guild) => {
  const guildID = guild.id;
  const server = bot.guilds.cache.get(guildID);

  let commands: any;

  if (server) {
    commands = server.commands;
  } else {
    commands = bot.application?.commands;
  }

  commands?.create({
    name: "u_periodic",
    description: "Replies with the details of an element",
    options: [
      {
        name: "element_name",
        description: "The name of the element.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });

  commands?.create({
    name: "u_dictionary",
    description: "Replies with the details of a word",
    options: [
      {
        name: "word",
        description: "The word.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });
});

bot.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  await interaction.deferReply().catch(() => {});

  const { commandName, options } = interaction;

  switch (commandName) {
    case "u_periodic":
      periodicTable.run(options, interaction);
      break;

    case "u_dictionary":
      dictionary.run(options, interaction);
      break;
  }
});

bot.on("messageCreate", (message) => {
  if (message.author.bot) return;
  // console.log(message.channel.type);

  if (message.channel.type === "DM") {
    axios
      .get(
        `https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`
      )
      .then((response: any) => response.data)
      .then((data: any) => {
        let msg: string;

        if (data.response.includes("Acobot Team")) {
          msg = data.response.replace("Acobot Team", "TheCodeHeist");
        } else if (data.response.includes("Aco")) {
          msg = data.response.replace("Aco", "Uranium");
        } else {
          msg = data.response;
        }

        message.reply({
          content: msg,
        });
      })
      .catch((error: any) => {
        message.reply({
          content: "I'm sorry, I'm having trouble talking to you.",
        });
      });
  }

  // if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  // const args: any = message.content
  //   .slice(config.prefix.length)
  //   .trim()
  //   .split(/ +/);
  // const command = args.shift().toLowerCase();

  // if (command === "ping") {
  //   message.channel.send("Pong!");
  // }
});

bot.login(process.env.TOKEN);
