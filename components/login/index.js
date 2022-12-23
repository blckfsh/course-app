import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Login(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });



        if (res.status == 200) {
            router.replace("/home");
        } else {
            props.errorMessage();
        }
    }

    return (
        <div>
            <div className="flex lg:flex-row flex-col">
                <div className="flex-none lg:w-2/3 w-full">
                    <div className="flex justify-center items-center bg-[url('/image1.jpg')] bg-cover lg:h-screen md:py-5">
                        <div className="w-2/3 bg-cyan-500 opacity-80 rounded-2xl p-5 text-white">
                            <strong className="text-2xl">Access all your <strong>SYNCX</strong> accounts</strong>
                            <p className="mt-2">Welcome to <strong>SynTechNX</strong> learning management platform (SYCNX) where you can
                                access all your training material, simulation do assessment and receive your
                                digital certificate.</p>
                            <p className="mt-2 mb-5">If you do not already have <strong>SYCNX</strong> account, please sign up now
                                button below.</p>
                            <div className="flex justify-center">
                                <Link href="/signup">
                                    <a className="rounded-3xl border-2 border-white py-2 px-3">Sign up now</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-none lg:w-1/3 w-full flex flex-col items-center justify-center md:mt-5">
                    <div>
                        <Image src="/synx-system-logo.png" width={200} height={100} />
                    </div>
                    <div className="mt-5">
                        <p>Dont have an account? <Link href="/signup"><a className="text-blue-800 font-semibold">Sign up now</a></Link></p>
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
                                        />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Link href="/forgot">
                                        <a className="text-blue-800 font-semibold">Forgot Password</a>
                                    </Link>
                                </div>
                                <div className="mt-5 flex justify-center">
                                    <button type="submit" className="flex w-full justify-center align-center py-2 text-white font-semibold text-lg bg-cyan-700 hover:bg-cyan-800">
                                        Sign in
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