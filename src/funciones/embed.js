const Discord = require("discord.js");

const embed_ayuda = new Discord.EmbedBuilder()
	.setColor("8530ba")
	.setAuthor({name:"Elimon Bot", iconURL: `https://cdn.discordapp.com/attachments/1002249656924913706/1010578668810141778/icon.jpg`, url: "https://discord.com/api/oauth2/authorize?client_id=1005068181913751612&permissions=8&scope=bot"})
	.setTitle("**Las funcionalidades existenten son:**")
	.setThumbnail("https://media0.giphy.com/media/yIbEsL337MR2Qr16Ed/giphy.gif?cid=6c09b952479cc6304fadb462a5109f44cab76d9a0b16951f&rid=giphy.gif&ct=g")
	.addFields({name:"▼", value:"\u200b"})
	.addFields({name: " ► Reproducion de musica", value:"\u200B"})
	.addFields({name: " ► Sistema de fichaje", value:"\u200B"})
	.addFields({name: " ► Sistema antispam/raid", value:"\u200B"})
	.addFields(
		{ name: "\u200B", value: "▬▬▬▬▬▬▬▬"},
		{ name: "Commands musica", value: "\u200B"},
		{ name: 'Play', value: 'Reproducir cancion', inline: true},
		{ name: 'Stop', value: 'El bot dejara de reproducir', inline: true },
		{ name: 'Pause', value: 'Pusar la cancion', inline: true},
		{ name: 'Resume', value: 'Renudar la cancion', inline: true },
		{ name: 'Volume', value: 'Establecer volumen de la cancion', inline: true},
		{ name: 'Playlist', value: 'Reproduce una lista con las canciones escuchadas', inline: true },

	)
	.addFields(
		{ name: "\u200B", value: "▬▬▬▬▬▬▬▬"},
		{ name: "Commands Clockin", value: "\u200B"},
		{ name: 'Clockin', value: 'Marcar entrada', inline: true},
		{ name: 'Clockout', value: 'Marcar salida', inline: true },
		{ name: 'clockedin', value: 'Todos los miembros que estan fichando', inline: true},
		{ name: 'Data', value: 'El tiempo hecho de cada miembro(Data all/ Data @mention)', inline: true},
		{ name: 'Export', value: 'Genera un archivo csv con todo el tiempo fichado', inline: true},
		{ name: 'Delete', value: 'Eliminar todas las datas creadas', inline: true},

	)
	.setFooter({ text: '▬▬▬▬▬▬\nNeGriTo#2899'})

const embed_warning = new Discord.EmbedBuilder()
    .setColor("ff0058")
	.setTitle('Algo ha salido mal, intenta ejecutar el comando otra vez')
	.setTimestamp()

const embed_exito = new Discord.EmbedBuilder()
    .setColor("07ff00")
	.setTitle('El comando se ejecuto correctamente')
	.setTimestamp()


const embed_comand_warning = new Discord.EmbedBuilder()
    .setColor("ff0058")
	.setTitle('Comando no valido')
	.setDescription('+help para ver la lista de comando existentes')
	.setTimestamp();

const embed_arguments_warning = new Discord.EmbedBuilder()
    .setColor("ff0058")
	.setTitle('Argumentos invalidos')
	.setDescription(':arrow_forward: Argumentos aceptados: **Data <@usuario>**, **Data all**')
	.setTimestamp();

const embed_no_fichajes = new Discord.EmbedBuilder()
    .setColor("ff0058")
	.setTitle('Actualmente no esta fichando nadie')
	.setTimestamp();

const embed_fichando = new Discord.EmbedBuilder()
    .setColor("ff0058")
	.setTitle('Ya estas fichando')
	.setTimestamp();

const embed_entrada = new Discord.EmbedBuilder()
    .setColor("07ff00")
	.setTitle('Tu entrada se ha registrado correctamente!')
	.setTimestamp()

const embed_salida = new Discord.EmbedBuilder()
    .setColor("07ff00")
	.setTitle('Tu salida se ha registrado correctamente!')
	.setTimestamp()

    

const debes_fichar = new Discord.EmbedBuilder()
    .setColor("ff0058")
	.setTitle('Debes estar fichando para ejecutar el comando')
	.setTimestamp()

const no_data_creada = new Discord.EmbedBuilder()
    .setColor("ff0058")
	.setTitle('Aún no hay data creada')
	.setTimestamp()

const no_data_creada_v = new Discord.EmbedBuilder()
    .setColor("ff0058")
	.setTitle('No tienes niguna data creada, ejecuta el comando create o crear')
	.setTimestamp()
    
const data_created = new Discord.EmbedBuilder()
    .setColor("07ff00")
	.setTitle('Tu Data se ha creado correctamente!')
	.setTimestamp()

const data_is_create = new Discord.EmbedBuilder()
    .setColor("ff0058")
	.setTitle('Ya tienes tu data creada')
	.setTimestamp()

const no_has_permisson = new Discord.EmbedBuilder()
	.setColor("ff0058")
	.setTitle('Comando Denegado')
	.setDescription('No tienes permisos de Administrador, no puedes ejecutar el comando')
	.setTimestamp();

function clockedin(message, day, data, e) {
    const clockedin_send = new Discord.EmbedBuilder()
    .setColor("07ff00")
	.setTitle(`Tiempo fichando:`)
    .setDescription(`<@${e.user_id}>: ${day} dia/as, ${data.getUTCHours()} Horas, ${data.getMinutes()} Minutos, ${data.getSeconds()} Segundos`)
	.setTimestamp()
    return(message.channel.send({embeds: [clockedin_send]}))
}

function data(message, day, busqueda_usser) {
    const data_ = new Discord.EmbedBuilder()
    .setColor("8530ba")
	.setTitle(`Data:`)
    .setDescription(`<@${busqueda_usser.user_id}>: ${day} dia/as, ${busqueda_usser.date.getUTCHours()} Horas, ${busqueda_usser.date.getMinutes()} Minutos, ${busqueda_usser.date.getSeconds()} Segundos`)
	.setTimestamp()
    return(message.channel.send({embeds: [data_]}))
}

function data_all(message, day, e) {
    const data_all_set = new Discord.EmbedBuilder()
    .setColor("8530ba")
	.setTitle(`Data:`)
    .setDescription(`**${e.usser_name}** Tiene fichados: ${day} Dia/s, ${e.date.getUTCHours()} Horas, ${e.date.getMinutes()} Minutos, ${e.date.getSeconds()} Segundos`)
	.setTimestamp()
    return(message.guild.members.cache.get(message.author.id).send({embeds: [data_all_set]}))
}

function play(song) {
	const playSong = new Discord.EmbedBuilder()
	.setColor("F6FFF8")
	.setAuthor({name:"Elimon Music", iconURL: `https://media0.giphy.com/media/yIbEsL337MR2Qr16Ed/giphy.gif?cid=6c09b952479cc6304fadb462a5109f44cab76d9a0b16951f&rid=giphy.gif&ct=g`, url: "https://discord.com/api/oauth2/authorize?client_id=1005068181913751612&permissions=8&scope=bot"})
	.setDescription(`🎶 **${song.name}**`)
	.setFooter({text: `Peticion de: ${song.user.username}`})
	return(playSong)
}

function addSong(song) {
	const addSong_ = new Discord.EmbedBuilder()
	.setColor("F6FFF8")
	.setAuthor({name:"Elimon Music", iconURL: `https://media0.giphy.com/media/yIbEsL337MR2Qr16Ed/giphy.gif?cid=6c09b952479cc6304fadb462a5109f44cab76d9a0b16951f&rid=giphy.gif&ct=g`, url: "https://discord.com/api/oauth2/authorize?client_id=1005068181913751612&permissions=8&scope=bot"})
	.setDescription(`🎶 Añadida a la cola **${song.name}**`)
	.setFooter({text: `Peticion de: ${song.user.username}`})
	return(addSong_)
}

function music_btn(embed_data) {
	const music_btn_ = new Discord.EmbedBuilder()
	.setColor(`8dff00`)
	.setTitle(`${embed_data.title}`)
	.setDescription(`${embed_data.description}`)
	.setTimestamp()
	return(music_btn_)
}

function embed_music(txt) {
	const em_music = new Discord.EmbedBuilder()
	.setColor("F6FFF8")
	.setAuthor({name:"Elimon Music", iconURL: `https://cdn.discordapp.com/attachments/1002249656924913706/1010578668810141778/icon.jpg`, url: "https://discord.com/api/oauth2/authorize?client_id=1005068181913751612&permissions=8&scope=bot"})
	.setDescription(`${txt}`)
	.setTimestamp()
	return(em_music)
}

function embed_elimon(txt) {
	const em_elimon = new Discord.EmbedBuilder()
	.setColor("ffe0ff")
	.setAuthor({name:"Elimon", iconURL: `https://cdn.discordapp.com/attachments/1002249656924913706/1010578668810141778/icon.jpg`, url: "https://discord.com/api/oauth2/authorize?client_id=1005068181913751612&permissions=8&scope=bot"})
	.setDescription(`${txt}`)
	.setTimestamp()
	return(em_elimon)
}

function embed_red(txt) {
	const em_red = new Discord.EmbedBuilder()
	.setColor("ef2947")
	.setAuthor({name:"Elimon", iconURL: `https://cdn.discordapp.com/attachments/1002249656924913706/1010578668810141778/icon.jpg`, url: "https://discord.com/api/oauth2/authorize?client_id=1005068181913751612&permissions=8&scope=bot"})
	.setDescription(`${txt}`)
	.setTimestamp()
	return(em_red)
}

function embed_logs(title,txt) {
	const em_music = new Discord.EmbedBuilder()
	.setColor("98ff96")
	.setAuthor({name:"Elimon Logs", iconURL: `https://cdn.discordapp.com/attachments/1002249656924913706/1010578668810141778/icon.jpg`, url: "https://discord.com/api/oauth2/authorize?client_id=1005068181913751612&permissions=8&scope=bot"})
	.setTitle(`${title}`)
	.setDescription(`${txt}`)
	.setTimestamp()
	return(em_music)
}

function welcome(addmember, search, canal) {
	const em_welcome = new Discord.EmbedBuilder()
	.setColor(`${search.embeds.welcome.color}`)
	.setAuthor({name:"Elimon", iconURL: `https://cdn.discordapp.com/attachments/1002249656924913706/1010578668810141778/icon.jpg`, url: "https://discord.com/api/oauth2/authorize?client_id=1005068181913751612&permissions=8&scope=bot"})
	.setThumbnail(`${search.embeds.welcome.url}`)
	.setTitle(`${search.embeds.welcome.title}`)
	.setDescription(`${search.embeds.welcome.description}`)
	.addFields({ name: `\u200B ` , value: `**Se acaba de unir: <@${addmember.user.id}>**`, inline: true})
	.setTimestamp()
	return(canal.send({embeds:[em_welcome]}))
}

function chao(lessmember, search, canal) {
	const em_welcome = new Discord.EmbedBuilder()
	.setColor(`${search.embeds.chao.color}`)
	.setAuthor({name:"Elimon", iconURL: `https://cdn.discordapp.com/attachments/1002249656924913706/1010578668810141778/icon.jpg`, url: "https://discord.com/api/oauth2/authorize?client_id=1005068181913751612&permissions=8&scope=bot"})
	.setThumbnail(`${search.embeds.chao.url}`)
	.setTitle(`${search.embeds.chao.title}`)
	.setDescription(`${search.embeds.chao.description}`)
	.addFields({ name: `\u200B ` , value: `**Se acaba de ir: <@${lessmember.user.id}>**`, inline: true})
	.setTimestamp()
	return(canal.send({embeds:[em_welcome]}))
}
exports.embed_ayuda = embed_ayuda;
exports.embed_exito = embed_exito;
exports.embed_fichando = embed_fichando;
exports.arguments_warning = embed_arguments_warning;
exports.comand_warning = embed_comand_warning;
exports.no_fichajes = embed_no_fichajes;
exports.embed_entrada = embed_entrada ;
exports.embed_salida = embed_salida ;
exports.embed_warning = embed_warning ;
exports.debes_fichar = debes_fichar;
exports.no_data_creada = no_data_creada;
exports.data_created = data_created;
exports.data_is_create = data_is_create;
exports.no_data_creada_v  = no_data_creada_v;
exports.no_has_permisson = no_has_permisson;
exports.embed_elimon = embed_elimon;
exports.embed_red =embed_red;
exports.embed_logs = embed_logs;
exports.clockedin = clockedin;
exports.data = data;
exports.data_all = data_all;
exports.play = play;
exports.addSong = addSong;
exports.music_btn = music_btn;
exports.embed_music = embed_music;
exports.embed_welcome = welcome;
exports.embed_chao = chao;