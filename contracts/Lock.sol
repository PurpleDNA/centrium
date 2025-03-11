// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    struct Profile {
        uint256 age; // weight is accumulated by delegation
        bool online; // if true, that person already voted
        address identity;
        string name; // index of the voted proposal
    }

    // This declares a state variable that
    // stores a `Person` struct for each possible address.
    mapping(address => Profile) public profiles;

    function create_profile(
        string memory name,
        uint256 age
    ) public returns (string memory) {
        profiles[owner].identity = msg.sender; //can save
        profiles[owner].age = age;
        profiles[owner].name = name;
        profiles[owner].online = true;
        documentCount += 1;
        emit Stored();
        return name;
    }

    event Stored();

    struct Document {
        address ownerAddress;
        string content;
        uint256 timestamp;
        uint256 modified;
    }
    mapping(bytes32 => Document) public documents; //every file hashed will belong to a address using the data type 32 bytes, size of a sha256 hash.
    mapping(uint => bytes32) public hashList; //every file hashed will belong to a address using the data type 32 bytes, size of a sha256 hash.
    uint public documentCount = 0;

    function amIMaster() public view returns (string memory) {
        if (msg.sender == owner) {
            return "Yes, master";
        }
        return "No";
    }
    function getBalance() public view returns (uint) {
        return msg.sender.balance;
    }

    function amIOwner(string memory file) public view returns (bool) {
        bytes32 fileHash = keccak256(abi.encodePacked(file));

        if (msg.sender == documents[fileHash].ownerAddress) {
            return true;
        }
        return false;
    }
    function getHash(string memory file) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(file));
    }

    function changeOwner(
        string memory file,
        address newOwner
    ) public returns (bool) {
        if (amIOwner(file)) {
            bytes32 fileHash = keccak256(abi.encodePacked(file));
            documents[fileHash].ownerAddress = newOwner;
            documents[fileHash].modified = block.timestamp;
            emit Stored();
            return true;
        }
        return false;
    }

    function store(
        string memory file,
        string memory content
    ) public returns (bytes32) {
        bytes32 fileHash = keccak256(abi.encodePacked(file));
        if (
            documents[fileHash].ownerAddress ==
            0x0000000000000000000000000000000000000000
        ) {
            documents[fileHash].ownerAddress = msg.sender; //can save
            documents[fileHash].content = content;
            documents[fileHash].timestamp = block.timestamp;
            hashList[documentCount] = fileHash;
            documentCount += 1;
            emit Stored();
            return fileHash;
        }
    }

    function getDocumentCount() public view returns (uint) {
        return documentCount;
    }

    function getDocument(
        uint index
    )
        public
        view
        returns (
            bytes32 fileHash,
            address ownerAddress,
            string memory content,
            uint256 timestamp
        )
    {
        require(index > documentCount);

        fileHash = hashList[index];
        ownerAddress = documents[fileHash].ownerAddress;
        content = documents[fileHash].content;
        timestamp = documents[fileHash].timestamp;
    }

    function hasOwner(string memory file) public view returns (address) {
        return documents[keccak256(abi.encodePacked(file))].ownerAddress;
    }

    event Withdrawal(uint amount, uint when);

    // constructor(uint _unlockTime) payable {
    //     require(
    //         block.timestamp < _unlockTime,
    //         "Unlock time should be in the future"
    //     );

    //     unlockTime = _unlockTime;
    //     owner = payable(msg.sender);
    // }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
