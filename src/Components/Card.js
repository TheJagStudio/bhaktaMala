import React, { useState } from "react";
const Card = ({ key, name, father, address, phone, pradesh, photo, activeP }) => {
    const [active, setActive] = useState(activeP);
    return (
        <div
            onClick={() => {
                setActive(!active);
            }}
            key={key}
            className={"transition-all cursor-pointer w-full h-full  " + (active ? "col-span-3 sm:col-span-2 sm:row-span-2" : "")}
        >
            <div className={"relative  flex flex-col  gap-5 group transition-all " + (active ? "w-full h-auto" : "w-full sm:w-32 h-32 sm:h-32 mx-auto")}>
                <div className={"overflow-hidden bg-white relative w-full h-full rounded-xl flex items-center justify-center transition-all  " + (active ? "p-4" : "p-0")}>
                    <div className={"bg-orange-500 absolute bottom-5 -right-3 w-1/2 h-10 rounded-lg -skew-x-[30deg] shadow-xl shadow-black/80 transition-all " + (active ? "" : "opacity-0")}></div>
                    <div className={"absolute bottom-0 left-0 w-full h-10 bg-blue-950 flex items-center justify-center shadow-xl shadow-black/80 transition-all " + (active ? "" : "opacity-0")}>
                        <p className="text-white font-bold">{pradesh} Pradesh</p>
                    </div>
                    <div className={"bg-orange-500 absolute -bottom-5  -left-3 w-1/3 h-20 rounded-lg skew-x-[30deg] shadow-xl shadow-black/80 " + (active ? "" : "opacity-0")}></div>

                    <div className={"w-full h-full flex items-start justify-start " + (active ? "gap-5" : "")}>
                        <img
                            onClick={() => {
                                if (active) {
                                    document.getElementById("previewContainer").classList.remove("hidden");
                                    document.getElementById("previewImg").src = photo;
                                }
                            }}
                            className={"mb-16 drop-shadow-lg object-cover rounded-lg " + (active ? "h-32 w-32" : "h-full w-full")}
                            src={photo}
                        ></img>
                        <div className="transition-all text-left">
                            <p className={"text-orange-500 font-bold truncate " + (active ? "text-2xl" : "text-sm absolute bottom-0 left-1/2 w-full -translate-x-1/2 bg-white/90 backdrop-blur-md  px-2")}>{name}</p>

                            <div className={active ? "" : "hidden"}>
                                <p className="text-blue-950 font-bold">{father}</p>
                                <p className="text-blue-950 font-bold">{phone}</p>
                                <p className="text-blue-950 ">{address}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* [transform:rotateY(0deg)] group-hover:[transform:rotateY(180deg)] [transform-style:preserve-3d] [backface-visibility:hidden] */}
                {/* <div className="bg-blue-950 overflow-hidden w-full h-full rounded-xl shadow-xl p-4 flex items-center justify-center transition-all absolute [transform:rotateY(-180deg)] group-hover:[transform:rotateY(0deg)] [transform-style:preserve-3d] [backface-visibility:hidden] duration-500 ">
                        <div className="bg-orange-500 absolute bottom-5 -right-3 w-1/2 h-10 rounded-lg -skew-x-[30deg] shadow-xl shadow-black/80"></div>
                        <div className="absolute bottom-0 left-0 w-full h-10 bg-white flex items-center justify-center shadow-xl shadow-black/80">
                            <p className="text-blue-950 font-bold">{pradesh} Pradesh</p>
                        </div>
                        <img className="h-1/2 w-auto mb-10 drop-shadow-lg" src="/static/images/SHA_logo.png"></img>
                    </div> */}
            </div>
        </div>
    );
};

export default Card;
