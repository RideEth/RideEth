contract('Ride', function(accounts) {

  var accounts = web3.eth.accounts;
  var factory = accounts[0]
  var driver = accounts[1]
  var alice = accounts[2]
  var bob = accounts[3]

  it("should create a ride from A to B", function() {
    return Ride.new(12, 15, driver, {
      from: factory,
      value: web3.toWei(1, 'ether')
    }).then(ride => {
      return ride.from().then(f => {
        assert.equal(f.toNumber(), 12)
        return ride.to()
      }).then(t => {
        assert.equal(t.toNumber(), 15)
      })
    })
  });
});