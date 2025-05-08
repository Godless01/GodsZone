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


const cmdIcons = require('../../UI/icons/commandicons');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const lang = require('../../events/loadLanguage');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bot')
    .setDescription('Bot related commands.')
    // Subcommand: ping
    .addSubcommand(subcommand =>
      subcommand
        .setName('ping')
        .setDescription(lang.pingDescription)
    )
    // Subcommand: invite
    .addSubcommand(subcommand =>
      subcommand
        .setName('invite')
        .setDescription(lang.inviteDescription)
    )
    // Subcommand: support
    .addSubcommand(subcommand =>
        subcommand
            .setName('support')
            .setDescription(lang.supportDescription)
    ),
  async execute(interaction) {
    if (interaction.isCommand && interaction.isCommand()) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'ping') {
      const botLatency = Date.now() - interaction.createdTimestamp;
      const apiLatency = interaction.client.ws.ping;
      
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(lang.pingTitle)
        .setDescription(`${lang.botLatency}: ${botLatency}ms\n${lang.apiLatency}: ${apiLatency}ms`)
        .setTimestamp();
      
      await interaction.reply({ embeds: [embed] });
    }
    else if (subcommand === 'support') {
        const supportServerLink = lang.supportServerLink;
        const githubLink = lang.githubLink;
        const replitLink = lang.replitLink;
        const youtubeLink = lang.youtubeLink;

        const embed = new EmbedBuilder()
            .setColor('#b300ff')
            .setAuthor({
                name: lang.supportTitle,
                iconURL: cmdIcons.rippleIcon,
                url: supportServerLink
            })
            .setDescription(`
                ➡️ **${lang.supportDescriptionTitle}:**
                - ${lang.discord} - ${supportServerLink}
                
                ➡️ **${lang.followUsOn}:**
                - ${lang.github} - ${githubLink}
                - ${lang.replit} - ${replitLink}
                - ${lang.youtube} - ${youtubeLink}
            `)
            .setImage(lang.supportImageURL)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
    else if (subcommand === 'invite') {
      const clientId = interaction.client.user.id;
      const adminPermissions = 8; 
      
     
      const inviteURL = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=${adminPermissions}&integration_type=0&scope=bot`;
      
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setAuthor({ 
          name: lang.inviteTitle, 
          iconURL: cmdIcons.rippleIcon,
          url: "https://discord.gg/akAkqGQdbb" 
        })
        .setDescription(lang.inviteDescription.replace('{inviteURL}', inviteURL))
        .setTimestamp();
      
      await interaction.reply({ embeds: [embed] });
    }
} else {
    const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setAuthor({ 
            name: "Alert!", 
            iconURL: cmdIcons.dotIcon,
            url: "https://discord.gg/akAkqGQdbb"
        })
        .setDescription('- This command can only be used through slash command!\n- Please use `/bot`')
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
} 
  },
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
