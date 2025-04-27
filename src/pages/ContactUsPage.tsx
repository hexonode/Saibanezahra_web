import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Mail, Phone, Home } from 'lucide-react';
import Header from '../components/Header';

const ContactUsPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto text-center mb-10">
                        <h1 className="text-4xl font-bold text-lime-800 mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-gray-700">
                            Have questions about the Ramzan exam? Get in touch with us!
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mb-10">
                        <div className="grid gap-6">
                            {/* WhatsApp Group Link */}
                            <a
                                href="https://chat.whatsapp.com/D4VrNKPkjkv68lFY1DOvbL"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-5 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 border border-green-200"
                            >
                                <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <MessageSquare className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800">WhatsApp Group</h3>
                                    <p className="text-gray-600">Join our WhatsApp group for regular updates and announcements</p>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:Killerlandop12@gmail.com"
                                className="flex items-center p-5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 border border-blue-200"
                            >
                                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <Mail className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                                    <p className="text-gray-600">Killerlandop12@gmail.com</p>
                                </div>
                            </a>

                            {/* Phone */}
                            <a
                                href="tel:+92 0308000298"
                                className="flex items-center p-5 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 border border-purple-200"
                            >
                                <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <Phone className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                                    <p className="text-gray-600">+92 0308000298</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-full font-medium transition duration-300"
                        >
                            <Home className="h-5 w-5 mr-2" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default ContactUsPage; 