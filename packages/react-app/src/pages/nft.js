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
    console.log(params);
    //const num = params.substr(1);

   /* const {value: info} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: [params],
    }) ?? {};

    let infoString = String(info);
    let tab = infoString.split(",", 32);
    let name = tab[0];
*/
    return (
        <Container>
            <Body>

            <p style={{color: '#F6CF6C',margin: '20px'}}> 🌽 WELCOME TO SILO 🌽 </p>

            <Header>
                <WalletButton/>
            </Header>


                <h2 style={{margin: '20px'}}><strong>ok</strong></h2>
                <img src={silo}/>


            </Body>
        </Container>
    );
}

