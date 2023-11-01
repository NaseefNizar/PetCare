import React,{ useState, useEffect } from 'react'

export const useGeoLocation = () => {

    const[location, setLocation] = useState({
        loaded:false,
        coordinates: {
            lat:"",
            lng:""
        }
    })

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        })
    }

    const onError = location => {
        
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    })


  return location
  
}
