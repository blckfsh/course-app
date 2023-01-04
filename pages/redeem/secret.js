import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, } from "react";
import { useRouter } from "next/router";
import { setIntervalAsync, clearIntervalAsync } from "set-interval-async";
import moment from "moment";
import { getUserByEmail, getRedeemCodes, updateRedeemCodeToExpired } from "../api/methods/actions";
import Layout from "../../components/layout";

export default function Secret() {
    const router = useRouter();
    const { status, data } = useSession();
    const [role, setRole] = useState();

    const getRole = async (email) => {
        const action = await getUserByEmail(email);
        if (action.data.data[0].role !== "admin") router.replace("/home");
        setRole(action.data.data[0].role);
    }

    const onSignOutHandler = async () => {
        await signOut();
    }

    const getRedeems = async () => {
        const action = await getRedeemCodes();
        console.log(action);
        return action;
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                getRole(data.user.email);
                
                const timer = setIntervalAsync(async () => {
                    console.log("Firing this");
                    const redeems = await getRedeems();

                    if (redeems.length > 0) {
                        redeems.map(async (item) => {
                            if (item.isExpired == false) {
                                let updateRedeemCode = {
                                    isExpired: true
                                }

                                const action = await updateRedeemCodeToExpired(item._id, updateRedeemCode);
                                console.log(action);
                            }
                        })

                        router.replace("/home");
                    }
                }, 60000)

                
                return async () => await clearIntervalAsync(timer);                
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);

    return (
        <>
            <Layout
                onSignOutHandler={onSignOutHandler}
                role={role}
            />
            <div className="container mx-auto text-center mt-5">Fixing data...</div>
        </>
    )
}