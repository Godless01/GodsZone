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

const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const lang = require('../../events/loadLanguage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('friendship')
        .setDescription(lang.friendshipDescription)
        .addUserOption(option => 
            option.setName('user')
                .setDescription(lang.friendshipUserDescription)
                .setRequired(true)),

    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) { 
            await interaction.deferReply(); 

            const user = interaction.options.getUser('user');
            const friendshipRating = Math.floor(Math.random() * 101); 

            const embed = new EmbedBuilder()
                .setColor(0x0000FF)
                .setTitle(lang.friendshipTitle)
                .setDescription(`${interaction.user} ${lang.friendshipWith} ${user} ${lang.friendshipRating} **${friendshipRating}%**!`)
                .setFooter({ text: lang.friendshipFooter });

            await interaction.editReply({ embeds: [embed] }); 
        } else {
            const mentions = interaction.mentions.users;
            if (mentions.size < 2) {
                return interaction.reply({ content: lang.friendshipMentionError, ephemeral: true });
            }

            const user1 = mentions.first();
            const user2 = mentions.at(1);
            const friendshipRating = Math.floor(Math.random() * 101);

            const embed = new EmbedBuilder()
                .setColor(0x0000FF)
                .setTitle(lang.friendshipTitle)
                .setDescription(`${user1} ${lang.friendshipWith} ${user2} ${lang.friendshipRating} **${friendshipRating}%**!`)
                .setFooter({ text: lang.friendshipFooter });

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
