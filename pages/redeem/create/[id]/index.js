import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import voucher_codes from "voucher-code-generator";
import Layout from "../../../../components/layout";
import Create from "../../../../components/redeem/create";

export default function CreateRedeem() {
    const { status, data } = useSession();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [redeemCode, setRedeemCode] = useState(" ");

    const getDetails = async (id) => {
        const action = await axios.get(`/api/user/id/${id}`);
        const { firstname, lastname, email } = action.data.data[0];

        setName(firstname + " " + lastname);
        setEmail(email);
    }

    const generateCode = async () => {
        const generate = await voucher_codes.generate({
            length: 10,
            count: 1
        });
        const newCode = {
            user_id: router.query.id,
            code: generate.toString()
        }
        const updateCode = {
            code: generate.toString(),
            isRedeemed: false,
            isExpired: false
        }
        setRedeemCode(generate.toString());
        
        const isUserExisting = await axios.get(`/api/redeem/${router.query.id}`);

        if (isUserExisting.data.data.length > 0) {
            console.log("patch");
            await axios.patch(`/api/redeem/${router.query.id}`, updateCode);                        
        } else {
            await axios.post("/api/redeem", newCode);
            console.log("post");
        }        
    }

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/signin");
        if (status === "authenticated") {
          getDetails(router.query.id)
        }
      }, [status]);

    return (
        <div>
            <Layout />
            <Create name={name} email={email} redeemCode={redeemCode} generateCode={generateCode} />
        </div>
    )
}