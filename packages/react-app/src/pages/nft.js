import {Button} from '@chakra-ui/react'
import React from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';
import {Body, Container, Header, Link, Links, Image} from "../components";
import {Contract} from '@ethersproject/contracts'
import {addresses, abis} from "@my-app/contracts";
// import {FaEthereum} from "react-icons/fa";
import {useCall, useContractFunction} from "@usedapp/core";
import {ethers, utils} from "ethers";
import silo from "../assets/silo.png";
// import opensea from "../assets/opensea.png";
import etherscan from "../assets/etherscan.png";


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
            margin='3'
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
                margin: '5px',
                marginTop: '15px',
                width: '500px'
            }}/>
        </>

    );
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
    let metaNFT = tabNFT[3];


    const etherscanUrl = "https://rinkeby.etherscan.io/address/" + addresses.silo;

    return (
        <Container>
            <Header>
                <WalletButton/>
            </Header>
           
            <Body>

                <h2 style={{fontSize: '30px', color: '#F6CF6C', margin: '20px'}}><strong>{name}</strong></h2>

                <Image src={silo} style={{
                    width: '220px',
                    height: '220px'
                }}/>

                <p style={{fontSize: '18px', marginTop: '10px'}}>Supply: <strong>{supply}</strong></p>

                {supply !== "0" && <p style={{fontSize: '18px', margin: '5px'}}>Price for one share : {price} DAI</p>}

                <Button

                    onClick={() => {
                        getDai();
                    }}
                    colorScheme='yellow'
                    margin='3'
                    size='sm'
                    variant='outline'
                >
                    Get some DAI
                </Button>
                
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

                <Between2lines/>

                <Links>
                    <p>
                        <small>📜</small>
                    </p>
                    <ul><small><Link variant='outline'
                                     href={meta}>Company info</Link></small> | </ul>
                    <Image src={etherscan} style={{
                        width: '25px',
                        height: '25px',
                        marginLeft: '15px'
                    }}/>
                    <ul><small><Link href={etherscanUrl}>Etherscan link</Link></small> | </ul>

                    <p style={{marginLeft: '15px'}}>
                        <small>🖼️</small>
                    </p>
                    <ul><small><Link href={metaNFT}>NFT metadata </Link></small></ul>

                </Links>


            </Body>
        </Container>
    );
}

