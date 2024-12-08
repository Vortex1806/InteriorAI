"use client";
import { UserDetailContext, userDetails } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

function BuyCredits() {
    const creditOption = [
        { credits: 5, amount: 0.99 },
        { credits: 10, amount: 1.99 },
        { credits: 25, amount: 3.99 },
        { credits: 50, amount: 6.99 },
        { credits: 100, amount: 13.99 },
    ];

    const [selectedOption, setSelectedOption] = useState(null); // Initialize as null or {}
    const { userDetails, setUserDetails } = useContext(UserDetailContext);
    const router = useRouter();
    const onPaymentSuccess = async () => {
        console.log("payment success");
        //update user credits in db
        if (!userDetails) {
            return <p>Loading user details...</p>;
        }
        console.log("userDetails.credits:", userDetails?.credits);
        console.log("selectedOption.credits:", selectedOption?.credits);

        const result = await db.update(Users).set({ credits: userDetails?.credits + selectedOption?.credits }).returning(
            { id: Users.id }
        );
        if (result) {
            setUserDetails(prev => ({
                ...prev,
                credits: userDetails?.credits + selectedOption?.credits
            }))
            router.push('/dashboard');
        }
    }
    return (
        <div>
            <h2 className="font-bold text-2xl">Buy More Credits</h2>
            <p>Unlock endless possibilities - Buy more credits and transform</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
                {creditOption.map((item, index) => (
                    <div
                        key={index} // Add key prop
                        className={`flex flex-col gap-2 justify-center items-center shadow-md border rounded-lg p-5 ${selectedOption?.credits === item.credits ? "border-primary" : "border-transparent"
                            }`}

                    >
                        <h2 className="font-bold text-3xl">{item.credits}</h2>
                        <h2 className="font-medium text-xl">Credits</h2>
                        <Button className="w-full" onClick={() => setSelectedOption(item)}>
                            Select
                        </Button>
                        <h2 className="font-medium text-primary">${item.amount}</h2>
                    </div>
                ))}
            </div>
            <div>
                {selectedOption?.amount &&
                    <PayPalButtons style={{ layout: "horizontal" }}
                        onApprove={() => onPaymentSuccess()}
                        onCancel={() => console.log("Payment Unsuccessful")}
                        createOrder={(data, actions) => {
                            return actions?.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: selectedOption?.amount?.toFixed(2),
                                            currency_code: 'USD'
                                        }
                                    }
                                ]
                            })
                        }}
                    />
                }
            </div>
        </div>
    );
}

export default BuyCredits;
