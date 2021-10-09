import React,{useState} from 'react'
import {useLazyQuery} from '@apollo/client'
import { GET_WEATHER_QUERY } from '../graphql/Queries'

import '../App.css';


function Home(){
    const [citySearched,setCitySearched] = useState('')

    const [getWeather,{error,data}] = useLazyQuery(GET_WEATHER_QUERY,{
        variables:{ name: citySearched}
    })
    if(error) return <h1>Error Found</h1>
    if(data){
        console.log(data)
    }

    return (
        <div className={"home", "App"}>
            <h1>Search Weather</h1>
            <input type="text" placeholder="City name....." onChange={(event)=> setCitySearched(event.target.value)} />
            <button onClick={()=>getWeather()}>Search</button>
            <div>
                {data && (
                    
                    <>
                    <h1>
                        City Name: {data.getCityByName.name}
                    </h1>
                    <h2>Temp: {data.getCityByName.weather.temperature.actual} </h2>
                    <h2>Summary: {data.getCityByName.weather.summary.title} </h2>
                    <h2>FeelsLike: {data.getCityByName.weather.temperature.feelsLike} </h2>
                    </>
                )}                
            </div>
        </div>
    )
}

export default Home;