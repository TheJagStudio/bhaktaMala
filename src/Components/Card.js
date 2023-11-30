import React, { useState } from "react";
import html2canvas from "html2canvas";

const Card = ({ name, father, address, phone, pradesh, photo, activeP }) => {
    const [active, setActive] = useState(activeP);
    async function shareData(data) {
        try {
            await navigator.share(data);
            // The data was shared successfully.
        } catch (e) {
            // The data could not be shared.
            console.error(`Error: ${e}`);
        }
    }

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(",")[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var bb = new Blob([ab]);
        return bb;
    }

    return (
        <div
            onClick={() => {
                setActive(!active);
            }}
            className={"transition-all cursor-pointer w-full h-full  " + (active ? "col-span-3 sm:col-span-2 sm:row-span-2" : "")}
        >
            <div className={"relative  flex flex-col  gap-5 group transition-all " + (active ? "w-full h-auto" : "w-full sm:w-32 h-32 sm:h-32 mx-auto")}>
                <div className={"overflow-hidden bg-white relative w-full h-full rounded-xl flex items-center justify-center  transition-all " + (active ? "p-4" : "p-0")}>
                    <button
                        onClick={(event) => {
                            shareData({
                                title: "Bhaktamala",
                                text: "Name : " + name + "\nFather : " + father + "\nPhone : " + phone + "\nAddress : " + address + "\nPradesh : " + pradesh,
                            });

                            event.stopPropagation();
                        }}
                        className={"absolute flex items-center justify-center bottom-3 right-3 z-30 w-10 h-10 rounded-full bg-green-500 " + (active ? "" : "hidden")}
                    >
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.293 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L13 5.414V15a1 1 0 1 1-2 0V5.414L9.707 6.707a1 1 0 0 1-1.414-1.414l3-3zM4 11a2 2 0 0 1 2-2h2a1 1 0 0 1 0 2H6v9h12v-9h-2a1 1 0 1 1 0-2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9z" fill="white" />
                        </svg>
                    </button>
                    <button
                        onClick={(event) => {
                            let card = event.currentTarget.parentElement;
                            let shareButton1 = card.getElementsByTagName("button")[0];
                            let shareButton2 = card.getElementsByTagName("button")[1];
                            card.classList.remove("rounded-xl");
                            shareButton1.classList.add("hidden");
                            shareButton2.classList.add("hidden");
                            setTimeout(() => {
                                html2canvas(card.parentElement.parentElement, { useCORS: true, allowTaint: true, scale: 2 })
                                    .then((canvas) => {
                                        let image = canvas.toDataURL("image/png");
                                        let blob = dataURItoBlob(image);
                                        let files = [new File([blob], name + ".png", { type: "image/png" })];
                                        shareData({
                                            // title: "Bhaktamala",
                                            // text: "Name : " + name + "\nFather : " + father + "\nPhone : " + phone + "\nAddress : " + address + "\nPradesh : " + pradesh,
                                            files: files,
                                        });
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                                    .finally(() => {
                                        card.classList.add("rounded-xl");
                                        shareButton1.classList.remove("hidden");
                                        shareButton2.classList.remove("hidden");
                                    });
                            }, 200);

                            event.stopPropagation();
                        }}
                        className={"absolute flex items-center justify-center bottom-3 right-16 z-30 w-10 h-10 rounded-full bg-green-500 " + (active ? "" : "hidden")}
                    >
                        <svg fill="white" width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.93701993,5.84537513 C7.00786835,5.74688122 7.08655624,5.62630565 7.18689485,5.46372088 C7.24312147,5.37261346 7.44826977,5.03326382 7.48180254,4.97841195 C8.31078564,3.62238725 8.91339481,3 10,3 L14,3 C15.0866052,3 15.6892144,3.62238725 16.5181975,4.97841195 C16.5517302,5.03326382 16.7568785,5.37261346 16.8131052,5.46372088 C16.9134438,5.62630565 16.9921316,5.74688122 17.0629801,5.84537513 C17.1097019,5.91032811 17.1505105,5.96193936 17.1838035,6 L20,6 C21.6568542,6 23,7.34314575 23,9 L23,18 C23,19.6568542 21.6568542,21 20,21 L4,21 C2.34314575,21 1,19.6568542 1,18 L1,9 C1,7.34314575 2.34314575,6 4,6 L6.81619653,6 C6.84948947,5.96193936 6.8902981,5.91032811 6.93701993,5.84537513 Z M4,8 C3.44771525,8 3,8.44771525 3,9 L3,18 C3,18.5522847 3.44771525,19 4,19 L20,19 C20.5522847,19 21,18.5522847 21,18 L21,9 C21,8.44771525 20.5522847,8 20,8 L17,8 C16.3356579,8 15.8876309,7.6364073 15.4393863,7.01325501 C15.3362526,6.86987789 15.2340812,6.71331789 15.1111283,6.51408981 C15.0490387,6.41348225 14.8408368,6.06908144 14.8118025,6.02158805 C14.359498,5.28172234 14.0867281,5 14,5 L10,5 C9.91327186,5 9.64050203,5.28172234 9.18819746,6.02158805 C9.15916317,6.06908144 8.95096127,6.41348225 8.88887167,6.51408981 C8.76591877,6.71331789 8.66374737,6.86987789 8.56061366,7.01325501 C8.11236912,7.6364073 7.66434214,8 7,8 L4,8 Z M19,11 C19.5522847,11 20,10.5522847 20,10 C20,9.44771525 19.5522847,9 19,9 C18.4477153,9 18,9.44771525 18,10 C18,10.5522847 18.4477153,11 19,11 Z M12,18 C9.23857625,18 7,15.7614237 7,13 C7,10.2385763 9.23857625,8 12,8 C14.7614237,8 17,10.2385763 17,13 C17,15.7614237 14.7614237,18 12,18 Z M12,16 C13.6568542,16 15,14.6568542 15,13 C15,11.3431458 13.6568542,10 12,10 C10.3431458,10 9,11.3431458 9,13 C9,14.6568542 10.3431458,16 12,16 Z" />
                        </svg>
                    </button>
                    <div className={"bg-orange-500 absolute bottom-5 -right-3 w-1/2 h-10 rounded-lg -skew-x-[30deg] shadow-xl shadow-black/80 transition-all " + (active ? "" : "opacity-0")}></div>
                    <div className={"absolute bottom-0 left-0 w-full h-10 bg-blue-950 flex items-center justify-center shadow-xl shadow-black/80 transition-all " + (active ? "" : "opacity-0")}>
                        <p className="text-white font-bold">{pradesh} Pradesh</p>
                    </div>
                    <div className={"bg-orange-500 absolute -bottom-5  -left-3 w-1/3 h-20 rounded-lg skew-x-[30deg] shadow-xl shadow-black/80 " + (active ? "" : "opacity-0")}></div>

                    <div className={"w-full h-full flex items-start justify-start " + (active ? "gap-5" : "")}>
                        <img
                            onClick={(event) => {
                                if (active) {
                                    document.getElementById("previewContainer").classList.remove("hidden");
                                    document.getElementById("previewImg").src = photo;
                                }
                                if (active) {
                                    event.stopPropagation();
                                }
                            }}
                            alt="userPhoto"
                            className={"mb-16 drop-shadow-lg object-cover rounded-lg " + (active ? "h-32 w-32" : "h-full w-full")}
                            src={photo}
                        ></img>
                        <div className={"transition-all text-left h-fit mb-12 " + (active ? "w-full" : "")}>
                            <p className={"text-orange-500 font-bold " + (active ? "text-2xl" : "text-sm absolute bottom-0 left-1/2 w-full -translate-x-1/2 bg-white/90 backdrop-blur-md  px-2")}>
                                {name} <span className={active ? "" : "hidden"}>{father}</span>
                            </p>

                            <div className={active ? "" : "hidden"}>
                                <p className="text-blue-950 font-bold">{phone}</p>
                                <p className="text-blue-950 ">{address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
