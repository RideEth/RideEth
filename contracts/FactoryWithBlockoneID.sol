contract EntitlementRegistry{function get(string _name)constant returns(address );function getOrThrow(string _name)constant returns(address );}
contract Entitlement{function isEntitled(address _address)constant returns(bool );}


  // Your implementation goes here
  
  import "https://github.com/RideEth/RideEth/blob/master/contracts/Ride.sol; //here goes the git repo

contract RideFactory {
    

  // BlockOne ID bindings

  // The address below is for the Edgware network only
  EntitlementRegistry entitlementRegistry = EntitlementRegistry(0xe5483c010d0f50ac93a341ef5428244c84043b54);

  function getEntitlement() constant returns(address) {
      return entitlementRegistry.getOrThrow("e.g.com.tr/rideeth");
  }

  modifier entitledUsersOnly {
    if (!Entitlement(getEntitlement()).isEntitled(msg.sender)) throw;
    _;
  }

    address[] public rides;
    
    function newRide(uint _from, uint _to) entitledUsersOnly {
        rides.push((new Ride).value(msg.value)(_from, _to, msg.sender));
    }
    

}


    
