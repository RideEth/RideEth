function DelayPromise(delay) {
  //return a function that accepts a single variable
  return function(data) {
    //this function returns a promise.
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        //a promise that is resolved after "delay" milliseconds with the data provided
        resolve(data);
      }, delay);
    });
  }
}

contract('Ride', function(accounts) {

  var accounts = web3.eth.accounts;
  var factory = accounts[0]
  var driver = accounts[1]
  var alice = accounts[2]
  var bob = accounts[3]

  // it("should create a ride from A to B", function(done) {
  //   return Ride.new(12, 15, driver, {
  //     from: factory,
  //     value: web3.toWei(2, 'ether')
  //   }).then(ride => {
  //     return ride.from().then(f => {
  //       assert.equal(f.toNumber(), 12)
  //       return ride.to()
  //     }).then(t => {
  //       assert.equal(t.toNumber(), 15)
  //     })
  //   }).then(done).catch(done)
  // });

  // it("should take alice and bob in", function(done) {
  //   return Ride.new(12, 15, driver, {
  //     from: factory,
  //     value: web3.toWei(2, 'ether')
  //   }).then(ride => {
  //     return ride.joinRide({
  //       from: alice,
  //       value: web3.toWei(2, 'ether')
  //     }).then(() => {
  //       return ride.joinRide({
  //         from: bob,
  //         value: web3.toWei(2, 'ether')
  //       })
  //     }).then(() => {
  //       return ride.state().then(s => {
  //         assert.equal(s.toNumber(), 1)
  //       })
  //     })
  //   }).then(done).catch(done)
  // })

  it("should let alice start ride", function(done) {
    return Ride.new(12, 15, driver, {
      from: factory,
      value: web3.toWei(2, 'ether')
    }).then(ride => {
      console.log("listen")
      ride.StartRideCallback().watch((err,res) => {
        console.log("STARTRIDECALLBACK!", err, res)
      })

      console.log("join ride")
      return ride.joinRide({
        from: alice,
        value: web3.toWei(2, 'ether')
      }).then(() => {
        console.log("join ride")
        return ride.joinRide({
          from: bob,
          value: web3.toWei(2, 'ether')
        })
      }).then(() => {
        console.log("start ride")
        return ride.startRide(12, {
          from: alice
        })
      }).then(DelayPromise(30000)).then(() => {
        console.log("get state")
        return ride.state().then(s => {
          assert.equal(s.toNumber(), 2)
        })
      }).then(() => {
        return ride.estimatedArrival().then(er => {console.log(er)})
      })
    }).then(done).catch(done)
  })

  // it("should let alice challenge the ride", function(done) {
  //   return Ride.new(12, 15, driver, {
  //     from: factory,
  //     value: web3.toWei(2, 'ether')
  //   }).then(ride => {
  //     return ride.joinRide({
  //       from: alice,
  //       value: web3.toWei(2, 'ether')
  //     }).then(() => {
  //       return ride.joinRide({
  //         from: bob,
  //         value: web3.toWei(2, 'ether')
  //       })
  //     }).then(() => {
  //       return ride.startRide(12, {
  //         from: alice
  //       })
  //     }).then(DelayPromise(10000)).then(() => {
  //       return ride.challenge(14, {
  //         from: alice
  //       })
  //     }).then(DelayPromise(10000)).then(() => {
  //       return ride.state().then(s => {
  //         assert.equal(s.toNumber(), 3)
  //       })
  //     }).then(() => {
  //       return ride.allowance(alice).then(aliceAllowance => {
  //         assert.equal(aliceAllowance.toNumber(), web3.toWei(2, "ether"))
  //       })
  //     })
  //   }).then(done).catch(done)
  // })


});