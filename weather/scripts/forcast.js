const key = "fwYkeGtccQvRLmSJgnyfQANVBsLAuGpR";

//An asynchronous fucntion to get city from Accuweather using API
const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
}

//By using the value we got from getCity() fucntion we can get weather for that specific city
const getWeather = async (id) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];

}


