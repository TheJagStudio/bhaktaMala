import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import InstallButton from "./InstallButton";

const Navbar = ({ swiper, active, setActive }) => {
    return (
        <div className="shadow-lg z-50 fixed w-full">
            <div className="bg-orange-400 text-white p-4 text-lg flex justify-between items-center ">
                <NavLink to={"/"} className="font-bold text-xl">
                    Bhaktamala
                </NavLink>
                <div className="flex gap-3">
                    <NavLink to={"/search"} className="bg-white text-orange-500 hover:text-white shadow-inner hover:shadow-lg shadow-black/30 hover:shdow-white/30 hover:bg-blue-500 rounded-md p-1.5">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
                        </svg>
                    </NavLink>
                    <NavLink to={"/add"} className="bg-white text-orange-500 group hover:text-white shadow-inner hover:shadow-lg shadow-black/30 hover:shdow-white/30 hover:bg-blue-500 rounded-md p-1.5">
                        <svg width={26} height={26} className="border-2 border-orange-500 group-hover:border-white rounded-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" fill="currentColor" />
                        </svg>
                    </NavLink>
                    <NavLink to={"/camera"} className="bg-white text-orange-500 group hover:text-white shadow-inner hover:shadow-lg shadow-black/30 hover:shdow-white/30 hover:bg-blue-500 rounded-md p-1.5">
                        <svg fill="currentColor" width={26} height={26} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.93701993,5.84537513 C7.00786835,5.74688122 7.08655624,5.62630565 7.18689485,5.46372088 C7.24312147,5.37261346 7.44826977,5.03326382 7.48180254,4.97841195 C8.31078564,3.62238725 8.91339481,3 10,3 L14,3 C15.0866052,3 15.6892144,3.62238725 16.5181975,4.97841195 C16.5517302,5.03326382 16.7568785,5.37261346 16.8131052,5.46372088 C16.9134438,5.62630565 16.9921316,5.74688122 17.0629801,5.84537513 C17.1097019,5.91032811 17.1505105,5.96193936 17.1838035,6 L20,6 C21.6568542,6 23,7.34314575 23,9 L23,18 C23,19.6568542 21.6568542,21 20,21 L4,21 C2.34314575,21 1,19.6568542 1,18 L1,9 C1,7.34314575 2.34314575,6 4,6 L6.81619653,6 C6.84948947,5.96193936 6.8902981,5.91032811 6.93701993,5.84537513 Z M4,8 C3.44771525,8 3,8.44771525 3,9 L3,18 C3,18.5522847 3.44771525,19 4,19 L20,19 C20.5522847,19 21,18.5522847 21,18 L21,9 C21,8.44771525 20.5522847,8 20,8 L17,8 C16.3356579,8 15.8876309,7.6364073 15.4393863,7.01325501 C15.3362526,6.86987789 15.2340812,6.71331789 15.1111283,6.51408981 C15.0490387,6.41348225 14.8408368,6.06908144 14.8118025,6.02158805 C14.359498,5.28172234 14.0867281,5 14,5 L10,5 C9.91327186,5 9.64050203,5.28172234 9.18819746,6.02158805 C9.15916317,6.06908144 8.95096127,6.41348225 8.88887167,6.51408981 C8.76591877,6.71331789 8.66374737,6.86987789 8.56061366,7.01325501 C8.11236912,7.6364073 7.66434214,8 7,8 L4,8 Z M19,11 C19.5522847,11 20,10.5522847 20,10 C20,9.44771525 19.5522847,9 19,9 C18.4477153,9 18,9.44771525 18,10 C18,10.5522847 18.4477153,11 19,11 Z M12,18 C9.23857625,18 7,15.7614237 7,13 C7,10.2385763 9.23857625,8 12,8 C14.7614237,8 17,10.2385763 17,13 C17,15.7614237 14.7614237,18 12,18 Z M12,16 C13.6568542,16 15,14.6568542 15,13 C15,11.3431458 13.6568542,10 12,10 C10.3431458,10 9,11.3431458 9,13 C9,14.6568542 10.3431458,16 12,16 Z" />
                        </svg>
                    </NavLink>

                    <InstallButton />
                </div>
            </div>
            <div className="bg-orange-500 text-orange-500 font-bold py-2 px-4 flex justify-start items-center gap-4">
                <p
                    onClick={() => {
                        swiper.slideTo(0);
                        setActive(0);
                    }}
                    className={" hover:bg-blue-500 hover:text-white cursor-pointer shadow-black/25 shadow-inner rounded-full px-3 " + (active === 0 ? "bg-blue-500 text-white" : "bg-white")}
                >
                    Amrish
                </p>
                <p
                    onClick={() => {
                        swiper.slideTo(1);
                        setActive(1);
                    }}
                    className={" hover:bg-blue-500 hover:text-white cursor-pointer shadow-black/25 shadow-inner rounded-full px-3 " + (active === 1 ? "bg-blue-500 text-white" : "bg-white")}
                >
                    Non Amrish
                </p>
                <p
                    onClick={() => {
                        swiper.slideTo(2);
                        setActive(2);
                    }}
                    className={" hover:bg-blue-500 hover:text-white cursor-pointer shadow-black/25 shadow-inner rounded-full px-3 " + (active === 2 ? "bg-blue-500 text-white" : "bg-white")}
                >
                    Youvak
                </p>
            </div>
        </div>
    );
};

export default Navbar;
