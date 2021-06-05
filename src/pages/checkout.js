import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import {selectItems, selectTotal} from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto text-w">
        {/*    left*/}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width="1020"
            height="250"
            objectFit="contain"
          />
          <div className="flex flex-col p-5 spay-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your amazon basket is empty"
                : "shopping basket"}
            </h1>
            {items.map((items, i) => (
              <CheckoutProduct
                key={i}
                id={items.id}
                title={items.title}
                rating={items.rating}
                price={items.price}
                description={items.description}
                category={items.category}
                image={items.image}
                hasPrime={items.hasPrime}
              />
            ))}
          </div>
        </div>
        {/*    right*/}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items): {" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="EUR" />
                </span>
              </h2>

              <button
                  disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
