import React from "react";
import { FaTwitter, FaFacebook, FaTiktok, FaGithub } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  return (
    <div className="rounded-div mb-2">
      <div className="grid md:grid-cols-2 text-primary max-w-[1200px] mx-auto mt-5">
        <div className="flex md:justify-between justify-evenly w-full md:max-w-[300px] uppercase">
          <div>
            <h2 className="font-bold">Support</h2>
            <ul className="text-sm">
              <li className="py-2">Help Center</li>
              <li className="py-2">Contact Us</li>
              <li className="py-2">API Status</li>
              <li className="py-2">Documentation</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold">Info</h2>
            <ul className="text-sm">
              <li className="py-2">About Us</li>
              <li className="py-2">Careers</li>
              <li className="py-2">Invest</li>
              <li className="py-2">Legal</li>
            </ul>
          </div>
        </div>

        <div className="text-right w-full flex justify-end">
          <div className="w-full md:max-w-[300px] py-4">
            <div className="flex justify-center md:justify-end py- md:py-0 pb-4">
              <ThemeToggle />
            </div>
            <p className="text-center md:text-right">SignUp for Crypto News</p>
            <div className="py-4">
              <form>
                <input
                  className="bg-primary border border-input p-2 mr-2 w-full shadow-xl rounded-2xl md:w-auto"
                  type="email"
                  placeholder="Enter Your Email"
                />
                <button className="bg-button text-btnText p-2 w-full rounded-2xl shadow-xl md:w-auto my-2 md:my-0">
                  SignUp
                </button>
              </form>
            </div>
            <div className="flex justify-between text-accent">
              <AiOutlineInstagram />
              <FaFacebook />
              <FaTwitter />
              <FaTiktok />
              <FaGithub />
            </div>
          </div>
        </div>
      </div>
      <p className="text-center pt-7">Powered By Coin Gecko</p>
    </div>
  );
};

export default Footer;
