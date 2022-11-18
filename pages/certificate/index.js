import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import Layout from "../../components/layout";
import CertificateComp from "../../components/certificate";
import { getCertsByEmail, getUserByEmail, getRedeemByUserId } from "../api/methods/actions";

export default function Certificate() {
    const { status, data } = useSession();
    const router = useRouter();
    const [certs, setCerts] = useState([{}]);
    const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);

    const onSignOutHandler = async () => {
        await signOut();
    }

    const isEmailExisting = async () => {
        const action = await getUserByEmail(data.user.email);
        return action.data.data[0]._id.toString();
    }

    const isUserExisting = async () => {
        const id = await isEmailExisting();
        const callGetRedeemCode = await getRedeemByUserId(id);

        if (callGetRedeemCode.length > 0) setIsCodeRedeemed(callGetRedeemCode[0].isRedeemed);
        return callGetRedeemCode;
    }

    const getCertificates = async (email) => {
        const action = await getCertsByEmail(email);
        setCerts(action.data.data);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                getCertificates(data.user.email);
                isUserExisting();
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);


    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} isCodeRedeemed={isCodeRedeemed} />
                <CertificateComp name={data.user.name} certs={certs} />                           
            </>
        )
    }

    return <div>loading</div>;
}