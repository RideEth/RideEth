# RideEth
Smart contract to ensure your driver gets you there on time, safely. 

    git clone https://github.com/RideEth/RideEth
    cd RideEth

In a shell, launch the private testnet. Geth version used is 1.4.11-stable-fed692f6

    cd edgware_private_network
    ./edgware-node.sh
    myaccount = personal.newAccount("mypassword")

Then request for 100 edgware ethers in a web browser

    https://blockone-faucet.tr-api-services.net/v1/send/100/ether-to/YOUR-ADDRESS/on/edgware

Check your account balance

    web3.fromWei(eth.getBalance(eth.coinbase), "ether")


This proof of concept was implemented in London during the Thomson Reuters HackETHon, 9/10/11 September 2016  