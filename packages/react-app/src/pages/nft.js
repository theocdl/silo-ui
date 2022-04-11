import { useParams } from "react-router-dom";
import { Description, Media, Loader, Link } from "../components";
import { Body, Container, Header } from "../components";
import { FetchData } from '../components/fetch'
// import myImage from "../assets/lode-runner.png";
import { Button, Tooltip } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from 'react'
import { useEthers, useCall} from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { addresses, abis } from "@my-app/contracts";
import loader from "../assets/reggae-loader.svg";
import { useNft } from "use-nft"

function WalletButton() {

  let navigate = useNavigate();

  return (
    
    <Button
    
      onClick={() => {
        navigate(`/`);
      }}
      colorScheme='purple'
      margin= '4'
      size='sm'
      variant='outline'
      >
      Back home
    </Button>
   
  );
  }

  export function Nft() {

  const {address, id } = useParams()

  console.log("✅ nft contract address: ", address)
  console.log("✅ nft id: ",id)

  const { account } = useEthers();

  const { value: name } =
  useCall({
  contract: new Contract(addresses.erc721, abis.erc721),
  method: "name",
  args: [],
  }) ?? {};

  const { value: tokenURI } =
  useCall({
  contract: new Contract(addresses.erc721, abis.erc721),
  method: "tokenURI",
  args: [id],
  }) ?? {};

  const { value: bal } =
  useCall({
  contract: new Contract(addresses.erc721, abis.erc721),
  method: "balanceOf",
  args: (account === null || account === undefined) ? ["0x157555B75fE690351b9199384e3C473cCFb6EFab"] : [account],
  }) ?? {};

  const openseaUrl = "https://testnets.opensea.io/assets/0x61681514ea040d19dc4279301adc10bf654d886a/"+id
  const etherscanUrl = "https://rinkeby.etherscan.io/address/"+address
  
  const { loading, error, nft } = useNft(
    address,
    id
  )

  if (loading) return (
    <Container>
      <Header>
        <WalletButton />
      </Header>
      <Body>
        <Loader src={loader}/>
      </Body>
    </Container>
  )

  if (error || !nft) return (
    <Container>
      <Header>
        <WalletButton />
      </Header>
      <Body>
        <Loader src={loader}/>
      </Body>
    </Container>
  )

  console.log("✅ nft data: ",nft)

  return (
    <Container>
      <Header>
        <WalletButton />
      </Header>
      <Body>

        {loading === true || bal === null || bal === undefined ? 

        <Loader src={loader}/> : <>

        <h2><strong>{name}</strong></h2>

        <p><i>by</i> <strong><small>{nft.rawData.author}</small></strong></p>
        
        <Media src={nft.image} alt="" />

        <Description>
        <small>{nft.description}</small>
        <br />
        <p><small>

        <Tooltip hasArrow label='The issuer of this NFT keeps all IP rights on the artwork associated 😿' bg='red.600'>
        <Link href="https://ato.works/"><strong style={{ color: 'red' }}>No license detected </strong></Link>
        </Tooltip>

        | <Link href={etherscanUrl}>Etherscan</Link> 
        
        | 
        <Tooltip hasArrow label='Sometimes it takes a lot of time to display your NFT in OpenSea 😿' bg='red.600'>
        <Link href={openseaUrl}> OpenSea </Link>
        </Tooltip>
         
        
        | <Link href={tokenURI}>Metadata</Link></small></p>
        
        <br /><br />
        <FetchData />
        <p>You own <strong>{bal.toString()}</strong> of these.</p>

        </Description></>}        
        
      </Body>
    </Container>
  );
}

  