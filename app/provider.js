

"use client";
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserDetailContext } from './_context/UserDetailContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function Provider({ children }) {
    const { user } = useUser();
    const [userDetail, setUserDetail] = useState({ credits: 0 }); // Default credits to 0
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            verifyUser();
        } else {
            setLoading(false); // No user logged in
        }
    }, [user]);

    const verifyUser = async () => {
        try {
            const dataResult = await axios.post('/api/verify-user', { user });
            setUserDetail(dataResult.data.result);
            console.log("Verified user:", dataResult.data.result);
        } catch (error) {
            console.error("Error verifying user:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UserDetailContext.Provider value={{ userDetails: userDetail, setUserDetails: setUserDetail }}>
            <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
                <div>{children}</div>
            </PayPalScriptProvider>
        </UserDetailContext.Provider>
    );
}

export default Provider;
