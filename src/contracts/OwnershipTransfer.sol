pragma solidity ^0.7.5;

contract Factory {
    
    Product[] public productList;
    
    address public admin;
    
    constructor(){
        admin = msg.sender;
    }
    
    //Create child product contracts.
    function create(string memory _desc) public {
        Product prod = new Product(_desc, admin);
        productList.push(prod);
    }
    
}

contract Product {
    string public itemDesc;
    address public owner;
    
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);
    
    constructor(string memory _itemDesc, address _owner) payable {
        itemDesc = _itemDesc;
        owner = _owner;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the product owner.");
        _;
    }
    
    //Transfer Ownership to new Owner
    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0));
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
    
}