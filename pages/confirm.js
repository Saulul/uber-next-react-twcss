import React, {useState} from 'react';
import {useEffect} from "react";
import tw from "tailwind-styled-components";
import Map from './components/Map'
import Link from 'next/Link'
import {useRouter} from "next/router";
import RideSelector from "./components/RideSelector";

const Confirm = () => {
    const router = useRouter()
    const{pickup, dropoff} = router.query

    const [pickupCoordinates, setPickupCoordinates] = useState([0,0])
    const [dropoffCoordinates, setDropoffCoordinates] = useState([0,0])

    const access_token = "pk.eyJ1Ijoic2F1bHVsIiwiYSI6ImNrdmxvZnhzMjNpMGMzMXBnbHV0Mnc3dWcifQ.wAE9lzFnV0Jzl_Gq8kuwEw";

    const getPickupCoordinates = (pickup) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
            new URLSearchParams({
                access_token: access_token,
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data =>{
                setPickupCoordinates(data.features[0].center);
            })
    }

    const getDropoffCoordinates = (dropoff) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
            new URLSearchParams({
                access_token: access_token,
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data =>{
                setDropoffCoordinates(data.features[0].center);
            })
    }

    useEffect(() => {
        getDropoffCoordinates(dropoff);
        getPickupCoordinates(pickup);
    }, [pickup,dropoff]);


    return (
        <Wrapper>
            <ButtonContainer>
                <Link href={'/search'}>
                    <BackButton src={'https://img.icons8.com/ios-filled/50/000000/left.png'} />
                </Link>
            </ButtonContainer>

            <Map pickupCoordinates={pickupCoordinates}
                 dropoffCoordinates={dropoffCoordinates}
            />
            <RideContainer>
                <RideSelector pickupCoordinates={pickupCoordinates}
                              dropoffCoordinates={dropoffCoordinates}
                />
                <ConfirmButtonContainer>
                    <ConfirmButton>Confirm UberX</ConfirmButton>
                </ConfirmButtonContainer>
            </RideContainer>
        </Wrapper>
    );
};

export default Confirm;

const Wrapper=tw.div`
    flex h-screen flex-col
`
const RideContainer=tw.div`
    flex-1 flex flex-col h-1/2
`

const ConfirmButtonContainer=tw.div`
    border-t-2
`

const ConfirmButton = tw.div`
    bg-black text-white px-4 py-3 my-2 mx-4 text-center rounded text-xl cursor-pointer
`
const ButtonContainer = tw.div`
    absolute top-4 left-4 z-10 bg-white rounded-full
`
const BackButton = tw.img`
    h-full cursor-pointer object-contain
`