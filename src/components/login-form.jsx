"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { loginUser } from '@/lib/helpers'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData);
        if(!new RegExp(/^[a-z0-9._-]+@propvivo.com$/i).test(email)) {
            setErrMessage("Use your propvivo email address")
        return
        }

        console.log(email, password);
        setLoading(true)
        const data = await loginUser(email.toLowerCase(), password);
        setLoading(false)
        if (data.statusCode === 200) {
            console.log(data)
            localStorage.setItem('token', JSON.stringify(data.authResult.token));
            router.replace('/',{scroll:false})
        } else {
            setErrMessage("Invalid credentials")
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrMessage('')
        }, 2500);
        return () => clearTimeout(timeout)
    }, [errMessage])

    return (
        <div className='flex items-center justify-center md:h-full lg:px-12 px-6 flex-auto py-6'>
            <div className='flex flex-col gap-2 px-8 lg:px-12 md:py-16 py-8 border border-[rgb(139,195,241)]/30 rounded-2xl w-full min-w-[300px] md:max-w-[400px]'>
                <div>
                    <img src={"/images/favicon.ico"} alt="" className='w-10 ' />
                </div>
                <h1 className="text-2xl font-medium ">Hello! Welcome Back</h1>
                <h2 className="text-sm text-[#787878] font-medium">
                    Login using your credentials
                </h2>
                <form onSubmit={onSubmit} className="w-full ">
                    <div className="mb-2">
                        <div className="flex flex-col gap-1 w-full mb-1">
                            <div className="text-gray-700 flex items-center justify-between text-sm">
                                <div className="text-gray-600 font-medium tracking-[0.5px]">E-mail<span className="text-red-500"> *</span>
                                </div>
                            </div>
                            <div className="mb-2 text-center">
                                <div className="flex border relative focus-within:outline-none focus-within:shadow-input-ring outline-none rounded-lg shadow-sm border-gray-o-400 false">
                                    <input type="email" name="email" placeholder="Your Email address" className="relative icon py-2 px-4 pr-7 border-none outline-none ring-0 focus:ring-0 text-sm rounded-lg block w-full p-1 bg-gray-300 text-black" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full mb-1">
                        <div className="text-gray-700 flex items-center justify-between text-sm">
                            <div className="text-gray-600 font-medium tracking-[0.5px]">Password<span className="text-red-500"> *</span>
                            </div>
                        </div>
                        <div className="mb-2 text-center">
                            <div className="flex border relative focus-within:outline-none focus-within:shadow-input-ring outline-none rounded-lg shadow-sm border-gray-o-400 false">
                                <input type={showPassword ? "text" : "password"} required name="password" placeholder="**********" className="relative icon py-2 px-4 pr-7 border-none outline-none ring-0 focus:ring-0 text-sm rounded-lg block w-full p-1 bg-gray-300 text-black" />
                                <div className="cursor-pointer p-2 flex justify-center items-center rounded-r-md absolute right-0 top-0 bottom-0 h-full">
                                    <button type='button' onClick={() => setShowPassword(!showPassword)}>
                                        {!showPassword ? <FaEyeSlash color="#000" /> :
                                            <FaEye color="#000" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {errMessage && <p className='text-red-600'>{errMessage}</p>}
                    <div className="block text-sm text-pvBlue hover:underline font-medium text-right">
                        <Link href="/forgot-password">Forgot Password?</Link>
                    </div>

                    <button
                        disabled={loading}
                        className="inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all duration-150 ease-linear outline-none bg-[#2e94ea] hover:bg-[#2e94ea]/85 focus:outline-none cursor-pointer text-sm px-6 md:px-9 h-10 py-2 rounded-md w-full my-5"
                        type="submit"
                    >
                        {loading ? <div role="status">
                            <svg aria-hidden="true" className="w-4 h-4 mx-1 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div> : "Login"}
                    </button>

                    <div className="text-center text-sm">New User? <span className="text-pvBlue cursor-pointer hover:underline">
                        <Link href="/register">Register Here</Link>
                    </span>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default LoginForm
