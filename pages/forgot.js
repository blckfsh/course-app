import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import voucher_codes from "voucher-code-generator";
import ForgotPassword from "../components/forgot";

export default function Forgot() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isEmailLegit, setIsEmailLegit] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const isUserHasCode = async (email) => {
        const action = await axios.get(`/api/auth/verify/email/${email}`);

        return action.data.code;
    }

    const receiveVerificationCode = async (value) => {
        const isCodeForUserExists = await isUserHasCode(value);
        const generate = await voucher_codes.generate({
            length: 10,
            count: 1
        });
        
        if (isCodeForUserExists.length > 0) {
            const updateCode = {
                email: value,
                code: generate.toString(),
                isVerified: false
            }
            console.log("patch");
            const action = await axios.patch(`/api/auth/verify/email/${value}`, updateCode);
            console.log(action);
        } else {
            const newCode = {
                email: value,
                code: generate.toString()
            }
            const action2 = await axios.post(`/api/auth/verify/${generate.toString()}`, newCode);
            console.log(action2);
        }
        setIsEmailLegit(true);
    }

    const verifyCode = async (value) => {
        const action = await axios.get(`/api/auth/verify/${value}`);

        if (action.data.content.length > 0) {
            const emailAddress = action.data.content[0].email;
            const { code, isVerified } = action.data.content[0];

            console.log(code);
            console.log(value);

            if (isVerified == false) {
                if (emailAddress == email && code == value) {
                    console.log("working");
                    setIsVerified(true);

                    let updatedCode = {
                        isVerified: true
                    }
                    let action2 = await axios.patch(`/api/auth/verify/${value}`, updatedCode);
                    if (action2.status == 201) setIsVerified(true)
                }
            }
        } else {
            console.log("Incorrect Code");
        }
    }

    const updatePassword = async (user) => {
        const isUserExisting = await axios.get(`/api/user/${user.email}`);

        if (isUserExisting.data.data.length = []) {
            const action = await axios.patch(`/api/user/${user.email}`, user);

            if (action.status == 201) {
                console.log("Successfully updated"); 
                router.replace("/signin");
            }
        }
    }

  return (
    <div>
    <ForgotPassword 
        isEmailLegit={isEmailLegit}
        email={email}
        setEmail={setEmail}
        code={code}
        setCode={setCode}
        receiveVerificationCode={receiveVerificationCode} 
        updatePassword={updatePassword}
        verifyCode={verifyCode}
        isVerified={isVerified}
    />
    </div>
  )
}
