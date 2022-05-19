import {useEffect, useState} from "react";
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
/**
function Issuer() {
    const navigate = useNavigate();

    const {value: numberOfIssuer} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "numIssuer",
    }) ?? {};
    const number = parseInt(numberOfIssuer);

    let issuer = [];

    const {value: info} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: "0",
    }) ?? {};

    issuer.push(<Button
        onClick={() => {
            navigate(`/nft`);
        }}
        colorScheme='purple'
        margin='4'
        size='md'
        variant='outline'
    >
        {info}
    </Button>)

    return (
        <p>{issuer}</p>
    );
}*/

export function Home() {
    const navigate = useNavigate();

    const {account} = useEthers();

    const {value: isRegisteredRaw} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "isAddressExist",
        args: (account === null || account === undefined) ? ["0x0000000000000000000000000000000000000000"] : [account],
    }) ?? {};

    const {value: numberIssuer} =
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
                <p style={{color: '#F6CF6C'}}> 🌽 WELCOME TO SILO 🌽 </p>
                <p style={{color: 'black'}}>.</p>

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


            </Body>
        </Container>
    );
}