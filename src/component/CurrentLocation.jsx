import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import ForCast from './ForCast'


function CurrentLocation() {
    
    const [latitude, setLatitude]=useState(null)
    const [longitude, setLongitude]=useState(null)
    
    useEffect(()=>{
        function getLocation(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position)=>{
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error)=>{
                    console.log("Error getting Location",error)
                })

            }else{
                console.error("'Geolocation is not supported by this browser.")
            }
        }

        getLocation();
    },[])

  return (
    <div>
      {latitude && longitude?<ForCast latitude={latitude} longitude={longitude}/>:<Loading/>}
    </div>
  )
}

export default CurrentLocation
