const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const music_controler = new ActionRowBuilder().setComponents(

    new ButtonBuilder()
	.setCustomId('pause')
	.setLabel('Pause')
	.setStyle(ButtonStyle.Secondary),
	
	new ButtonBuilder()
	.setCustomId('renudar')
	.setLabel('Renudar')
	.setStyle(ButtonStyle.Secondary),
	
	new ButtonBuilder()
	.setCustomId('skip')
	.setLabel('Skip')
	.setStyle(ButtonStyle.Secondary),
	
	new ButtonBuilder()
	.setCustomId('stop')
	.setLabel('Stop')
	.setStyle(ButtonStyle.Danger),
	new ButtonBuilder()
	.setCustomId('autoplay')
	.setLabel('AutoPLay')
	.setStyle(ButtonStyle.Secondary),

);


exports.music_controler = music_controler;