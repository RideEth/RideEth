function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};



function newRide() {
  
  var meta = RideFactory.deployed();
//  var meta = RideFactory.at(FactoryContractAddr);

  var startPoint = parseInt(document.getElementById("journeyFrom").value);
  var endPoint = parseInt(document.getElementByID("journeyTo").value);

  if (startPoint.length == 0 || endPoint.length == 0) {

    alert("Please ensure that your start and end locations are properly populated");
    return;
  }

  meta.newRide(startPoint, endPoint);

	var qrcodeElem = document.getElementById("qrcode");
	var qrcode = new QRCode(qrcodeElem, { width : 100, height : 100 });
	rideContractAddr = web3;
	qrcode.makeCode(rideContractAddr);
	qrcodeElem.setAttribute('hidden', 'false')
	
	
}


function joinRide() {
  
}

function startJourney() {

}


function challengeSafety() {


}

function withdrawFunds() {

}

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];


  });
}
