import "Ride.sol";

contract RideFactory {
    address[] public rides;
    event NewRide(address ride);
    
    function newRide(uint _from, uint _to) {
        address ride = (new Ride).value(msg.value)(_from, _to, msg.sender);
        rides.push(ride);
        NewRide(ride);
    }
}
