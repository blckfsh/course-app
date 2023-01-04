import Link from "next/link";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon, Bars4Icon, UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navigation(props) {

    const navigation = [
        { name: 'Home', href: '/home', current: true },
        { name: 'Cyber Range', href: '/cyber', current: false },
        { name: 'Training Materials', href: '/training', current: false },
        { name: 'Redeem Access Keys', href: `/access/${props.id}`, current: false },
        { name: 'Digital Certificate', href: '/certificate', current: false }
    ]
    
    const adminNavigation = [
        { name: 'Home', href: '/home', current: true },
        { name: 'Manage Cyber Range', href: '/cyber', current: false },
        { name: 'Manage Training Materials', href: '/training', current: false },
        { name: 'Manage Redeem', href: '/redeem/secret', current: false },
        { name: 'Manage Digital Certificate', href: '/certificate', current: false }
    ]

    return (
        <Disclosure as="nav" className="bg-slate-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars4Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center lg:visible md:visible invisible">
                                    <Image src="/synx-system-logo.png" width={80} height={30} />
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {
                                            props.role == "student" ?
                                            navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}                                            
                                                >
                                                    <a
                                                        className={classNames(
                                                            item.current ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white',
                                                            'px-3 py-2 rounded-md text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}                                                    
                                                    >
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            )) : ""
                                        }
                                        {
                                            props.role === "admin" ?
                                            adminNavigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}                                            
                                                >
                                                    <a
                                                        className={classNames(
                                                            item.current ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white',
                                                            'px-3 py-2 rounded-md text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}                                                    
                                                    >
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            )) : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center content-between pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="mr-2">
                                    <a onClick={() => props.onSignOutHandler()} target="_blank" rel="noreferrer" className="flex py-2 px-2 cursor-pointer rounded-lg font-bold text-white bg-slate-900" alt="Go to Repository">
                                        <ArrowRightOnRectangleIcon className="block h-6 w-6 mr-4" aria-hidden="true" />
                                        Sign out
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}