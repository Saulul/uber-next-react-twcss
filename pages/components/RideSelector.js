import React from 'react';
import tw from "tailwind-styled-components";
import {carList} from "../data/carList";
import {useEffect, useState} from "react";

const RideSelector = ({pickupCoordinates,dropoffCoordinates}) => {
    const [rideDuration, setRideDuration] = useState(0);
    const access_token = "pk.eyJ1Ijoic2F1bHVsIiwiYSI6ImNrdmxvZnhzMjNpMGMzMXBnbHV0Mnc3dWcifQ.wAE9lzFnV0Jzl_Gq8kuwEw";

    useEffect(() => {
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/
        ${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=${access_token}`
            // +
            // new URLSearchParams({
            //     access_token: access_token,
            // })
        ).then(res => res.json())
            .then(data => {
                setRideDuration(data.routes[0].duration / 100)
            })
    }, [pickupCoordinates, dropoffCoordinates]);
    
    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up for more</Title>
            <CarList>
                {carList.map((car,index)=>(
                    <Car key={index}>
                        <CarImage src={car.imgUrl} />
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>5 min away</Time>
                        </CarDetails>
                        <Price>{'$' + ((rideDuration/4)*car.multiplier).toFixed(2)}</Price>
                    </Car>
                ))}
            </CarList>
        </Wrapper>
    );
};

export default RideSelector;

const Wrapper = tw.div`
    flex flex-col flex-1 overflow-y-scroll 
`
const Title = tw.div`
    text-gray-500 text-center text-xs py-2 border-b
`
const CarList = tw.div`
    overflow-y-scroll overflow-hidden
`
const Car = tw.div`
    flex p-4 items-center
`
const CarImage = tw.img`
    h-14 mr-2
`
const CarDetails = tw.div`
    flex-1
`
const Service = tw.div`
    font-medium
`
const Time = tw.div`
    text-xs text-blue-500
`
const Price = tw.div`
    text-l
`