"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CardProps {
    title: string;
    description: string;
    price: string;
    image: string;
}

export const Card: React.FC<CardProps> = ({ title, description, price, image }) => {
    const notify = () => toast("Item Added To Cart!");
    async function handleAddToCart(){
        const response = await fetch(`${process.env.API_URL}/api/cart/add-to-cart`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                price,
                image
            })
        })
        const data = await response.json();
        notify();
        console.log("data from frontend-->", data);
    }

    return (
        <div>
            <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <Image
                    src={image}
                    alt="jordans"
                    height="400"
                    width="400"
                    className="object-contain"
                />
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    {title}
                </p>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {description}
                </p>
                <div className="flex flex-row justify-between">
                    <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                        <span>Buy now </span>
                        <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                            ${price}
                        </span>
                    </button>
                    <button onClick={handleAddToCart} className="rounded-full pl-4 pr-1 py-1 text-white flex justify-center items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                        <span>Add To Cart </span>
                    </button>
                </div>
            </BackgroundGradient>
            <ToastContainer />
        </div>
    );
}
