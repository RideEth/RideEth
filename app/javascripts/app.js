var FactoryContractAddr = '0xc020881042c2197998c33bc886d2810000e99320';
var meta = RideFactory.at(FactoryContractAddr);
//var meta = RideFactory.deployed();
console.log(meta)



function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};



function newRide() {
  

  var startPoint = parseInt(document.getElementById("journeyFrom").value);
  var endPoint = parseInt(document.getElementById("journeyTo").value);

  if (startPoint.length == 0 || endPoint.length == 0) {

    alert("Please ensure that your start and end locations are properly populated");
    return;
  }

  meta.NewRide().watch((err, res) => {
    console.log(err,res)
  })

 //  meta.newRide(startPoint, endPoint, {from: account});

	// var qrcodeElem = document.getElementById("qrcode");
	// var qrcode = new QRCode(qrcodeElem, { width : 100, height : 100 });
	// rideContractAddr = web3;
	// qrcode.makeCode(rideContractAddr);
	// qrcodeElem.setAttribute('hidden', 'false')
	
	
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
