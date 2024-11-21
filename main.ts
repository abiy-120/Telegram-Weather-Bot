import { Context, Telegraf } from "telegraf";
import * as dotenv from "dotenv";

dotenv.config();

interface Env {
  BOT_TOKEN: string;
  OPEN_WEATHER_MAP_API: string;
}

const env: Env = {
  BOT_TOKEN: process.env.BOT_TOKEN || "",
  OPEN_WEATHER_MAP_API: process.env.OPEN_WEATHER_MAP_API || "",
};

const bot = new Telegraf(env.BOT_TOKEN);

const startHandler = async (ctx: Context) => {
  ctx.reply(
    "Welcome - This bot shows you weather information. Enter the city name to get weather information."
  );
};

const helpHandler = async (ctx: Context) => {
  ctx.reply(
    "/start - Starts the bot.\n/help - Shows help information.\nEnter city name to get weather information."
  );
};

const getWeatherHandler = async (ctx: Context) => {
  const message = await ctx.message?.text;
  if (message[0] != "/") {
    const fetchWeatherInfo = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${message}&appid=${env.OPEN_WEATHER_MAP_API}`
    );
    if (fetchWeatherInfo.ok) {
      const weatherInfo = await fetchWeatherInfo.json();
      console.log(weatherInfo);
      ctx.reply(
        `City - ${weatherInfo.name}\nWeather - ${
          weatherInfo.weather[0].main
        } - ${weatherInfo.weather[0].description}\nTemperature - ${parseInt(
          weatherInfo.main.temp
        )} °C`
      );
    } else {
      if (fetchWeatherInfo.status == 404) {
        ctx.reply(
          "Can't get weather information of the city you entered. Make sure you entered a correct city name."
        );
      }
    }
  }
};
bot.command("start", startHandler);
bot.command("help", helpHandler);
bot.hears(/.+/, getWeatherHandler);
bot.launch();
