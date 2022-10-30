import { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordStrength } from "check-password-strength";
import bcrypt from "bcryptjs";

export default function Register(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [indicator, setIndicator] = useState('');

    const onSubmit = async (data) => {
        const { firstname, lastname, email, password, confirm } = data;
        const saltRounds = 10;
        const encryptPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            firstname,
            lastname,
            email,
            password: encryptPassword
        }

        if (confirm === password) props.registerUser(newUser);
    }

    return (
        <div>
            <div className="flex">
                <div className="flex-none w-2/3">
                    <div className="flex justify-center items-center bg-[url('/image1.jpg')] bg-cover h-full">

                    </div>
                </div>
                <div className="flex-none w-1/3 flex flex-col items-center justify-center py-5">
                    <div>LOGO HERE</div>
                    <div className="mt-5 w-80">
                        <p className="text-lg font-bold">Sign Up</p>
                        <p className="text-sm">Please verify your email address, then create your account.</p>
                        <p className="text-sm font-bold">We encourage you to use a personal email address that is unlikely to change.</p>
                    </div>
                    <div className="mt-5 w-80">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                {errors.email && <span className="text-red-900 text-sm font-thin">* {errors.email.message}</span>}
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email Address"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                        {...register("email", {
                                            required: "Email is required",
                                            maxLength: {
                                                value: 100,
                                                message: "Maximum of 100 characters allowed"
                                            }
                                        })}
                                    />
                                </div>
                                <div className="mt-3">
                                    {errors.firstname && <span className="text-red-900 text-sm font-thin">* {errors.firstname.message}</span>}
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            placeholder="First Name"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                            {...register("firstname", {
                                                required: "First Name is required",
                                                maxLength: {
                                                    value: 100,
                                                    message: "Maximum of 100 characters allowed"
                                                }
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    {errors.lastname && <span className="text-red-900 text-sm font-thin">* {errors.lastname.message}</span>}
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            placeholder="Last Name"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                            {...register("lastname", {
                                                required: "Last Name is required",
                                                maxLength: {
                                                    value: 100,
                                                    message: "Maximum of 100 characters allowed"
                                                }
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className="text-sm font-bold">Your password must contain:</p>
                                    <ul className="list-disc text-sm">
                                        <li>Lowercase letters</li>
                                        <li>Uppercase letters</li>
                                        <li>Digits (0-9)</li>
                                        <li>Special characters: @ # $ % ^ & * - _ + = [] {} | \ : ' , ? / ` ~ " () ; ! .</li>
                                    </ul>
                                </div>
                                <div className="mt-3">
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
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
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
                                </div>
                                <div className="mt-3">                                    
                                    {errors.cofirm && <span className="text-red-900 text-sm font-thin">* {errors.cofirm.message}</span>}
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="password"
                                            name="confirm"
                                            id="confirm"
                                            placeholder="Confirm Password"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 resize-none"
                                            {...register("confirm", {
                                                required: "Confirm Password is required",
                                                maxLength: {
                                                    value: 100,
                                                    message: "Maximum of 100 characters allowed"
                                                }
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-center">
                                    <button type="submit" className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}