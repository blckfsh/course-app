import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import Layout from "../../components/layout";
import CertificateComp from "../../components/certificate";
import { getCertsByEmail } from "../api/methods/actions";

export default function Certificate() {
    const { status, data } = useSession();
    const router = useRouter();
    const [certs, setCerts] = useState([{}]);

    const onSignOutHandler = async () => {
        await signOut();
    }

    const getCertificates = async (email) => {
        const action = await getCertsByEmail(email);
        setCerts(action.data.data);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") getCertificates(data.user.email);
        } catch (error) {
            console.log(error);
        }
    }, [status]);


    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} />
                <CertificateComp name={data.user.name} certs={certs} />                           
            </>
        )
    }

    return <div>loading</div>;
}