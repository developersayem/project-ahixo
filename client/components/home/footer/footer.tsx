/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" bg-neutral-900 text-white">
      <div className="">
        {/* Top Section */}
        <div className="border-b border-neutral-700 container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Logo and Tagline */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center">
                <div className="flex items-center ">
                  <div className="text-xl font-bold">
                    <img
                      src="/logos/ahixo-logo.webp"
                      alt="AHIXO"
                      width={150}
                      height={50}
                    />
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                A multi-vendor eCommerce platform
              </p>
            </div>

            {/* Social Media and Mobile Apps */}
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Follow Us */}
              <div>
                <h3 className="text-gray-400 font-semibold mb-4">FOLLOW US</h3>
                <div className="flex gap-3">
                  <Link
                    href="#"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-gray-400 font-semibold mb-6">QUICK LINKS</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Support Policy Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Return Policy Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Policy Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Seller Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Term Conditions Page
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="text-gray-400 font-semibold mb-6">CONTACTS</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-white font-medium mb-1">Address</h4>
                  <p className="text-gray-300">Demo Address</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <p className="text-gray-300">123456789</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <p className="text-gray-300">demo.example@gmail.com</p>
                </div>
              </div>
            </div>

            {/* My Account */}
            <div>
              <h3 className="text-gray-400 font-semibold mb-6">MY ACCOUNT</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    My Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Be an affiliate partner
                  </Link>
                </li>
              </ul>
            </div>

            {/* Seller Zone & Delivery Boy */}
            <div>
              <h3 className="text-gray-400 font-semibold mb-6">SELLER ZONE</h3>
              <ul className="space-y-3 mb-6 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Become A Seller{" "}
                    <span className="text-yellow-400 font-medium">
                      Apply Now
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Login to Seller Panel
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Download Seller App
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                Copyright © 2025 all rights reserved by{" "}
                <span className="text-brand-400 font-bold">AHIXO</span>
              </p>
              <div className="flex items-center gap-2 bg-neutral-50 px-3">
                <img
                  src="https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/NankP5emHOKcdCWqX6Bks1Qa63iDgoLA6WPGn7oe.webp"
                  alt="Visa"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
