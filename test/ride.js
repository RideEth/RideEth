contract('Ride', function(accounts) {

  var accounts = web3.eth.accounts;
  var factory = accounts[0]
  var driver = accounts[1]
  var alice = accounts[2]
  var bob = accounts[3]

  it("should create a ride from A to B", function() {
    return Ride.new(12,15,driver, {from: factory}).then(ride => {
      console.log(ride)
    })
  });
});
