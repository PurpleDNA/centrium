// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    struct Profile {
        uint256 age;
        bool online;
        address identity;
        string name;
        address[] following;
        address[] followers;
        mapping(bytes32 => Document) drafts;
        bytes32[] draftHashes;
    }

    mapping(address => Profile) public profiles;

    struct Document {
        address ownerAddress;
        string content;
        string[] tags;
        string description; // For guide posts
        bool isGuidePost;
        uint256 timestamp;
        uint256 modified;
        uint256 likes;
        uint256 dislikes;
        Comment[] comments;
    }

    struct Comment {
        address commenter;
        string content;
        uint256 timestamp;
    }

    mapping(bytes32 => Document) public documents;
    mapping(uint => bytes32) public hashList;
    uint public documentCount = 0;

    event Stored();
    event Withdrawal(uint amount, uint when);
    event ProfileUpdated(address indexed user);
    event PostCreated(bytes32 indexed postHash, address indexed author);
    event PostLiked(bytes32 indexed postHash, address indexed liker);
    event PostDisliked(bytes32 indexed postHash, address indexed disliker);
    event CommentAdded(bytes32 indexed postHash, address indexed commenter);
    event Followed(address indexed follower, address indexed followed);
    event Unfollowed(address indexed unfollower, address indexed unfollowed);

    constructor(uint _unlockTime) payable {
        require(block.timestamp < _unlockTime, "Unlock time should be in the future");
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    // Profile Functions
    function createProfile(string memory name, uint256 age) public returns (string memory) {
        require(profiles[msg.sender].identity == address(0), "Profile already exists");
        
        profiles[msg.sender].identity = msg.sender;
        profiles[msg.sender].age = age;
        profiles[msg.sender].name = name;
        profiles[msg.sender].online = true;
        
        emit ProfileUpdated(msg.sender);
        return name;
    }

    function getProfile(address user) public view returns (
        string memory name,
        uint256 age,
        bool online,
        address[] memory following,
        address[] memory followers
    ) {
        Profile storage profile = profiles[user];
        return (
            profile.name,
            profile.age,
            profile.online,
            profile.following,
            profile.followers
        );
    }

    // Post Functions
    function createPost(
        string memory file,
        string memory content,
        string[] memory tags
    ) public returns (bytes32) {
        bytes32 fileHash = keccak256(abi.encodePacked(file, content, block.timestamp));
        require(documents[fileHash].ownerAddress == address(0), "Post already exists");

        documents[fileHash] = Document({
            ownerAddress: msg.sender,
            content: content,
            tags: tags,
            description: "",
            isGuidePost: false,
            timestamp: block.timestamp,
            modified: block.timestamp,
            likes: 0,
            dislikes: 0,
            comments: new Comment[](0)
        });

        hashList[documentCount] = fileHash;
        documentCount++;

        emit PostCreated(fileHash, msg.sender);
        emit Stored();
        return fileHash;
    }

    function createGuidePost(
        string memory file,
        string memory content,
        string memory description,
        string[] memory tags
    ) public returns (bytes32) {
        bytes32 fileHash = keccak256(abi.encodePacked(file, content, description, block.timestamp));
        require(documents[fileHash].ownerAddress == address(0), "Post already exists");

        documents[fileHash] = Document({
            ownerAddress: msg.sender,
            content: content,
            tags: tags,
            description: description,
            isGuidePost: true,
            timestamp: block.timestamp,
            modified: block.timestamp,
            likes: 0,
            dislikes: 0,
            comments: new Comment[](0)
        });

        hashList[documentCount] = fileHash;
        documentCount++;

        emit PostCreated(fileHash, msg.sender);
        emit Stored();
        return fileHash;
    }

    function saveToDrafts(
        string memory file,
        string memory content,
        string[] memory tags,
        string memory description,
        bool isGuidePost
    ) public returns (bytes32) {
        bytes32 fileHash = keccak256(abi.encodePacked(file, content, description, block.timestamp));
        
        Profile storage profile = profiles[msg.sender];
        profile.drafts[fileHash] = Document({
            ownerAddress: msg.sender,
            content: content,
            tags: tags,
            description: description,
            isGuidePost: isGuidePost,
            timestamp: block.timestamp,
            modified: block.timestamp,
            likes: 0,
            dislikes: 0,
            comments: new Comment[](0)
        });

        profile.draftHashes.push(fileHash);
        emit Stored();
        return fileHash;
    }

    // Post Interaction Functions
    function likePost(bytes32 postHash) public {
        require(documents[postHash].ownerAddress != address(0), "Post doesn't exist");
        documents[postHash].likes++;
        emit PostLiked(postHash, msg.sender);
    }

    function dislikePost(bytes32 postHash) public {
        require(documents[postHash].ownerAddress != address(0), "Post doesn't exist");
        documents[postHash].dislikes++;
        emit PostDisliked(postHash, msg.sender);
    }

    function commentOnPost(bytes32 postHash, string memory commentContent) public {
        require(documents[postHash].ownerAddress != address(0), "Post doesn't exist");
        
        documents[postHash].comments.push(Comment({
            commenter: msg.sender,
            content: commentContent,
            timestamp: block.timestamp
        }));
        
        emit CommentAdded(postHash, msg.sender);
    }

    // Social Functions
    function follow(address userToFollow) public {
        require(profiles[userToFollow].identity != address(0), "User doesn't exist");
        require(msg.sender != userToFollow, "Cannot follow yourself");
        
        profiles[msg.sender].following.push(userToFollow);
        profiles[userToFollow].followers.push(msg.sender);
        
        emit Followed(msg.sender, userToFollow);
    }

    function unfollow(address userToUnfollow) public {
        require(profiles[userToUnfollow].identity != address(0), "User doesn't exist");
        
        removeAddress(profiles[msg.sender].following, userToUnfollow);
        removeAddress(profiles[userToUnfollow].followers, msg.sender);
        
        emit Unfollowed(msg.sender, userToUnfollow);
    }

    // Helper function to remove an address from an array
    function removeAddress(address[] storage array, address addr) private {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] == addr) {
                array[i] = array[array.length - 1];
                array.pop();
                break;
            }
        }
    }

    // Search Functions
    function getAllDocuments(uint limit, uint offset) public view returns (
        bytes32[] memory postHashes,
        address[] memory owners,
        string[] memory contents,
        uint256[] memory timestamps
    ) {
        uint resultCount = documentCount - offset > limit ? limit : documentCount - offset;
        postHashes = new bytes32[](resultCount);
        owners = new address[](resultCount);
        contents = new string[](resultCount);
        timestamps = new uint256[](resultCount);
        
        for (uint i = 0; i < resultCount; i++) {
            bytes32 hash = hashList[offset + i];
            postHashes[i] = hash;
            owners[i] = documents[hash].ownerAddress;
            contents[i] = documents[hash].content;
            timestamps[i] = documents[hash].timestamp;
        }
        
        return (postHashes, owners, contents, timestamps);
    }

    function searchByTag(string memory tag) public view returns (bytes32[] memory) {
        bytes32[] memory result = new bytes32[](documentCount);
        uint count = 0;
        
        for (uint i = 0; i < documentCount; i++) {
            bytes32 hash = hashList[i];
            for (uint j = 0; j < documents[hash].tags.length; j++) {
                if (keccak256(abi.encodePacked(documents[hash].tags[j])) == keccak256(abi.encodePacked(tag))) {
                    result[count] = hash;
                    count++;
                    break;
                }
            }
        }
        
        bytes32[] memory finalResult = new bytes32[](count);
        for (uint i = 0; i < count; i++) {
            finalResult[i] = result[i];
        }
        
        return finalResult;
    }

    // Original Functions (Fixed)
    function amIMaster() public view returns (string memory) {
        return msg.sender == owner ? "Yes, master" : "No";
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function amIOwner(string memory file) public view returns (bool) {
        bytes32 fileHash = keccak256(abi.encodePacked(file));
        return msg.sender == documents[fileHash].ownerAddress;
    }

    function getHash(string memory file) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(file));
    }

    function changeOwner(string memory file, address newOwner) public returns (bool) {
        bytes32 fileHash = keccak256(abi.encodePacked(file));
        require(msg.sender == documents[fileHash].ownerAddress, "Not owner");
        
        documents[fileHash].ownerAddress = newOwner;
        documents[fileHash].modified = block.timestamp;
        emit Stored();
        return true;
    }

    function store(string memory file, string memory content) public returns (bytes32) {
        bytes32 fileHash = keccak256(abi.encodePacked(file));
        require(documents[fileHash].ownerAddress == address(0), "File already exists");
        
        documents[fileHash] = Document({
            ownerAddress: msg.sender,
            content: content,
            tags: new string[](0),
            description: "",
            isGuidePost: false,
            timestamp: block.timestamp,
            modified: block.timestamp,
            likes: 0,
            dislikes: 0,
            comments: new Comment[](0)
        });
        
        hashList[documentCount] = fileHash;
        documentCount++;
        emit Stored();
        return fileHash;
    }

    function getDocumentCount() public view returns (uint) {
        return documentCount;
    }

    // Get document by hash (faster than index)
function getDocumentByHash(bytes32 fileHash) public view returns (
    address ownerAddress,
    string memory content,
    string[] memory tags,
    string memory description,
    bool isGuidePost,
    uint256 timestamp,
    uint256 modified,
    uint256 likes,
    uint256 dislikes,
    Comment[] memory comments
) {
    Document storage doc = documents[fileHash];
    require(doc.ownerAddress != address(0), "Document does not exist");
    return (
        doc.ownerAddress,
        doc.content,
        doc.tags,
        doc.description,
        doc.isGuidePost,
        doc.timestamp,
        doc.modified,
        doc.likes,
        doc.dislikes,
        doc.comments
    );
}

    // Keep index-based lookup for pagination
    function getDocuments(uint limit, uint offset) public view returns (bytes32[] memory) {
        bytes32[] memory result = new bytes32[](limit);
        for (uint i = 0; i < limit && (offset + i) < documentCount; i++) {
            result[i] = hashList[offset + i];
        }
        return result;
    }

    function getDocument(uint index) public view returns (
        bytes32 fileHash,
        address ownerAddress,
        string memory content,
        string[] memory tags,
        string memory description,
        bool isGuidePost,
        uint256 timestamp,
        uint256 modified,
        uint256 likes,
        uint256 dislikes,
        Comment[] memory comments
    ) {
        require(index < documentCount, "Index out of bounds");
        
        fileHash = hashList[index];
        Document storage doc = documents[fileHash];
        
        return (
            fileHash,
            doc.ownerAddress,
            doc.content,
            doc.tags,
            doc.description,
            doc.isGuidePost,
            doc.timestamp,
            doc.modified,
            doc.likes,
            doc.dislikes,
            doc.comments
        );
    }

    function hasOwner(string memory file) public view returns (address) {
        return documents[keccak256(abi.encodePacked(file))].ownerAddress;
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");
        
        emit Withdrawal(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }
}