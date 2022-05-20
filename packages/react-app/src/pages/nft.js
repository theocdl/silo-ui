import {Button, Input} from '@chakra-ui/react'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import {Body, Container, Header} from "../components";
import {Contract} from '@ethersproject/contracts'
import {addresses, abis} from "@my-app/contracts";
import {FaEthereum} from "react-icons/fa";
import {useCall, useContractFunction, useEthers} from "@usedapp/core";
import {utils} from "ethers";
import silo from "../assets/silo.png";

const nftInterface = new utils.Interface(abis.silo)
const nftContract = new Contract(addresses.silo, nftInterface)

function WalletButton() {

    let navigate = useNavigate();

    return (

        <Button

            onClick={() => {
                navigate(`/`);
            }}
            colorScheme='purple'
            margin='4'
            size='sm'
            variant='outline'
        >
            Back home
        </Button>

    );
}


export function Nft() {
    
    const params = useParams()
    console.log("params", params.username );
    //const num = params.substr(1);

     const {value: info} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: [params.username],
    }) ?? {};

    const res = params;

    console.log("res", res );

    let infoString = String(info);

    console.log("info", info );


    let tab = infoString.split(",", 32);
    let name = tab[0];

    let meta = tab[3];

    
        // console.log("yo")
        const {send: buy} = useContractFunction(nftContract, 'buy');

    
    return (
        <Container>
            <Body>

            <p style={{color: '#F6CF6C',margin: '20px'}}> 🌽 WELCOME TO SILO 🌽 </p>

            <Header>
                <WalletButton/>
            </Header>


                <h2 style={{margin: '20px'}}><strong>{name}</strong></h2>
                <h3 style={{margin: '20px'}}>{meta}</h3>

                <Button

            onClick={buy(params.username)}
            colorScheme='purple'
            margin='4'
            size='lg'
            variant='outline'
        >
            Buy
        </Button>

                <img src={silo}/>

                


            </Body>
        </Container>
    );
}

