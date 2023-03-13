import Navbar from './Navbar'
import Footer from './Footer'
import Meta from './Meta'

export default function Component({ children }: { children: any }) {
    return (
        <div className='min-h-screen flex flex-col overflow-hidden'>
            <Meta />
            <Navbar />
            <div className='overflow-y-auto flex flex-grow flex-col justify-between h-0 bg-slate-300 bg-cover bg-center'>
                <div className='flex flex-grow flex-col justify-between w-full bg-lightestblue/60'>
                    <div className='px-10 pt-10 pb-10 mx-auto container max-w-6xl'>
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
