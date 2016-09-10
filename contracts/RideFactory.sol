import "Ride.sol";

contract RideFactory {
    address[] public rides;
    
    function newRide(uint _from, uint _to) {
        rides.push((new Ride).value(msg.value)(_from, _to, msg.sender));
    }
}