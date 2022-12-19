import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserByEmail, updateDigitalCertificate } from "../../api/methods/actions";
import Layout from "../../../components/layout";
import Confirm from "../../../components/certificate/confirm";

export default function ConfirmCertificate({ certificate }) {
    const { status, data } = useSession();
    const router = useRouter();
    const [id, setId] = useState("");
    const [certId, setCertId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [awardedOn, setAwardedOn] = useState("");
    const [expiredOn, setExpiredOn] = useState("");
    // const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
    const [role, setRole] = useState("");

    const getRole = async (email) => {
        const action = await getUserByEmail(email);
        setId(action.data.data[0]._id.toString());
        setRole(action.data.data[0].role);
        setName(action.data.data[0].firstname + " " + action.data.data[0].lastname);
        setEmail(action.data.data[0].email);
        return action.data.data[0];
    }

    const onSignOutHandler = async () => {
        await signOut();
    }

    const updateDigitalCertificateById = async (id, certificate) => {
        const action = await updateDigitalCertificate(id, certificate);
        console.log(action);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                // isUserExisting();
                getRole(data.user.email);  
                setCertId(router.query.id);              
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);

    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} role={role} id={id} />
                <Confirm
                    certId={certId}
                    name={name}
                    email={email} 
                    awardedOn={awardedOn}
                    expiredOn={expiredOn}
                    setAwardedOn={setAwardedOn}
                    setExpiredOn={setExpiredOn}
                    updateDigitalCertificateById={updateDigitalCertificateById}
                />
            </>
        )
    }

    return <div>loading</div>;
}