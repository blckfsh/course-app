import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordStrength } from "check-password-strength";
import bcrypt from "bcryptjs";

export default function ForgotPassword(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [indicator, setIndicator] = useState('');

    const onSubmit = async (data) => {
        const { password } = data;
        const saltRounds = 10;
        const encryptPassword = await bcrypt.hash(password, saltRounds);

        const updateUser = {
            email: props.email,
            password: encryptPassword
        }

        props.updatePassword(updateUser);
    }
    return (
        <div>
            <div className="flex h-screen w-screen">
                <div className="flex-none w-2/3">
                    <div className="flex justify-center items-center bg-[url('/image1.jpg')] bg-cover h-full">

                    </div>
                </div>
                <div className="flex-none w-1/3 flex flex-col items-center justify-center">
                    <div>LOGO HERE</div>
                    <div className="mt-5 w-80">
                        <p className="text-lg font-bold">Forgot Password</p>
                        <p className="text-sm">Enter your email address to receive a verification code and enter it below.</p>
                    </div>
                    <div className="mt-5 w-80">
                        <div>
                            {
                                props.isEmailLegit == false ?
                                    <div>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={props.email}
                                                onChange={(e) => props.setEmail(e.target.value)}
                                                placeholder="Email Address"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                            />
                                        </div>
                                        <div className="mt-5 flex justify-center">
                                            <a
                                                onClick={() => props.receiveVerificationCode(props.email)}
                                                className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                                                Send Code
                                            </a>
                                        </div>
                                    </div> : props.isVerified == false ?
                                        <div>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="verify"
                                                    id="verify"
                                                    value={props.code}
                                                    onChange={(e) => props.setCode(e.target.value)}
                                                    placeholder="Verify Code"
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                                />
                                            </div>
                                            <div className="mt-5 flex justify-center">
                                                <a
                                                    onClick={() => props.verifyCode(props.code)}
                                                    className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                                                    Verify Code
                                                </a>
                                            </div>
                                            <div className="border-b-2 my-5"></div>
                                        </div> : ""
                            }
                            {
                                props.isVerified == true ?
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mt-1 flex flex-col rounded-md shadow-sm">
                                            <label
                                                className={
                                                    passwordStrength(indicator).value == 'Too weak' ? "text-xs text-sm text-red-500"
                                                        : passwordStrength(indicator).value == 'Weak' ? "text-xs text-orange-500"
                                                            : passwordStrength(indicator).value == 'Medium' ? "text-xs text-yellow-550"
                                                                : "text-xs text-green-500"
                                                }>
                                                Pasword Strength: {passwordStrength(indicator).value}
                                            </label>
                                            {errors.password && <span className="text-red-900 text-sm font-thin">* {errors.password.message}</span>}
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="New Password"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                                {...register("password", {
                                                    required: "Password is required",
                                                    maxLength: {
                                                        value: 100,
                                                        message: "Maximum of 100 characters allowed"
                                                    }
                                                })}
                                                onKeyUp={(e) => {
                                                    setIndicator(e.target.value)
                                                  }}
                                            />
                                        </div>
                                        <div className="mt-5 flex justify-center">
                                            <button type="submit" className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                                                Continue
                                            </button>
                                        </div>
                                    </form> : ""
                            }
                            <div className="mt-2 flex justify-center">
                                <Link href="/">
                                    <a className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                                        Go To Login
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}