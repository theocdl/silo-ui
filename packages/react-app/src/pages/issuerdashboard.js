import {Button, Input} from '@chakra-ui/react'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Body, Container, Header, Links} from "../components";
import {Contract} from '@ethersproject/contracts'
import {addresses, abis} from "@my-app/contracts";
import {FaEthereum} from "react-icons/fa";
import {useCall, useContractFunction, useEthers} from "@usedapp/core";
import {utils} from "ethers";


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


export function IssuerDashboard() {
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

    const {send: addIssuer} = useContractFunction(nftContract, 'addIssuer');
    const {send: create} = useContractFunction(nftContract, 'create');
    const {send: changeInfo} = useContractFunction(nftContract, 'changeCompanyInfo')
    const {send: changePrice} = useContractFunction(nftContract, 'changePrice')
    const {send: redeem} = useContractFunction(nftContract, 'redeem');

    const [name, setName] = useState(" ");
    const [info, setInfo] = useState(" ");
    const [numCompany, setNumCompany] = useState(" ");
    const [supply, setSupply] = useState(" ");
    const [price, setPrice] = useState(" ");


    const nameInput = event => {
        setName(event.target.value);
    };
    const infoInput = event => {
        setInfo(event.target.value);
    };
    const numCompanyInput = event => {
        setNumCompany(event.target.value);
    };
    const supplyInput = event => {
        setSupply(event.target.value);
    };
    const priceInput = event => {
        setPrice(event.target.value);
    };

    async function makeCompanyInfo(name) {

        console.log("name: ", name);




        const uri = "https://ato-nft.mypinata.cloud/ipfs/QmTNCBMiubsSszDVEEiLQkvb3hvPBacngSY7HGaZ5RgsNA"
        return uri
    }

    return (
        <Container>
            <Header>
                <WalletButton/>
            </Header>
            <p style={{color: '#F6CF6C', fontSize: '25px', textAlign: 'center'}}> 🌽 WELCOME TO SILO 🌽 </p>

            <Body>
                <Between2lines/>

                {isRegistered === false &&
                    <>
                        <p style={{
                            color: '#F6CF6C',
                            font: 'Regular ',
                            fontStyle: 'Italic',
                            fontSize: '40'
                        }}>Register</p>

                        <Input onChange={nameInput}
                               margin='4'
                               type="text" placeholder="Name"/>

                        {/* <Input onChange={infoInput}
                               margin='2'
                               type="text" placeholder="Compagny info"/>
                        <p style={{fontSize: '10px', fontStyle: 'italic'}}>
                            * must be a url pointing to a .json file
                        </p> */}

                        <Button
                            onClick={() => {
                                console.log(name, info);
                                addIssuer(name, makeCompanyInfo(name));
                            }}
                            leftIcon={<FaEthereum/>}
                            colorScheme='purple'
                            margin='4'
                            size='sm'
                            variant='outline'
                        >
                            Register
                        </Button>
                        <Links></Links>
                    </>
                }
                {isRegistered === true &&
                    <>
                        <p style={{color: '#F6CF6C', font: 'Regular ', fontStyle: 'Italic', fontSize: '40'}}>Create
                            NFT</p>

                        <Input onChange={numCompanyInput}
                               margin='4'
                               type="text" placeholder="Company ID"/>

                        <Input onChange={supplyInput}
                               margin='4'
                               type="text" placeholder="Supply"/>

                        <Input onChange={priceInput}
                               margin='4'
                               type="text" placeholder="Price"/>

                        <Input onChange={infoInput}
                               margin='2'
                               type="text" placeholder="NFT Metadata"/>
                        <p style={{fontSize: '10px', fontStyle: 'italic'}}>
                            *You have to put an IPFS link to a .json file
                        </p>

                        <Button
                            onClick={() => {
                                console.log(numCompany, supply, price, info);
                                create(numCompany, supply, price, info);
                            }}
                            leftIcon={<FaEthereum/>}
                            colorScheme='purple'
                            margin='4'
                            size='sm'
                            variant='outline'
                        >
                            Create
                        </Button>
                        <Links></Links>

                        <Between2lines/>
                        <p style={{color: '#F6CF6C', font: 'Regular ', fontStyle: 'Italic', fontSize: '40'}}>Update the company info</p>

                        <Input onChange={numCompanyInput}
                               margin='4'
                               type="text" placeholder="Company number"/>

                        <Input onChange={infoInput}
                               margin='2'
                               type="text" placeholder="New compagny info"/>
                        <p style={{fontSize: '10px', fontStyle: 'italic'}}>
                            * Must be a url pointing to a .json file
                        </p>

                        <Button
                            onClick={() => {
                                console.log(numCompany, info);
                                changeInfo(numCompany, info);
                            }}
                            leftIcon={<FaEthereum/>}
                            colorScheme='purple'
                            margin='4'
                            size='sm'
                            variant='outline'
                        >
                            Update company info
                        </Button>

                        <Between2lines/>
                        <p style={{color: '#F6CF6C', font: 'Regular ', fontStyle: 'Italic', fontSize: '40'}}>Update the
                            price of this NFT</p>

                        <Input onChange={numCompanyInput}
                               margin='4'
                               type="text" placeholder="Company number"/>

                        <Input onChange={priceInput}
                               margin='2'
                               type="text" placeholder="New price"/>

                        <Button
                            onClick={() => {
                                console.log(numCompany, price);
                                changePrice(numCompany, price);
                            }}
                            leftIcon={<FaEthereum/>}
                            colorScheme='purple'
                            margin='4'
                            size='sm'
                            variant='outline'
                        >
                            Change price
                        </Button>

                        <Between2lines/>
                        <p style={{color: '#F6CF6C', font: 'Regular ', fontStyle: 'Italic', fontSize: '40'}}>Redeem</p>

                        <Input onChange={numCompanyInput}
                               margin='4'
                               type="text" placeholder="NFT number"/>

                        <p style={{fontSize: '12px', fontStyle: 'italic'}}>When you send an order to a customer use this
                            function to burn the NFT of the order</p>
                        <Button
                            onClick={() => {
                                console.log(numCompany);
                                redeem(numCompany);
                            }}
                            leftIcon={<FaEthereum/>}
                            colorScheme='purple'
                            margin='4'
                            size='sm'
                            variant='outline'
                        >
                            Redeem
                        </Button>
                        <Links></Links>
                    </>
                }
            </Body>
        </Container>


    );

}


export default IssuerDashboard;