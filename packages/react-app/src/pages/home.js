import {useEffect, useState} from "react";
import {Body, Container, Header} from "../components";
//import {Mint} from '../components/mint'
import {Button, Input, ListItem, UnorderedList, Image} from '@chakra-ui/react'
import {Contract} from '@ethersproject/contracts'
import {useEthers, useCall, shortenAddress, useLookupAddress, useContractFunction} from '@usedapp/core'
import {addresses, abis} from "@my-app/contracts";
// import {Loader} from "../components";
// import loader from "../assets/reggae-loader.svg";
import silo from "../assets/ble.jpg";
import {useNavigate} from "react-router-dom";
import {FaEthereum} from "react-icons/fa";
import {utils} from "ethers";

const nftInterface = new utils.Interface(abis.silo)
const nftContract = new Contract(addresses.silo, nftInterface)

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

function Between2lines() {

    return (

        <>
            <p style={{
                borderTop: '1px solid ',
                borderTopColor: 'rgb(256, 256, 256)',
                margin: '5px',
                marginTop: '15px',
                width: '500px'
            }}/>
        </>

    );
}

function Issuer() {
    let nameIssuer;
    // let nameIssuerNumber;
    let supplyNFT;

    const navigate = useNavigate();

    const {value: numberOfIssuer} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "numIssuer",
    }) ?? {};
    let number = parseInt(numberOfIssuer) - 1;
    console.log(number)

    let issuer = [];
    let tableIssuer = [];

    const {value: info1} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: [0],
    }) ?? {};
    tableIssuer.push(info1);

    const {value: info2} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: [1],
    }) ?? {};
    tableIssuer.push(info2);

    const {value: info3} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: [2],
    }) ?? {};
    tableIssuer.push(info3);

    const {value: info4} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: [3],
    }) ?? {};
    tableIssuer.push(info4);

    const {value: info5} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: [4],
    }) ?? {};
    tableIssuer.push(info5);

    const {value: info6} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "issuer",
        args: [number],
    }) ?? {};
    tableIssuer.push(info6);


    for (let i = 0; i < tableIssuer.length; i++) {
        let infoString = String(tableIssuer[i]);
        let tab = infoString.split(",", 32);
        nameIssuer = tab[0];
        // nameIssuerNumber = tab[1];
        supplyNFT = tab[4];

        // console.log("nameIssuerNumber: ", nameIssuerNumber)
        if (supplyNFT !== "0") {
            issuer.push(<Button
                onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/nft/${tableIssuer[i][1] }`)
                }}
                colorScheme='blue'
                
                size='md'
                variant='outline'
            >
                {nameIssuer}
            </Button>)
        }
    }

        // TODO: replace this array with length
        const numbers = [0, 1, 2, 3, 4, 5, 6];

        const listItems = numbers.map((number) =>

        <ListItem key={number.toString()}>
            {issuer[number]}
           </ListItem>
          
        );
        return (
          <UnorderedList>{listItems}</UnorderedList>
        );
      
}

function Sell() {

    const {send: sellNFT} = useContractFunction(nftContract, 'sell');

    const [idToken, setIdToken] = useState(" ");
    const [name, setName] = useState(" ");
    const [infoToken, setInfoToken] = useState(" ");

    const idInput = event => {
        setIdToken(event.target.value);
    };
    const nameInput = event => {
        setName(event.target.value);
    };
    const infoInput = event => {
        setInfoToken(event.target.value);
    };

    return (
        <>
            <Between2lines/>
            {/* <p style={{color: '#F6CF6C', margin: '20px'}}> Sell your NFT to the company to receive your order! </p> */}
            <p style={{color: '#F6CF6C', margin: '20px'}}> Redeem your NFT:</p>



            <Input onChange={idInput}
                   margin='4'
                   type="text" placeholder="NFT ID"/>

            <Input onChange={nameInput}
                   margin='4'
                   type="text" placeholder="Name of the provider"/>

            <Input onChange={infoInput}
                   margin='2'
                   type="text" placeholder="NFT new metadata"/>

            <Button
                onClick={() => {
                    console.log(idToken, name, infoToken);
                    sellNFT(idToken, name, infoToken);
                }}
                leftIcon={<FaEthereum/>}
                colorScheme='purple'
                margin='4'
                size='sm'
                variant='outline'
            >
                Redeem
            </Button>
        </>
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

    const {value: haveNFT} =
    useCall({
        contract: new Contract(addresses.silo, abis.silo),
        method: "balanceOf",
        args: (account === null || account === undefined) ? ["0x0000000000000000000000000000000000000000"] : [account],
    }) ?? {};

    if (isRegisteredRaw) {
        var isRegistered = isRegisteredRaw[0];
    }

    return (
        <Container>
            <Header>
                <WalletButton/>
            </Header>
            <p style={{color: '#F6CF6C', fontSize: '25px', textAlign: 'center'}}> 🌽 WELCOME TO SILO 🌽 </p>
            <Body>

                <Image src={silo}/>

                <p style={{color: 'black'}}>.</p>
                {isRegistered === undefined && <h1>Switch your network to <strong>Rinkeby</strong>, please.</h1>}
                {isRegistered === true && <p>You are registered! ✨</p>}
                {isRegistered === false && <p>You are NOT registered.</p>}

                <Button
                    onClick={() => {
                        navigate(`/dashboard`);
                    }}
                    colorScheme='purple'
                    margin='4'
                    size='md'
                    variant='outline'
                >
                    My dashboard
                </Button>

                <p style={{
                    borderTop: '1px solid ',
                    borderTopColor: 'rgb(256, 256, 256)',
                    margin: '20px',
                    width: '500px'
                }}/>
                <p style={{color: '#F6CF6C', margin: '20px'}}>Crops NFTs currently for sale: </p>

                {/* {
                    isRegisteredRaw === 0 || account === undefined ?
                    <p>loading...</p> : */}
                    <Issuer/>
                {/* } */}

                {String(haveNFT) !== "0" && String(haveNFT) !== "undefined" && <Sell/>}

            </Body>
        </Container>
    );
}