"use client";
import { useState, useEffect } from "react";
import atm_abi from "../artifacts/contracts/BookStore.sol/BookStore.json";
import { ethers } from "ethers";

const usePurchase = (contract: any) => {
  async function purchaseBook(bookId: any, quantity: any) {
    try {
      //@ts-ignore
      await window.ethereum.enable();
      const transaction = await contract.purchaseBook(bookId, quantity, {
        value: ethers.utils.parseEther("100"),
      });

      const receipt = await transaction.wait();

      console.log("Book purchased:", receipt);
      alert("Book purchased successfully!");
    } catch (error) {
      console.error("Error purchasing book:", error);
      alert("Error purchasing book. Check the console for details.");
    }
  }

  return purchaseBook;
};

const useAddBook = (contract: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const addBook = async (title: any, author: any, price: any, stock: any) => {
    try {
      setIsLoading(true);
      await contract.addBook(title, author, price, stock);
      setIsLoading(false);

      alert("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      setIsLoading(false);
    }
  };

  return { addBook, isLoading };
};

const useGetBook = (contract: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const getBook = async (bookId: any) => {
    console.log(bookId);
    try {
      setIsLoading(true);
      console.log('abcd');
      const book = await contract.getBook(bookId);
      setIsLoading(false);
      console.log("Book details:", book);
      return {
        title: book[1],
        author: book[2],
        price: ethers.utils.formatEther(book[3]),
        stock: (ethers.utils.formatEther(book[4]) as unknown) as number * 1e18,
      };
    } catch (error) {
      console.error("Error getting book:", error);
      setIsLoading(false);
    }
  };

  return { isLoading, getBook };
};

export default function Home() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = atm_abi.abi;

  const [contract, setContract] = useState<any>(null);

  const connectToContract = async () => {
    try {
      //@ts-ignore
      await window.ethereum.enable();

      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contract);
      console.log("Contract connected!");
    } catch (error) {
      console.error("Error connecting to the contract:", error);
    }
  };

  const purchaseBook = usePurchase(contract);
  const { addBook, isLoading } = useAddBook(contract);
  const { isLoading: isBookLoading, getBook } = useGetBook(contract);

  const [bookIdPurchase, setBookIdPurchase] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [bookDataAdd, setBookDataAdd] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
  });

  const [bookDataGet, setBookDataGet] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
  });

  const [bookIdGet, setBookIdGet] = useState(0);

  const handleBookIdGetChange = (e: any) => {
    setBookIdGet(e.target.value);
  };

  const handleBookIdPurchaseChange = (e: any) => {
    setBookIdPurchase(e.target.value);
  };

  const handleQuantityChange = (e: any) => {
    setQuantity(e.target.value);
  };

  const bookDataAddChange = (e: any) => {
    setBookDataAdd({
      ...bookDataAdd,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen px-24 py-12 flex flex-col">
      <h1 className="text-5xl font-bold w-full text-center pb-8 mb-8 text-blue-500 border-b">Book Store</h1>

      {
        //@ts-ignore
        !contract && 
        (
          <button
            onClick={connectToContract}
            className="btn btn-primary mt-8 mx-auto"
          >
            Connect to Contract
          </button>
        )
      }

      { 
        //@ts-ignore
        contract &&
        (<div className="flex flex-wrap gap-8 mt-4">
        <div className="flex flex-col border p-4 gap-4 rounded-lg">
          <label htmlFor="bookId">Book ID:</label>
          <input
            type="number"
            id="bookId"
            value={bookIdPurchase}
            className="input input-bordered w-full max-w-xs"
            onChange={handleBookIdPurchaseChange}
          />
          <label htmlFor="quantity">Quantity:</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button
            onClick={async () => {
              await purchaseBook(bookIdPurchase, quantity);
            }}
            className="btn btn-primary mt-4"
          >
            Purchase
          </button>
        </div>
        <div className="flex flex-col border p-4 gap-4 rounded-lg">
          <label htmlFor="title">Title:</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            id="title"
            value={bookDataAdd.title}
            onChange={bookDataAddChange}
          />
          <label htmlFor="author">Author:</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            id="author"
            value={bookDataAdd.author}
            onChange={bookDataAddChange}
          />
          <label htmlFor="price">Price:</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="number"
            id="price"
            value={bookDataAdd.price}
            onChange={bookDataAddChange}
          />
          <label htmlFor="stock">Stock:</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="number"
            id="stock"
            value={bookDataAdd.stock}
            onChange={bookDataAddChange}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              addBook(
                bookDataAdd.title,
                bookDataAdd.author,
                bookDataAdd.price,
                bookDataAdd.stock
              );
            }}
          >
            Add Book
          </button>
        </div>

        <div className="p-4 border rounded-lg w-1/3">

          <div className="w-full flex flex-col gap-4">
            <label htmlFor="bookId">Book ID:</label>
            <input
              type="number"
              id="bookId"
              value={bookIdGet}
              onChange={handleBookIdGetChange}
              className="input input-bordered w-full"
            />
            <button
              onClick={async () => {
                try {
                  const book = await getBook(bookIdGet);
                  setBookDataGet({
                    title: book?.title,
                    author: book?.author,
                    price: book?.price.toString() as string,
                    stock: book?.stock.toString() as string,
                  });
                } catch(err) {
                  console.log(err);
                }
              }}
              className="btn btn-primary"
            >
              Get Book
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <h2 className="text-xl">Book Details</h2>
            {isBookLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <p>Title: {bookDataGet?.title}</p>
                <p>Author: {bookDataGet?.author}</p>
                <p>Price: {bookDataGet?.price}</p>
                <p>Stock: {bookDataGet?.stock}</p>
              </div>
            )}
          </div>
        </div>
      </div>)}
    </main>
  );
}
