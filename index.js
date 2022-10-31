const Discord = require("discord.js");
const embed = require("./src/funciones/embed")
const btns = require("./src/funciones/btns")
const music_func = require("./src/funciones/music")
const config = require("./src/config/config")
const server_config = require("./src/funciones/server_config.js")
const fs = require("fs")
const { DisTube } = require("distube")
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp');
require("dotenv").config();

const prefix = config.prefijo;
const token = process.env.token;
//const token = process.env.tokenp;

const client = new Discord.Client({
    intents: "131071"
})

//handler
client.commands = new Discord.Collection;

const filesCommands = fs.readdirSync("./src/commands")
const fileSlashCommands = fs.readdirSync("./src/slashCommands")

for (let file of filesCommands) {
    let listCommands = fs.readdirSync(`./src/commands/${file}`).filter(file => file.endsWith(".js"))
    listCommands.forEach(e => {
        let reqCommand = require(`./src/commands/${file}/${e}`)
        client.commands.set(reqCommand.name, reqCommand)
    })
}

for (let file of fileSlashCommands) {
    let listCommands = fs.readdirSync(`./src/slashCommands/${file}`).filter(file => file.endsWith(".js"))
    listCommands.forEach(e => {
        let reqCommand = require(`./src/slashCommands/${file}/${e}`)
        client.commands.set(reqCommand.name, reqCommand)
    })
}

//eventos discord


client.on("ready", () => {

    console.log(`Bot ON! conectado en: ${client.guilds.cache.size} servidores y ${client.users.cache.size} usuarios.`);
    client.user.setPresence({ activities: [{ name: `Escuchando tus Commands [+help]` }] });
})

client.on("guildCreate", (guildCreate) => {
    server_config.create_server_config(server_id = guildCreate.id, server_name = guildCreate.name)
})

client.on("guildDelete", (guildDelete) => {
    server_config.delete_server_config(server_id = guildDelete.id, server_name = guildDelete.name)
})

/*
client.on("guildMemberAdd", (member) => {
    let canal = client.channels.cache.get('1009485149660000379'); 
    canal.send(`Hola ${member.user}, bienvenido al servidor ${member.guild.name} pasala bien!.`);


});

client.on("guildMemberRemove", (member) => {
    let canal = client.channels.cache.get('1009485149660000379'); 
    canal.send(`${member.user}, a dejado el servidor.`);
   
});*/


client.on('messageCreate', async (message) => {
    if (message.channel.type === 1 || message.channel.type === 3) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(" ");
    const comando = args.shift().toLocaleLowerCase();
    try {
        let cmd = client.commands.find(e => e.name === comando || e.alias.includes(comando))
        if (!cmd) return (message.channel.send({ embeds: [embed.comand_warning] }))
        if (cmd) { cmd.execute(client, message, args, comando) }
    } catch (error) {
        console.log("error include cmd")
    }
})

client.on('interactionCreate', interaction => {

    if (interaction.isButton()) {
        if (interaction.customId === "pause") {

            music_func.pause(client, interaction).then(e => {
                if (e) {
                    interaction.reply({ embeds: [embed.embed_music(txt = "**Cancion pausada**")] })
                } else (interaction.reply({ embeds: [embed.embed_music(txt = "**La cancion ya esta pausada**")] }))
            })

        } else if (interaction.customId === "renudar") {
            music_func.renudar(client, interaction).then(e => {
                if (e) {
                    interaction.reply({ embeds: [embed.embed_music(txt = "**La cancion se ha renunado correctamente**")] })
                } else (interaction.reply({ embeds: [embed.embed_music(txt = "**La cancion ya se esta reproduciendo**")] }))
            })

        } else if (interaction.customId === "skip") {

            music_func.skip(client, interaction)

        } else if (interaction.customId === "stop") {

            music_func.stop(client, interaction)

        } else if (interaction.customId === "autoplay") {
            music_func.autoplay(client, interaction)
        }
    } else if (interaction.isCommand()) {
        let cmd = client.commands.find(e => e.name === interaction.commandName)
        if (!cmd) return interaction.reply({ embeds: [embed.embed_elimon(txt = "**Ha ocurrido un error interno**")] })
        cmd.execute(interaction)
    }
})


client.on(`messageDelete`, async (message) => {
    let search = await server_config.buscar(server_id = message.guild.id)
    if (!search || !search.guild.logs.activate) return
    try {
        let channelSet = await message.guild.channels.fetch(search.guild.logs.channel)
        channelSet.send({ embeds: [embed.embed_logs(tiitle = 'Se ha eliminado el siguiente mensaje', txt = `**Mensaje:** ${message.content}\n**Canal:** ${message.channel.name} \n**Usuario:** <@${message.author.id}> \n **ID de usuario:** ${message.author.id}`)] })

    } catch (err) {
        let channels = await message.guild.channels.fetch(undefined);
        let channel_err = channels.filter(e => e.type === 0).first()
        channel_err.send({ embeds: [embed.embed_logs(tiitle = "Ha ocurrido un error en la cofiguración", txt = "El canal de logs se elimino o no se guardo correctamente \n `Desactive los logs y activelos nuevamente`")] })
    }
})

client.on(`messageUpdate`, async (message) => {
    if (message.author.bot) return
    let search = await server_config.buscar(server_id = message.guild.id)
    if (!search || !search.guild.logs.activate) return
    try {
        let channelSet = await message.guild.channels.fetch(search.guild.logs.channel)
        let message_edit = await message.channel.messages.fetch(`${message.id}`)
        channelSet.send({ embeds: [embed.embed_logs(tiitle = 'Se ha editado el siguiente mensaje', txt = `**Mensaje editado:** ${message.content}\n **Mensaje:** ${message_edit.content} \n**Canal:** ${message.channel.name} \n**Usuario:** <@${message.author.id}> \n **ID de usuario:** ${message.author.id}`)] })

    } catch (err) {
        let channels = await message.guild.channels.fetch(undefined);
        let channel_err = channels.filter(e => e.type === 0).first()
        channel_err.send({ embeds: [embed.embed_logs(tiitle = "Ha ocurrido un error en la cofiguración", txt = "El canal de logs se elimino o no se guardo correctamente \n `Desactive los logs y activelos nuevamente`")] })
    }
})

//Musica
client.distube = new DisTube(client, {
    leaveOnStop: true,
    leaveOnEmpty: true,
    emptyCooldown: 15,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
    ]
})

client.distube
    .on(`playSong`, (queue, song) => {
        queue.textChannel.send({ embeds: [embed.play(song)], components: [btns.music_controler] })
    })
    .on(`addSong`, (queue, song) => {
        let req = client.distube.getQueue(queue.id);

        const q = req.songs.map(e => e.name)
        if (q.shift() === song.name) return

        queue.textChannel.send({ embeds: [embed.addSong(song)] })
    })

    .on(`addList`, (queue, song) => { queue.textChannel.send({ embeds: [embed.embed_music(txt = `Lista añadida: **${song.name}**`)] }) })

    .on("finishSong", (queue, song) => {
        const s = client.channels.cache.get(queue.textChannel.id).messages.fetch(`${queue.textChannel.lastMessageId}`).then(e => {
            if (e.author.me) {
                e.edit({ components: [] })
            } return
        })
    })

    .on("finish", queue => {
        let txt = "**No hay mas canciones por reproducir**"
        queue.textChannel.send({ embeds: [embed.embed_music(txt)] })

        setTimeout(() => {
            queue.stop()
        }, 120000);

    });

client.login(token)