pragma solidity ^0.6.0;

import "./ERC721Full.sol";

contract Items is ERC721Full {
    string[] public items;
    mapping(string => bool) _itemExists;

    constructor() public ERC721Full("Items", "ITEMS") {}

    function mint(string memory _item) public {
        //Require unique item
        require(!_itemExists[_item]);
        items.push(_item);
        uint256 _id = items.length - 1;
        _mint(msg.sender, _id);
        _itemExists[_item] = true;
        //Item - track
    }
}
