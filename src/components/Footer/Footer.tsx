import React from "react";


export function FooterBlock() {
    return (
        <footer className="w-full bg-gray-800 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-bold text-gray-100 mb-2">Your Company</h2>
                    <p className="text-gray-400 text-sm">
                        Providing quality services since 2020. We help businesses achieve their goals.
                    </p>
                </div>

                <div className="flex space-x-6">
                    <a href="https://facebook.com" className="text-gray-400 hover:text-blue-600">
                        <i className="fab fa-facebook-f"></i> Facebook
                    </a>
                    <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400">
                        <i className="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700">
                        <i className="fab fa-linkedin-in"></i> LinkedIn
                    </a>
                </div>

                <div className="flex flex-col items-center md:items-end">
                    <p className="text-gray-400 text-sm">
                        © 2025 Your Company. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-2">
                        <a href="/privacy" className="text-gray-400 hover:text-gray-100">Privacy Policy</a>
                        <a href="/terms" className="text-gray-400 hover:text-gray-100">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
