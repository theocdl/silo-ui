import {Button, Input, div} from '@chakra-ui/react'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Body, Container, Header} from "../components";
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
                borderTopColor: 'rgb(106, 2, 224)',
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

    return (
        <Container>

            <Body>
                <Header>
                    <WalletButton/>
                </Header>
                <Between2lines/>

                {isRegistered === false &&
                    <>  <Input onChange={nameInput}
                               margin='4'
                               type="text" placeholder="Name"/>

                        <Input onChange={infoInput}
                               margin='2'
                               type="text" placeholder="Compagny Information "/>
                        <Button
                            onClick={() => {
                                console.log(name, info);
                                addIssuer(name, info);
                            }}
                            leftIcon={<FaEthereum/>}
                            colorScheme='purple'
                            margin='4'
                            size='sm'
                            variant='outline'
                        >
                            Register
                        </Button>
                    </>
                }
                {isRegistered === true &&
                    <>
                        <p>Create</p>

                        <Input onChange={numCompanyInput}
                               margin='4'
                               type="text" placeholder="Number of the company"/>

                        <Input onChange={supplyInput}
                               margin='4'
                               type="text" placeholder="Supply"/>

                        <Input onChange={priceInput}
                               margin='4'
                               type="text" placeholder="Price"/>

                        <Input onChange={infoInput}
                               margin='2'
                               type="text" placeholder="Information of the NFT"/>

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

                        <Between2lines/>
                        <p>Change the Information of the company</p>

                        <Input onChange={numCompanyInput}
                               margin='4'
                               type="text" placeholder="Number of the company"/>

                        <Input onChange={infoInput}
                               margin='2'
                               type="text" placeholder="New Information of the compagny"/>

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
                            Change company information
                        </Button>

                        <Between2lines/>
                        <p>Change the price for the NFT</p>

                        <Input onChange={numCompanyInput}
                               margin='4'
                               type="text" placeholder="Number of the company"/>

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

                    </>
                }


            </Body>
        </Container>


    );

}


export default IssuerDashboard;