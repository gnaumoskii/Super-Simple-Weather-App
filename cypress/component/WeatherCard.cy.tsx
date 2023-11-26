import WeatherCard from "@/app/components/WeatherCard/WeatherCard"
import { Weather } from "@/app/types/WeatherTypes"
import '@/app/globals.css'

const WeatherMock: Weather = {
  id: 0,
  temperatureMax: 8.8,
  temperatureMin: 1.7,
  sunrise: "2023-11-25T06:35",
  sunset: "2023-11-25T16:06",
  date: new Date("2023-11-25T00:00:00.000Z"),
  weatherCode: 48,
  hourly: [
      {
          id: 0,
          temperature: 8.8,
          weatherCode: 3,
          time: "2023-11-25T00:00"
      },
      {
          id: 1,
          temperature: 8.1,
          weatherCode: 3,
          time: "2023-11-25T01:00"
      },
      {
          id: 2,
          temperature: 8.2,
          weatherCode: 45,
          time: "2023-11-25T02:00"
      },
      {
          id: 3,
          temperature: 8.8,
          weatherCode: 3,
          time: "2023-11-25T03:00"
      },
      {
          id: 4,
          temperature: 8.3,
          weatherCode: 3,
          time: "2023-11-25T04:00"
      },
      {
          id: 5,
          temperature: 8.3,
          weatherCode: 3,
          time: "2023-11-25T05:00"
      },
      {
          id: 6,
          temperature: 8.1,
          weatherCode: 3,
          time: "2023-11-25T06:00"
      },
      {
          id: 7,
          temperature: 6.7,
          weatherCode: 3,
          time: "2023-11-25T07:00"
      },
      {
          id: 8,
          temperature: 6,
          weatherCode: 61,
          time: "2023-11-25T08:00"
      },
      {
          id: 9,
          temperature: 4.7,
          weatherCode: 61,
          time: "2023-11-25T09:00"
      },
      {
          id: 10,
          temperature: 3.9,
          weatherCode: 61,
          time: "2023-11-25T10:00"
      },
      {
          id: 11,
          temperature: 4.1,
          weatherCode: 61,
          time: "2023-11-25T11:00"
      },
      {
          id: 12,
          temperature: 3,
          weatherCode: 61,
          time: "2023-11-25T12:00"
      },
      {
          id: 13,
          temperature: 3.3,
          weatherCode: 61,
          time: "2023-11-25T13:00"
      },
      {
          id: 14,
          temperature: 2.9,
          weatherCode: 61,
          time: "2023-11-25T14:00"
      },
      {
          id: 15,
          temperature: 2.4,
          weatherCode: 61,
          time: "2023-11-25T15:00"
      },
      {
          id: 16,
          temperature: 2.1,
          weatherCode: 73,
          time: "2023-11-25T16:00"
      },
      {
          id: 17,
          temperature: 1.9,
          weatherCode: 73,
          time: "2023-11-25T17:00"
      },
      {
          id: 18,
          temperature: 1.7,
          weatherCode: 73,
          time: "2023-11-25T18:00"
      },
      {
          id: 19,
          temperature: 1.7,
          weatherCode: 73,
          time: "2023-11-25T19:00"
      },
      {
          id: 20,
          temperature: 1.9,
          weatherCode: 71,
          time: "2023-11-25T20:00"
      },
      {
          id: 21,
          temperature: 1.9,
          weatherCode: 71,
          time: "2023-11-25T21:00"
      },
      {
          id: 22,
          temperature: 1.9,
          weatherCode: 71,
          time: "2023-11-25T22:00"
      },
      {
          id: 23,
          temperature: 2,
          weatherCode: 71,
          time: "2023-11-25T23:00"
      }
  ]
}
const weatherNames = ['sunny','slightly cloudy','cloudy','slightly foggy','foggy','drizzly','rainy','very rainy','snowy','very snowy','slightly snowy','extremely rainy','extremely snowy','thunderstorm','thunderstorm with hail','thunderstorm with heavy hail']

describe('WeatherCard.cy.tsx', () => {
  it('Weather Card and Details Test', () => {
    cy.viewport(1000,1000);
    cy.mount(<div id="portal"><WeatherCard weather={WeatherMock}/></div>);
    cy.getDataTest("weather-card").click();
    cy.getDataTest("weather-details").should("exist");
    cy.getDataTest("weather-details").find("[data-test=weather-hourly-card]").should("have.length", 24);


    const regex = new RegExp(`${weatherNames.join('|')}`, 'i')

    cy.getDataTest("weather-details").find("[data-test=weather-hourly-card]").each(() => {
        cy.get("svg").should("exist");
        cy.getDataTest("weather-hourly-card__weather-name").contains(regex);
        cy.getDataTest("weather-hourly-card__time").should("not.be.empty");
        cy.getDataTest("weather-hourly-card__temperature").should("not.be.empty");
    });

    cy.getDataTest("weather-details__date").should("not.be.empty");
    cy.getDataTest("weather-details__temperatures").should("not.be.empty");
    cy.getDataTest("weather-details__sunrise").should("not.be.empty");
    cy.getDataTest("weather-details__sunset").should("not.be.empty");
    
  })
})