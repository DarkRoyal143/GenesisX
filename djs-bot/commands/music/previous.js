const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("../../lib/Embed");
const playerUtil = require("../../util/player");
const { redEmbed } = require("../../util/embeds");

const command = new SlashCommand()
.setName("previous")
.setDescription("Go back to the previous song.")
.setRun(async (client, interaction) => {
	let channel = await client.getChannel(client, interaction);
	if (!channel) {
		return;
	}

	let player;
	if (client.manager.Engine) {
		player = client.manager.Engine.players.get(interaction.guild.id);
	} else {
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor("Red")
					.setDescription("Lavalink node is not connected"),
			],
		});
	}

	if (!player) {
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor("Red")
					.setDescription("There are no previous songs for this session."),
			],
			ephemeral: true,
		});
	}

	const {status, previousSong} = playerUtil.playPrevious(player);

	if (status === 1) return interaction.reply({
		embeds: [
			redEmbed({desc: "There is no previous song in the queue."}),
		],
	})

	interaction.reply({
		embeds: [
			new MessageEmbed()
				.setColor(client.config.embedColor)
				.setDescription(
					`⏮ | Previous song: **${ previousSong.title }**`,
				),
		],
	});
});

module.exports = command;
