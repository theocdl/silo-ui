import {Button, Input} from '@chakra-ui/react'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Body, Container, Header, Links} from "../components";
import {Contract} from '@ethersproject/contracts'
import {addresses, abis} from "@my-app/contracts";
import {FaEthereum} from "react-icons/fa";
import {useCall, useContractFunction, useEthers} from "@usedapp/core";
import {utils} from "ethers";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
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

        function getAccessToken() {
                    console.log("✅ getAccessToken")            
                    return process.env.REACT_APP_WEB3STORAGE_TOKEN;
                }
                
                function makeStorageClient() {
                    console.log("✅ makeStorageClient");
                    return new Web3Storage({ token: getAccessToken() });
                }
                
                function makeFileObjects() {
                    console.log("✅ makeFileObjects");
                    const obj = {
                        "name": name,
                        "description": "Cropper",
                        "address": "",
                        "city": "",
                        "zipcode": "",
                        "country": "",
                        "contrat": "",
                        "info": ""
                      };
                    const blob = new Blob([JSON.stringify(obj)], {type : 'application/json'});
                
                    const files = [
                    new File(['contents-of-file-1'], 'plain-utf8.txt'),
                    new File([blob], 'lode-runner.json')
                    ];
                    return files;
                }
                
                // async function storeFiles(files) {
                //     console.log("✅ storeFiles");
                //     const client = makeStorageClient();
                //     const cid = await client.put(files);
                //     console.log('✅ stored files with CID: ', cid, "🎉");
                //     return cid;
                // }

                const client = makeStorageClient();
                const cid = await client.put(makeFileObjects());
                //     console.log('✅ stored files with CID: ', cid, "🎉");
                //     return cid;

                const uri = "https://ipfs.io/ipfs/" + cid;
                
                console.log("👋 Hello! ");
                makeStorageClient();
                // const uri = await storeFiles(makeFileObjects()) + "/lode-runner.json";
                console.log("✅ uri: ", uri );






        //const uri = "https://ato-nft.mypinata.cloud/ipfs/QmTNCBMiubsSszDVEEiLQkvb3hvPBacngSY7HGaZ5RgsNA"
        return uri
    }

    async function makeNftMetadata(name) {

        console.log("name: ", name);

        function getAccessToken() {
                    console.log("✅ getAccessToken")            
                    return process.env.REACT_APP_WEB3STORAGE_TOKEN;
                }
                
                function makeStorageClient() {
                    console.log("✅ makeStorageClient");
                    return new Web3Storage({ token: getAccessToken() });
                }
                
                function makeFileObjects() {
                    console.log("✅ makeFileObjects");
                    const obj = {
                        "name": name,
                        "author": "BestCrops",
                        "description": "You can exchange this NFT with the company BestCrops who's committed to deliver one ton of wheat when th NFT is redeemed. \n \nThis NFT can be redeemed at https://silo-app.netlify.app/ \n \nhttps://rinkeby.etherscan.io/address/0x9c569c5ee9814f0cc6f7811161518103ecfad757#code",
                        "image": "https://ato-nft.mypinata.cloud/ipfs/QmbGL19r5rYTrLGuPpKmMmst1x4LSzTnKcQgFQXHH8Bxj9",
                        "resale_rights": "1",
                        "attributes": [
                          {
                            "trait_type": "Minted on",
                            "value": "Silo"
                          },
                          {
                            "trait_type": "License type",
                            "value": "Public use limited to resale"
                          },
                          {
                            "trait_type": "Resale rights (%)",
                            "value": "1"
                          },
                          {
                            "trait_type": "View licence",
                            "value": "https://ipfs.io/ipfs/<CID>"
                          }
                        ],
                        "license_details": [
                          {
                            "trait_type": "metaverse",
                            "value": "true"
                          },
                          {
                            "trait_type": "adaptation",
                            "value": "false"
                          },
                          {
                            "trait_type": "pfp",
                            "value": "true"
                          },
                          {
                            "trait_type": "...",
                            "value": "..."
                          }
                        ]
                      };
                    const blob = new Blob([JSON.stringify(obj)], {type : 'application/json'});
                
                    const files = [
                    new File(['contents-of-file-1'], 'plain-utf8.txt'),
                    new File([blob], 'wheat.json')
                    ];
                    return files;
                }
                
                

                const client = makeStorageClient();
                const cid = await client.put(makeFileObjects());
               

                const uri = "ato-nft.mypinata.cloud/ipfs/" + cid + "/wheat.json";
                
                console.log("👋 Hello! ");
                makeStorageClient();
                // const uri = await storeFiles(makeFileObjects()) + "/lode-runner.json";

                return uri;
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

                        {/* <Input onChange={infoInput}
                               margin='2'
                               type="text" placeholder="NFT Metadata"/>
                        <p style={{fontSize: '10px', fontStyle: 'italic'}}>
                            *You have to put an IPFS link to a .json file
                        </p> */}

                        <Button
                            onClick={() => {
                                console.log(numCompany, supply, price, info);
                                
                                create(numCompany, supply, price, makeNftMetadata());
                            }}
                            leftIcon={<FaEthereum/>}
                            colorScheme='purple'
                            margin='4'
                            size='sm'
                            variant='outline'
                        >
                            Create
                        </Button>
                        {/* <Links></Links> */}

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