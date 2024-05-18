"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Button, Modal } from 'antd';

interface NavbarProps {
    cartItemCount: number;
}
interface ModalData {
    title: string;
    description: string;
    price: string;
    image: string;

}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalData, setModalData] = useState([] as ModalData[]);
    const [cartItemNumber, setCartItemNumber] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0)


    const showModal = () => {
        fetch(`${process.env.API_URL}/api/cart/get-cart-items`)
            .then((res) => res.json())
            .then((data) => {
                setModalData(data.cartItems);
                setCartItemNumber(data.cartItems.length);
                let total = 0;
            for(let i = 0; i < data.cartItems.length; i++){
                total += Number(data.cartItems[i].price)
            }
            setTotalAmount(total);
                setOpen(true);
            })
            .catch((err) => {
                console.log("error Getting The Products-->", err);
            });
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            <nav
                className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <button
                        className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                        type="button"
                        data-twe-collapse-init
                        data-twe-target="#navbarSupportedContent1"
                        aria-controls="navbarSupportedContent1"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span
                            className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                    </button>

                    <div
                        className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                        id="navbarSupportedContent1"
                        data-twe-collapse-item>
                        <Link
                            className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                            href="/">
                            <img
                                className='h-[15px]'
                                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                                alt="TE Logo"
                                loading="lazy" />
                        </Link>
                        <ul
                            className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
                            data-twe-navbar-nav-ref>
                            <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                <Link
                                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                    href="/"
                                    data-twe-nav-link-ref
                                >Home
                                </Link>
                            </li>
                            <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                <Link
                                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                    href="/product"
                                    data-twe-nav-link-ref
                                >Products
                                </Link>
                            </li>
                            <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                <Link
                                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                    href="#"
                                    data-twe-nav-link-ref
                                >Projects
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="relative flex items-center">
                        <a className="me-4 text-neutral-600 dark:text-white" href="#">
                            <span className="[&>svg]:w-5" onClick={showModal}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                </svg>
                                {cartItemNumber > 0 && (
                                    <sup className="absolute top-0 right-[66px] bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center z-50">
                                        {cartItemNumber}
                                    </sup>
                                )}
                            </span>
                            <Modal
                                title="Products"
                                open={open}
                                onOk={handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                                okText="Checkout"
                                cancelText="Close"
                            >
                                <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
                                    <ul className="flex flex-col divide-y dark:divide-gray-300">
                                        {modalData && modalData.map((item, index) => (<li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                                            <div className="flex w-full space-x-2 sm:space-x-4">
                                                <img className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={item.image} />
                                                <div className="flex flex-col justify-between w-full pb-4">
                                                    <div className="flex justify-between w-full pb-2 space-x-2">
                                                        <div className="space-y-1">
                                                            <h3 className="text-lg font-semibold leading-snug sm:pr-8">{item.title}</h3>
                                                            <p className="text-sm dark:text-gray-600">{item.description}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-semibold">{item.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>))}
                                    </ul>
                                    <div className="space-y-1 text-right">
                                        <p>Total amount:
                                            <span className="font-semibold">{totalAmount}$</span>
                                        </p>
                                        <p className="text-sm dark:text-gray-600">Not including taxes and shipping costs</p>
                                    </div>
                                </div>
                            </Modal>
                        </a>

                        <div
                            className="relative"
                            data-twe-dropdown-ref
                            data-twe-dropdown-alignment="end">
                            <a
                                className="me-4 flex items-center text-neutral-600 dark:text-white"
                                href="#"
                                id="dropdownMenuButton1"
                                role="button"
                                data-twe-dropdown-toggle-ref
                                aria-expanded="false">
                                <span className="[&>svg]:w-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor">
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <span
                                    className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
                                >1</span>
                            </a>
                            <ul
                                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                                aria-labelledby="dropdownMenuButton1"
                                data-twe-dropdown-menu-ref>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                        href="#"
                                        data-twe-dropdown-item-ref
                                    >Action</a>
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                        href="#"
                                        data-twe-dropdown-item-ref
                                    >Another action</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                        href="#"
                                        data-twe-dropdown-item-ref
                                    >Something else here</a
                                    >
                                </li>
                            </ul>
                        </div>

                        <div
                            className="relative"
                            data-twe-dropdown-ref
                            data-twe-dropdown-alignment="end">
                            <a
                                className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                                href="#"
                                id="dropdownMenuButton2"
                                role="button"
                                data-twe-dropdown-toggle-ref
                                aria-expanded="false">
                                <img
                                    src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                                    className="rounded-full j-[25px] w-[25px]"
                                    alt=""
                                    loading="lazy" />
                            </a>
                            <ul
                                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                                aria-labelledby="dropdownMenuButton2"
                                data-twe-dropdown-menu-ref>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                        href="#"
                                        data-twe-dropdown-item-ref
                                    >Action</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                        href="#"
                                        data-twe-dropdown-item-ref
                                    >Another action</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                        href="#"
                                        data-twe-dropdown-item-ref
                                    >Something else here</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
