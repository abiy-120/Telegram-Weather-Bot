
# Telegram Weather Bot

This is a simple Telegram bot that provides weather updates for any city using the OpenWeatherMap API. Users can interact with the bot to get current weather information by sending city names.


## Prerequisites

Before you begin, ensure you have the following installed:

- Any javascript runtime.
## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/abiy-120/Telegram-Weather-Bot.git
cd weather-telegram-bot
```
### 2. Setup your bot:
- Create a new bot on Telegram and obtain your Bot Token.

### 3. Get OpenWeatherMap API Key:
- Sign up at [OpenWeatherMap](https://openweathermap.org/) and get an API key.

### 4. Create an Environment File:
- Create a .env file in the root directory of your project and add your Telegram bot token and OpenWeatherMap API key:
```text
BOT_TOKEN= Your Telegram Bot Token
OPEN_WEATHER_MAP_API=Your OpenWeatherMap Api Key
```

### 5. Install Dependencies:
- Run the following command to install the required packages:
```bash
npm install
```
## Usage
To start the bot, use the following command:
```bash
npm run main.ts
```
Once the bot is running send city names to the bot to get weather information of your desired cities.
