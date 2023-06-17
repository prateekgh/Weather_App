const key ='qtlgUB1sHuX1QHxaVCHGFX4tlGZZM2ky';

const getWeather = async (id)=>{
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base+query);
    const data = await response.json();

    return data[0];

}
//get city information
const getCity = async (city) =>{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search' // the base url from where we need data 
    const query = `?apikey=${key}&q=${city}`;
    
    const response = await fetch(base+query);
    const data = await response.json();
    return data[0]; // we get anhy city matches closest we only take the first one
}
//since it is an async fucnton it is returning apromise so we do then() and catch method


