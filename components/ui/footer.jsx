import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-gray-100 border-t">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <img
                            className="h-10"
                            src="/logo.svg"
                            alt="Company name"
                        />
                        <p className="text-gray-500 text-base">
                            Making the world a better place through AI-powered interior design.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-base font-medium text-gray-900">Solutions</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Room Design
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Home Interior
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Commercial Spaces
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            AI Consultation
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-base font-medium text-gray-900">Support</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Pricing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Documentation
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Guides
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            API Status
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-base font-medium text-gray-900">Company</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Press
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Partners
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-base font-medium text-gray-900">Legal</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Claim
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Privacy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                            Terms
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">
                        &copy; 2024 VortexAi.in, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}