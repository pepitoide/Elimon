const { REST } = require('@discordjs/rest');
const { Routes, SlashCommandBuilder } = require('discord.js');
const fs = require("fs")
require("dotenv").config();

const token = process.env.tokenp;

const clientId = '1002248133968928791';
const guildId = '1002249656924913704';

const commands = []

const filecomandos = fs.readdirSync("./src/createcommands")

for (let file of filecomandos) {
    const command = require(`./createcommands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();