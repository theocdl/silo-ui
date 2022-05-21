import {Button, Input} from '@chakra-ui/react'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';
import {Body, Container, Header, Link} from "../components";
import {Contract} from '@ethersproject/contracts'
import {addresses, abis} from "@my-app/contracts";
import {FaEthereum} from "react-icons/fa";
import {useCall, useContractFunction, useEthers} from "@usedapp/core";
import {ethers, utils} from "ethers";
import silo from "../assets/silo.png";

const nftInterface = new utils.Interface(abis.silo)
const nftContract = new Contract(addresses.silo, nftInterface)

const daiInterface = new utils.Interface(abis.dai)
const daitContract = new Contract(addresses.dai, daiInterface)


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

function Between2lines() {

    return (

        <>
            <p style={{
                borderTop: '1px solid ',
                borderTopColor: 'rgb(256, 256, 256)',
                margin: '20px',
                width: '500px'
            }}/>
        </>

    );
}

function wait() {
    console.log("10s wait to approve");
}


export function Nft() {
    const params = useParams();

    const {send: buy} = useContractFunction(nftContract, 'buy');
    const {send: approve} = useContractFunction(daitContract, 'approve');
    const {send: getDai} = useContractFunction(daitContract, 'withdraw');

    const {value: info} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: [params.username],
    }) ?? {};

    const {value: nft} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "getItem",
        args: [params.username],
    }) ?? {};

    let infoString = String(info);
    let tabIssuer = infoString.split(",", 32);
    let nftString = String(nft);
    let tabNFT = nftString.split(",", 32);

    let name = tabIssuer[0];
    let meta = tabIssuer[3];
    let supply = tabIssuer[4];

    let price = tabNFT[0];

    return (
        <Container>
            <Body>

                <p style={{color: '#F6CF6C', margin: '20px'}}> 🌽 WELCOME TO SILO 🌽 </p>

                <Header>
                    <WalletButton/>
                </Header>


                <h2 style={{color: '#F6CF6C', margin: '20px'}}><strong>{name}</strong></h2>

                <img src={silo} style={{
                    width: '220px',
                    height: '220px'
                }}/>

                <Button

                    onClick={() => {
                        getDai();
                    }}
                    colorScheme='yellow'
                    margin='4'
                    size='sm'
                    variant='outline'
                >
                    Get some DAI
                </Button>

                <Between2lines/>
                <h3 style={{margin: '10px'}}>Supply : {supply}</h3>
                <h3 style={{margin: '10px'}}>Price for one share : {price}</h3>

                <Button

                    onClick={async () => {
                        await approve(addresses.silo, ethers.utils.parseEther(price));
                        await buy(params.username);
                    }}
                    colorScheme='purple'
                    margin='4'
                    size='lg'
                    variant='outline'
                >
                    Buy
                </Button>


                <p><small><Link href={meta}>Metadata Company</Link></small></p>


            </Body>
        </Container>
    );
}

