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

# Incentives within RideEth


We did a quick analysis about amounts that should be commited by the users to guide our implementation and further developments. The driver and the passengers all commit funds to the contract. The analysis bellow suggest a minimum funding requirement to have an incentive for the driver to drive safely and for the passengers to notify when the ride is not safe. We use a reference variable F>0 that can theoretically as close to 0 as possible but for production perspectives F will have to be determined by market studies. F can seen as the willingness to use the service. F is the only reference variable here but different variables for the driver and the passengers can be used without compromising this analysis.

----
## Commitments at the start - how do much riders pay?

###Driver

>F * (1 + #Passengers)
> ; where #Passengers is the number of passengers

###Passengers

>F

###At the start the contract balance is:

>F * (1 + 2 * #Passengers)


##Results - how much do the riders get?

###*if the ride was Safe* :

###Driver

>F * (1 + #Passengers)

###Passengers

>0

###At the end the contract balance is:

>F * #Passengers


###*if the ride was not Safe* :



###Driver

>0

###Passengers

>2*F

###At the start the contract balance is:

>F 

*Note that this remaining balance in the contract is important and will be transfered to the factory at "self destruct".
The contract balance is sent to the factory contract as a payment for the service and as a mean to derive the reputation of the drive.
The more the factory gets from ride contracts deployed by the driver the better his reputation is.*



## About incentives

**Driver** is the one that has the most to loose here  but also the only one in control of the result. If Driver respects the speed-limit he will automatically get back the money he committed:
> F * (1 + #Passengers)

If not he will loose it. Therefore:

> **F should be high enough to be compelling for the drive**


**Passengers** are monitoring the ride, they commit **F** to be able to penalise the driver if he over-speeds. If the driver respects the speed-limit no passenger will be able to penalise him and the passengers will have paid F for the service. If the driver over-speeds and one of the passenger notifies it then the passengers all shares the driver commit. Therefore:

> **F should be low enough to make the service attractive for passengers and high enough so the passengers will actually want to monitor the speed**

*Note that "overspending" in the contract is triggered by significant deviation between the expected time of arrival at the start of the ride and the expected time of arrival when the passenger call the contract to penalise the driver. Therefore multiple edge-cases are possible. For example, when the API calculates the time at the start this calculation is done considering multiple conditions (weather, traffic...) and variations of those conditions during the journey can be a source of significant deviations. Most of the edges we have identified can be addressed by doing multiples deviation check during the journey and judging the safety by a threshold number of deviations.*
