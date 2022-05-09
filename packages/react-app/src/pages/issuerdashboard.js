import {Button, Input} from '@chakra-ui/react'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Body, Container, Header} from "../components";
import {Contract} from '@ethersproject/contracts'
import {addresses, abis} from "@my-app/contracts";
import {FaEthereum} from "react-icons/fa";
import {useContractFunction} from "@usedapp/core";
import {utils} from "ethers";
const nftInterface = new utils.Interface(abis.silo)
const nftContract = new Contract(addresses.silo, nftInterface)

function WalletButton() {

    let navigate = useNavigate();

    return (
        <Button

            onClick={() => {
                navigate(`/home`);
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


export function IssuerDashboard() {
    const { state, send:addIssuer } = useContractFunction(nftContract, 'addIssuer')

    const [name, setName] = useState(" ");
    const [info, setInfo] = useState(" ");

    const nameInput = event => {
        setName(event.target.value);
    };
    const infoInput = event => {
        setInfo(event.target.value);
    };

    return (
        <Container>

            <Body>
                <Header>
                    <WalletButton/>
                </Header>
                <Input
                    onChange={nameInput}
                    margin='4'
                    type="text" placeholder="Name"/>
                <Input
                    onChange={infoInput}

                    margin='2'
                    type="text" placeholder="Compagny Information "/>

                <Button

                    onClick={() => {
                        console.log(name, info);
                        addIssuer(name, info);
                    }}
                    leftIcon={<FaEthereum />}
                    colorScheme='purple'
                    margin='4'
                    size='sm'
                    variant='outline'
                >
                    Register
                </Button>
            </Body>
        </Container>


    );

}



export default IssuerDashboard;