![Animated Background](https://i.imgur.com/JkFb6TZ.png)

<h1 align="center" style="font-family: Arial, sans-serif; color: #FF6F61; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
  GodsZone Bot
</h1>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square&logo=opensource"
      alt="License: MIT" />
  </a>
</p>

<p align="center">
  <a href="https://www.youtube.com/@AresGZ">
    <img src="https://img.shields.io/badge/YouTube-Subscribe-red?style=flat-square&logo=youtube"
      alt="YouTube" />
  </a>

  <a href="https://discord.gg/akAkqGQdbb">
    <img src="https://img.shields.io/badge/Discord-Join-blue?style=flat-square&logo=discord"
      alt="Join Discord" />
  </a>

  <a href="https://www.instagram.com/godless._">
    <img src="https://img.shields.io/badge/Instagram-Follow-E4405F?style=flat-square&logo=instagram"
      alt="Instagram" />
  </a>
</p>



# Discord GodsZone Bot Installation Guide

## How to Install

### Step 1: Update `config.json` [ USE ENV FILES ]

1. Open the `config.json` and add your mongodb url.

### ENV SETUP

TOKEN=, 
FACEBOOK_ACCESS_TOKEN=, 
FORTNITE_API_KEY=, 
YOUTUBE_API_KEY=, 
TWITCH_CLIENT_ID=, 
TWITCH_ACCESS_TOKEN=, 
INSTAGRAM_ACCESS_TOKEN=, 
MONGODB_URI=


### Step 2: Set Up Hosting Service

1. Go to your preferred hosting service. For this guide, we use [Render](https://render.com/).
2. In the Build & Deploy section, paste your repository URL.


### Step 3: Add Build and Start Commands
 Run the following commands to install dependencies and start your bot:

   npm install, 
   node index.js

### Step 4: Get Your Bot Token
Navigate to the Discord Developer Portal.
Find your application, and retrieve the bot token from the "Bot" section.

### Step 5: Set Environment Variable
Create an environment variable with the following details:
Key: TOKEN
Value: [your bot token]
Deploy your application using your hosting service’s deployment process.

### Step 6: Wait and Test
Wait approximately five minutes for your bot to deploy and start up.

Test your bot by sending commands to ensure it is operational.

🎉 Congratulations! Your bot is now up and running. 🥳

### Additional Resources
Video Tutorial: If you prefer a video guide, watch this YouTube tutorial [ Soon ].

Common Errors: Consult the errors section for troubleshooting.

### Useful Files


UI/banners/musicard.js: Change, add, or remove music cards here.

UI/icons/musicicons.js: Change, add, or remove music icons here.
