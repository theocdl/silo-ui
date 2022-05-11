import {Button, Input} from '@chakra-ui/react'
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

    const {send: addIssuer} = useContractFunction(nftContract, 'addIssuer')
    const {send: create} = useContractFunction(nftContract, 'create')

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

                    <>  <Input onChange={numCompanyInput}
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
                    </>

                }

            </Body>
        </Container>


    );

}


export default IssuerDashboard;