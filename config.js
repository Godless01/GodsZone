const { ActivityType } = require('discord.js');

module.exports = {
  ownerId: '1141337225494286449',
  status: {
    rotateDefault: [
      { name: 'GODSZONE | /help', type: ActivityType.Watching },
      { name: 'GODSZONE | The Best', type: ActivityType.Playing },
      { name: 'GODSZONE | /help', type: ActivityType.Streaming, url: 'https://www.twitch.tv' },
      { name: 'GODSZONE | Dominance', type: ActivityType.Listening },
    ],
    songStatus: true
  },
  spotifyClientId: "f71a3da30e254962965ca2a89d6f74b9",
  spotifyClientSecret: "199a619d22dd4e55a4a2c1a7a3d70e63",
}
