import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import Layout from "../../../components/layout";
import CertificateComp from "../../../components/certificate";
import AdminCertificates from "../../../components/certificate/admin";
import { getCertificates, getCertsByEmail, getUserByEmail, getRedeemByUserId } from "../../api/methods/actions";

export default function Certificate({ certificates }) {
    const { status, data } = useSession();
    const router = useRouter();
    const [id, setId] = useState("");
    const [certs, setCerts] = useState([{}]);
    const [role, setRole] = useState("");
    const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);

    const getRole = async (email) => {
        const action = await getUserByEmail(email);
        setRole(action.data.data[0].role);
    }

    const onSignOutHandler = async () => {
        await signOut();
    }

    const isEmailExisting = async () => {
        const action = await getUserByEmail(data.user.email);
        setId(action.data.data[0]._id.toString());
        return action.data.data[0]._id.toString();
    }

    const isUserExisting = async () => {
        const id = await isEmailExisting();
        const callGetRedeemCode = await getRedeemByUserId(id);

        if (callGetRedeemCode.length > 0) setIsCodeRedeemed(callGetRedeemCode[0].isRedeemed);
        return callGetRedeemCode;
    }

    const getCertificatesViaEmail = async (email) => {
        const action = await getCertsByEmail(email);
        setCerts(action.data.data);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                getCertificatesViaEmail(data.user.email);
                getRole(data.user.email);
                isUserExisting();
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);


    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} isCodeRedeemed={isCodeRedeemed} id={id} role={role} />
                {
                    role == "admin" ?
                    <AdminCertificates certificates={certificates} /> : 
                    <CertificateComp name={data.user.name} certs={certs} />
                }
            </>
        )
    }

    return <div>loading</div>;
}

export async function getServerSideProps() {
    const certificates = await getCertificates();

    return {
        props: {
            certificates: certificates,
        }
    }
}