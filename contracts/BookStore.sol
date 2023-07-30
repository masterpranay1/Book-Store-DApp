// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BookStore {
    address public owner;
    uint256 public bookIdCounter;

    struct Book {
        uint256 id;
        string title;
        string author;
        uint256 price;
        uint256 stock;
    }

    mapping(uint256 => Book) public books;

    // Events
    event BookAdded(uint256 bookId);
    event BookPurchased(uint256 bookId, uint256 quantity);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        bookIdCounter = 0;
    }

    // Add a new book to the catalog
    function addBook(string memory _title, string memory _author, uint256 _price, uint256 _stock) external onlyOwner {
        bookIdCounter++;
        books[bookIdCounter] = Book(bookIdCounter, _title, _author, _price, _stock);
        emit BookAdded(bookIdCounter);
    }

    // Purchase a book
    function purchaseBook(uint256 _bookId, uint256 _quantity) external payable {
        require(_quantity > 0, "Quantity must be greater than 0");
        require(books[_bookId].id != 0, "Invalid book ID");
        require(books[_bookId].stock >= _quantity, "Insufficient stock");
        require(msg.value >= books[_bookId].price * _quantity, "Insufficient funds");

        books[_bookId].stock -= _quantity;
        emit BookPurchased(_bookId, _quantity);

        // Refund excess funds to the buyer
        if (msg.value > books[_bookId].price * _quantity) {
            payable(msg.sender).transfer(msg.value - books[_bookId].price * _quantity);
        }
    }

    // View available books
    function getBook(uint256 _bookId) external view returns (uint256, string memory, string memory, uint256, uint256) {
        require(books[_bookId].id != 0, "Invalid book ID");
        Book memory book = books[_bookId];
        return (book.id, book.title, book.author, book.price, book.stock);
    }
}
