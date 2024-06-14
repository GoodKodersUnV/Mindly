"use client"
import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { IoDiamond } from "react-icons/io5";
import Script from 'next/script';
import { RxCross2 } from "react-icons/rx";

const Premium = () => {
    const secret = 22071;
    const [tokens, setTokens] = useState(5);
    let totalAmt = tokens * 5;
    let amtWithDis = totalAmt - (tokens - 1) * 2;
    const name = "kalyan";
    const email = "kalyantingani@gmail.com";
    const currency = 'INR';

    const createOrderId = async (amount: number) => {
        try {
            const response = await fetch('/api/razorpay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount * 100,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.orderId;
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };
    const processPayment = async (e: React.FormEvent<HTMLFormElement>, tokens: number, amount: number) => {
        e.preventDefault();
        try {
            const orderId: string = await createOrderId(amount);
            const options = {
                key: process.env.key_id,
                amount: amount * 100,
                currency: currency,
                name: 'name',
                description: 'description',
                order_id: orderId,
                handler: async function (response: any) {
                    const data = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        tokens,
                        amount
                    };

                    const result = await fetch('/api/verify', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const res = await result.json();
                    if (res.isOk) alert("payment succeed");
                    else {
                        alert(res.message);
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                },
                theme: {
                    color: '#FEEBC8',
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response: any) {
                alert(response.error.description);
            });
            paymentObject.open();
        } catch (error) {
            console.log(error);
        }
    };
    const handleBasic = (e: any) => {
        processPayment(e, tokens, (tokens * 5 - (tokens - 1) * 2));
    }
    const handleBulk = (e: any) => {
        processPayment(e, 20, 50);
    }
    const handlePremium = (e: any) => {
        processPayment(e, secret, 200);
    }

    const handleTokenChange = (e: any) => {
        const value = parseInt(e.target.value);
        if (value < 1) {
            setTokens(1);
        } else if (value >= 10000) {
            setTokens(10000);
        } else {
            setTokens(value);
        }
    }


    return (
        <>
            {/* <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            /> */}

            <div className="flex justify-center items-center w-full h-screen gap-20 bg-stone-800">
                <div className="bg-orange-400 p-1 rounded-[50px] w-[35%]">
                    <div className="bg-orange-600 p-1 rounded-[50px]">
                        <div className="flex flex-col gap-3 bg-orange-200 rounded-[50px] p-5">
                            <div className="bg-white rounded-[40px] p-1">
                                <div className="flex px-6 h-[60px] justify-between items-center bg-orange-300 text-black rounded-[40px]"> 
                                    <div className="flex items-center gap-1"><FaHeart className="h-6 w-6 text-red-500"/><RxCross2 className="h-5 w-5"/> 1</div>
                                    <div className="flex items-center gap-1"><Image src="/diamond.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 1</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[40px] p-1">
                                <div className="flex px-6 h-[60px] justify-between items-center bg-orange-300 text-black rounded-[40px]"> 
                                    <div className="flex items-center gap-1"><FaHeart className="h-6 w-6 text-red-500"/><RxCross2 className="h-5 w-5"/> 2</div>
                                    <div className="flex items-center gap-1"><Image src="/diamond.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 2</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[40px] p-1">
                                <div className="flex px-6 h-[60px] justify-between items-center bg-orange-300 text-black rounded-[40px]"> 
                                    <div className="flex items-center gap-1"><FaHeart className="h-6 w-6 text-red-500"/><RxCross2 className="h-5 w-5"/> 3</div>
                                    <div className="flex items-center gap-1"><Image src="/diamond.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 3</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[40px] p-1">
                                <div className="flex px-6 h-[60px] justify-between items-center bg-orange-300 text-black rounded-[40px]"> 
                                    <div className="flex items-center gap-1"><FaHeart className="h-6 w-6 text-red-500"/><RxCross2 className="h-5 w-5"/> 4</div>
                                    <div className="flex items-center gap-1"><Image src="/diamond.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 4</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[40px] p-1">
                                <div className="flex px-6 h-[60px] justify-between items-center bg-orange-300 text-black rounded-[40px]"> 
                                    <div className="flex items-center gap-1"><FaHeart className="h-6 w-6 text-red-500"/><RxCross2 className="h-5 w-5"/> 5</div>
                                    <div className="flex items-center gap-1"><Image src="/diamond.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 5</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-orange-400 p-1 rounded-[50px] w-[35%]">
                    <div className="bg-orange-600 p-1 rounded-[50px]">
                        <div className="flex flex-col gap-3 bg-orange-200 rounded-[50px] p-5">
                            <div className="bg-white rounded-[40px] p-1">
                                <div className="flex px-6 h-[60px] justify-between items-center bg-orange-300 text-black rounded-[40px]"> 
                                    <div className="flex items-center gap-1"><Image src="/coin.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 1</div>
                                    <div className="flex items-center gap-1"><Image src="/diamond.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 1</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[40px] p-1">
                                <div className="flex px-6 h-[60px] justify-between items-center bg-orange-300 text-black rounded-[40px]"> 
                                    <div className="flex items-center gap-1"><Image src="/coin.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 2</div>
                                    <div className="flex items-center gap-1"><Image src="/diamond.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 2</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[40px] p-1">
                                <div className="flex px-6 h-[60px] justify-between items-center bg-orange-300 text-black rounded-[40px]"> 
                                    <div className="flex items-center gap-1"><Image src="/coin.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 3</div>
                                    <div className="flex items-center gap-1"><Image src="/diamond.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 3</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[40px] p-1">
                                <div className="flex px-6 h-[60px] justify-between items-center bg-orange-300 text-black rounded-[40px]"> 
                                    <div className="flex items-center gap-1"><Image src="/coin.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 4</div>
                                    <div className="flex items-center gap-1"><Image src="/diamond.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 4</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-[40px] p-1">
                                <div className="flex px-6 h-[60px] justify-between items-center bg-orange-300 text-black rounded-[40px]"> 
                                    <div className="flex items-center gap-1"><Image src="/coin.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 5</div>
                                    <div className="flex items-center gap-1"><Image src="/diamond.png" width={25} height={25} alt="diamond" /><RxCross2 className="h-5 w-5"/> 5</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
};

export default Premium;