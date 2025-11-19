/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
   _____           _     ______                
  / ____|         | |   |___  /                
 | |  __  ___   __| |___   / / ___  _ __   ___ 
 | | |_ |/ _ \ / _` / __| / / / _ \| '_ \ / _ \
 | |__| | (_) | (_| \__ \/ /_| (_) | | | |  __/
  \_____|\___/ \__,_|___/_____\___/|_| |_|\___|
                                            
                    
DISCORD :  https://discord.gg/akAkqGQdbb                 
YouTube : https://www.youtube.com/@AresGZ                       

Command Verified : ✓  
Test Passed    : ✓

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/


const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const cmdIcons = require('../../UI/icons/commandicons');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("vunmute")
        .setDescription("Unmute a user from voice mute")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(opt =>
            opt.setName("member")
                .setDescription("User to unmute")
                .setRequired(true)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember("member");

        if (!member.voice.channel)
            return interaction.reply({ content: "User is not in a voice channel.", ephemeral: true });

        if (!member.voice.mute)
            return interaction.reply({ content: "User is not voice-muted.", ephemeral: true });

        await member.voice.setMute(false, "Manual voice unmute");

        interaction.reply(`🎙️🔊 **${member.user.tag}** has been **voice-unmuted**.`);
    }
};
function ms(string) {
    const match = string.match(/(\d+)([smhd])/);
    if (!match) return null;

    const num = parseInt(match[1]);
    const unit = match[2];

    const multipliers = {
        s: 1000,
        m: 60_000,
        h: 3_600_000,
        d: 86_400_000
    };

    return num * multipliers[unit];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vmute")
        .setDescription("Voice-mute a user for a duration")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(opt =>
            opt.setName("member")
                .setDescription("User to mute")
                .setRequired(true)
        )
        .addStringOption(opt =>
            opt.setName("duration")
                .setDescription("Duration (10m, 1h, 2d)")
                .setRequired(true)
        )
        .addStringOption(opt =>
            opt.setName("reason")
                .setDescription("Reason for mute")
                .setRequired(false)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember("member");
        const durationStr = interaction.options.getString("duration");
        const reason = interaction.options.getString("reason") ?? "No reason provided";

        const durationMs = ms(durationStr);
        if (!durationMs)
            return interaction.reply({ content: "Invalid duration format.", ephemeral: true });

        if (!member.voice.channel)
            return interaction.reply({ content: "User is not in a voice channel.", ephemeral: true });

        await member.voice.setMute(true, reason);

        interaction.reply(`🎙️🔇 **${member.user.tag}** voice-muted for **${durationStr}**.\nReason: ${reason}`);

        setTimeout(async () => {
            try {
                await member.voice.setMute(false, "Voice mute expired");
            } catch { }
        }, durationMs);
    }
};
module.exports = {
    data: new SlashCommandBuilder()
        .setName("cunmute")
        .setDescription("Unmute a user in chat")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(opt =>
            opt.setName("member")
                .setDescription("User to unmute")
                .setRequired(true)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember("member");

        const muteRole = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");

        if (!muteRole)
            return interaction.reply({ content: "Muted role does not exist.", ephemeral: true });

        if (!member.roles.cache.has(muteRole.id))
            return interaction.reply({ content: "User is not muted.", ephemeral: true });

        await member.roles.remove(muteRole, "Unmute command");

        interaction.reply(`🔊 **${member.user.tag}** has been **chat-unmuted**.`);
    }
};

function ms(string) {
    const match = string.match(/(\d+)([smhd])/);
    if (!match) return null;

    const num = parseInt(match[1]);
    const unit = match[2];

    const multipliers = {
        s: 1000,
        m: 60_000,
        h: 3_600_000,
        d: 86_400_000
    };

    return num * multipliers[unit];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cmute")
        .setDescription("Mute a user in chat for a duration")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(opt =>
            opt.setName("member")
                .setDescription("User to mute")
                .setRequired(true)
        )
        .addStringOption(opt =>
            opt.setName("duration")
                .setDescription("Duration (10m, 1h, 2d)")
                .setRequired(true)
        )
        .addStringOption(opt =>
            opt.setName("reason")
                .setDescription("Reason for mute")
                .setRequired(false)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember("member");
        const durationStr = interaction.options.getString("duration");
        const reason = interaction.options.getString("reason") ?? "No reason provided";

        const durationMs = ms(durationStr);
        if (!durationMs)
            return interaction.reply({ content: "Invalid duration. Use: 10m, 1h, 2d", ephemeral: true });

        // Find or create Muted role
        let muteRole = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === "muted");

        if (!muteRole) {
            muteRole = await interaction.guild.roles.create({
                name: "Muted",
                color: "#2c2f33",
                reason: "Auto-created Muted role"
            });

            // Lock permissions for every channel
            interaction.guild.channels.cache.forEach(async (ch) => {
                try {
                    await ch.permissionOverwrites.edit(muteRole, {
                        SendMessages: false,
                        AddReactions: false,
                        Speak: false
                    });
                } catch { }
            });
        }

        await member.roles.add(muteRole, reason);

        interaction.reply(`🔇 **${member.user.tag}** has been chat-muted for **${durationStr}**.\nReason: ${reason}`);

        setTimeout(async () => {
            try {
                await member.roles.remove(muteRole, "Mute duration expired");
            } catch { }
        }, durationMs);
    }
};
module.exports = {
    data: new SlashCommandBuilder()
        .setName('member')
        .setDescription('Manage server members.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('Ban a user from the server.')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User to ban.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('unban')
                .setDescription('Unban a user via their ID.')
                .addStringOption(option =>
                    option.setName('userid')
                        .setDescription('User ID to unban.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('kick')
                .setDescription('Kick a user from the server.')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User to kick.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('timeout')
                .setDescription('Put a user in timeout.')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User to timeout.')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('duration')
                        .setDescription('Duration of the timeout in minutes.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('removetimeout')
                .setDescription('Remove timeout from a user.')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User to remove timeout from.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('nickname')
                .setDescription('Change a user\'s nickname.')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User to rename.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('New nickname.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('warn')
                .setDescription('Warn a user.')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User to warn.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('Reason for the warning.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('dm')
                .setDescription('Send a private message to a user.')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User to message.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('message')
                        .setDescription('Message to send.')
                        .setRequired(true))),

    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMembers)) {
            return interaction.reply({ content: '❌ You do not have permission to manage members.',  flags: 64 });
        }

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'ban') {
            const target = interaction.options.getUser('target');
            const member = interaction.guild.members.cache.get(target.id);

            if (!member || !member.bannable) {
                return interaction.reply({ content: `❌ Cannot ban **${target.tag}**.`,  flags: 64 });
            }

            await member.ban();
            return interaction.reply({ content: `✅ **${target.tag}** has been banned.` });

        } else if (subcommand === 'unban') {
            const userId = interaction.options.getString('userid');

            try {
                await interaction.guild.members.unban(userId);
                return interaction.reply({ content: `✅ Unbanned user with ID **${userId}**.` });
            } catch {
                return interaction.reply({ content: `❌ No user found with ID **${userId}**.`,  flags: 64 });
            }

        } else if (subcommand === 'kick') {
            const target = interaction.options.getUser('target');
            const member = interaction.guild.members.cache.get(target.id);

            if (!member || !member.kickable) {
                return interaction.reply({ content: `❌ Cannot kick **${target.tag}**.`,  flags: 64 });
            }

            await member.kick();
            return interaction.reply({ content: `✅ **${target.tag}** has been kicked.` });

        } else if (subcommand === 'timeout') {
            const target = interaction.options.getUser('target');
            const duration = interaction.options.getInteger('duration');
            const member = interaction.guild.members.cache.get(target.id);

            if (!member || !member.moderatable) {
                return interaction.reply({ content: `❌ Cannot timeout **${target.tag}**.`,  flags: 64 });
            }

            await member.timeout(duration * 60 * 1000);
            return interaction.reply({ content: `✅ **${target.tag}** has been put in timeout for **${duration} minutes**.` });

        } else if (subcommand === 'removetimeout') {
            const target = interaction.options.getUser('target');
            const member = interaction.guild.members.cache.get(target.id);

            if (!member || !member.communicationDisabledUntilTimestamp) {
                return interaction.reply({ content: `❌ **${target.tag}** is not in timeout.`,  flags: 64 });
            }

            await member.timeout(null);
            return interaction.reply({ content: `✅ **${target.tag}** timeout has been removed.` });

        } else if (subcommand === 'nickname') {
            const target = interaction.options.getUser('target');
            const newName = interaction.options.getString('name');
            const member = interaction.guild.members.cache.get(target.id);

            if (!member || !member.manageable) {
                return interaction.reply({ content: `❌ Cannot change nickname for **${target.tag}**.`,  flags: 64 });
            }

            await member.setNickname(newName);
            return interaction.reply({ content: `✅ Changed nickname for **${target.tag}** to **${newName}**.` });

        } else if (subcommand === 'warn') {
            const target = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason');

            const warnEmbed = new EmbedBuilder()
                .setColor('#ffcc00')
                .setTitle('⚠️ You have been warned')
                .setDescription(`**Reason:** ${reason}`)
                .setFooter({ text: `Issued by ${interaction.user.tag}` });

            try {
                await target.send({ embeds: [warnEmbed] });
                return interaction.reply({ content: `✅ **${target.tag}** has been warned for **${reason}**.` });
            } catch {
                return interaction.reply({ content: `⚠️ **${target.tag}** was warned, but their DMs are closed.` });
            }

        } else if (subcommand === 'dm') {
            const target = interaction.options.getUser('target');
            const message = interaction.options.getString('message');

            const dmEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('📩 You have a new message')
                .setDescription(message)
                .setFooter({ text: `Sent by ${interaction.user.tag}` });

            try {
                await target.send({ embeds: [dmEmbed] });
                return interaction.reply({ content: `✅ DM sent to **${target.tag}**.` });
            } catch {
                return interaction.reply({ content: `❌ Could not DM **${target.tag}**. They may have DMs disabled.`,  flags: 64 });
            }
        }
    } else {
        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setAuthor({ 
                name: "Alert!", 
                iconURL: cmdIcons.dotIcon,
                url: "https://discord.gg/akAkqGQdbb"
            })
            .setDescription('- This command can only be used through slash commands!\n- Please use `/member`')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
    }
};

/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
   _____           _     ______                
  / ____|         | |   |___  /                
 | |  __  ___   __| |___   / / ___  _ __   ___ 
 | | |_ |/ _ \ / _` / __| / / / _ \| '_ \ / _ \
 | |__| | (_) | (_| \__ \/ /_| (_) | | | |  __/
  \_____|\___/ \__,_|___/_____\___/|_| |_|\___|
                                            
                    
DISCORD :  https://discord.gg/akAkqGQdbb                 
YouTube : https://www.youtube.com/@AresGZ                       

Command Verified : ✓  
Test Passed    : ✓

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/
