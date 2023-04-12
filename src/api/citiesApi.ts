import { type City } from '../types/City';

export const citiesData = async (query: string): Promise<City[]> => {
  if (query) {
    const where = encodeURIComponent(JSON.stringify({
      name: {
        $regex: query
      }
    }));
    const response = await fetch(
      `https://parseapi.back4app.com/classes/Ukraine_City?order=name&keys=name,country&where=${where}`,
      {
        headers: {
          'X-Parse-Application-Id': 'C1WfKAkjcTGt15XIW2GIQpCG6DZSM3AA1WgvE6nk', // This is your app's application id
          'X-Parse-REST-API-Key': 'HkeCuyl8OaiVsf0WPEYANzQF8klursN6n4GscuZD' // This is your app's REST API key
        }
      }
    );
    const cities = await response.json(); // Here you have the data that you need

    return cities.results;
  }

  return [];
};
