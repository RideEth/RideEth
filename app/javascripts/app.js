var qrcode = new QRCode("qrcode");

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};



function newRide() {
  
  var meta = RideFactory.deployed();

  var startPoint = parseInt(document.getElementById("journeyFrom").value);
  var endPoint = parseInt(document.getElementByID("journeyTo").value);

  if (startPoint.length == 0 || endPoint.length == 0) {

    alert("Please ensure that your start and end locations are properly populated");
    return;
  }

  meta.newRide(startPoint, endPoint);

  

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
