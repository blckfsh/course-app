import { useState } from "react";
import axios from "axios";
import voucher_codes from "voucher-code-generator";
import Register from "../components/register";

export default function Signup() {
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
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

    const registerUser = async (user) => {
        const isUserExisting = await axios.get(`/api/user/${user.email}`);

        if (isUserExisting.data.data.length = []) {
            const action = await axios.post("/api/user", user);

            console.log(action);
        }
    }

    return (
        <Register
            email={email}
            setEmail={setEmail}
            code={code}
            isEmailLegit={isEmailLegit}
            isVerified={isVerified}
            setCode={setCode}
            registerUser={registerUser}
            receiveVerificationCode={receiveVerificationCode}
            verifyCode={verifyCode}            
        />
    )
}