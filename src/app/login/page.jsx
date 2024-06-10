import LoginForm from '@/components/login-form'
import Image from 'next/image'
import React from 'react'


const page = () => {
    return (
        <div className='flex h-screen w-full md:flex-row flex-col'>
            <div className="md:flex items-center justify-center h-[60vh] md:h-full w-full md:w-[54%] flex-col gap-12 py-10 md:py-28 px-4 md:px-16 divBg">
                <Image
                    src={'/images/favicon.ico'}
                    width={40}
                    alt='logo'
                    height={40}
                    className='absolute top-6 left-6'
                />
                <div className='h-full flex-1 flex flex-col gap-12'>
                    <div className="flex justify-center items-center font-poppins opacity-100 z-50 relative text-m md:text-xl">
                        <span className="text-trustgreen">Trust.&nbsp;</span>
                        <span className="text-transparencyyellow">Transparency.</span>
                        <span className="text-excellenceBlue">&nbsp;Excellence</span>
                    </div>
                    <div className="h-[60vh] md:h-[50vh] relative">

                        <Image
                            src={'/images/Image.svg'}
                            fill
                            alt=''
                        />
                    </div>
                    <div className="text-DarkBlue text-m md:text-xl px-4 md:px-20 text-center">Access Your Space: Login to your property portal.</div>
                </div>

            </div>

            <LoginForm/>

        </div>
    )
}

export default page
