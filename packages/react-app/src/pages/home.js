import React, {useEffect, useState} from "react";
import {Body, Container, Header} from "../components";
//import {Mint} from '../components/mint'
import {Button} from '@chakra-ui/react'
import {Contract} from '@ethersproject/contracts'
import {useEthers, useCall, shortenAddress, useLookupAddress} from '@usedapp/core'
import {addresses, abis} from "@my-app/contracts";
import {Loader} from "../components";
import loader from "../assets/reggae-loader.svg";
import silo from "../assets/ble.jpg";
import {useNavigate} from "react-router-dom";


function WalletButton() {
    const [rendered, setRendered] = useState("");

    const ens = useLookupAddress();
    const {account, activateBrowserWallet, deactivate, error} = useEthers();

    useEffect(() => {
        if (ens) {
            setRendered(ens);
        } else if (account) {
            setRendered(shortenAddress(account));
        } else {
            setRendered("");
        }
    }, [account, ens, setRendered]);

    useEffect(() => {
        if (error) {
            console.error("Error while connecting wallet:", error.message);
        }
    }, [error]);

    return (
        <Button

            onClick={() => {
                if (!account) {
                    activateBrowserWallet();
                } else {
                    deactivate();
                }
            }}
            colorScheme='purple'
            margin='4'
            size='sm'
            variant='outline'
        >
            {rendered === "" && "Connect Wallet"}
            {rendered !== "" && rendered}
        </Button>
    );
}

function Issuer() {
    let nameIssuer;
    let nameIssuerNumber ;

    const navigate = useNavigate();

    const {value: numberOfIssuer} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "numIssuer",
    }) ?? {};
    const number = parseInt(numberOfIssuer) - 1;

    let issuer = [];

    const {value: info} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: [number],
    }) ?? {};

    let infoString = String(info);
    let tab = infoString.split(",", 32);
    nameIssuer = tab[0];
    nameIssuerNumber = tab[1];
    //console.log(nameIssuerNumber);

    issuer.push(<Button
        onClick={() => {
            navigate(`/nft/:nameIssuerNumber`,
            {nameIssuerNumber})
        }}
        colorScheme='purple'
        margin='4'
        size='md'
        variant='outline'
    >
        {nameIssuer}
    </Button>)

    return (
        <p>{issuer}</p>
    );
}

export function Home() {
    const navigate = useNavigate();

    const {account} = useEthers();

    const {value: isRegisteredRaw} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "isAddressExist",
        args: (account === null || account === undefined) ? ["0x0000000000000000000000000000000000000000"] : [account],
    }) ?? {};

    if (isRegisteredRaw) {
        var isRegistered = isRegisteredRaw[0]
    }

    return (
        <Container>
            <Header>
                <WalletButton/>
            </Header>
            <Body>
                <p style={{color: '#F6CF6C', margin: '20px'}}> 🌽 WELCOME TO SILO 🌽 </p>

                <img src={silo}/>

                <p style={{color: 'black'}}>.</p>
                {isRegistered === undefined && <Loader src={loader}/>}
                {isRegistered === true && <p>You are registered! ✨</p>}
                {isRegistered === false && <p>You are NOT registered.</p>}

                <Button
                    onClick={() => {
                        navigate(`/issuerDa`);
                    }}
                    colorScheme='purple'
                    margin='4'
                    size='md'
                    variant='outline'
                >
                    Company
                </Button>

                <p style={{
                    borderTop: '1px solid ',
                    borderTopColor: 'rgb(256, 256, 256)',
                    margin: '20px',
                    width: '500px'
                }}/>
                <p style={{color: '#F6CF6C', margin: '20px'}}> All the company who are register </p>

                <Issuer/>

            </Body>
        </Container>
    );
}