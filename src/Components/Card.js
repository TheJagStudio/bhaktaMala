import React, { useState } from "react";
import { toPng } from "html-to-image";

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
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(",")[1]);

        // separate out the mime component
        var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        var ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], { type: mimeString });
        return blob;
    }

    return (
        <div
            onClick={() => {
                setActive(!active);
            }}
            className={"transition-all cursor-pointer w-full h-full  " + (active ? "col-span-3 sm:col-span-2 sm:row-span-2" : "")}
        >
            <div className={"relative  flex flex-col  gap-5 group transition-all " + (active ? "w-full h-auto" : "w-full sm:w-32 h-32 sm:h-32 mx-auto")}>
                <div className={"overflow-hidden bg-white relative w-full h-full rounded-xl flex items-center justify-center transition-all  " + (active ? "p-4" : "p-0")}>
                    <button
                        onClick={(event) => {
                            let card = event.target.parentElement.parentElement.parentElement;

                            toPng(card, { cacheBust: false })
                                .then((dataUrl) => {
                                    let blob = dataURItoBlob(dataUrl);
                                    let files = [new File([blob], name + ".png", { type: "image/png" })];
                                    shareData({
                                        title: "Bhaktamala",
                                        text: "Name : " + name + "\nFather : " + father + "\nPhone : " + phone + "\nAddress : " + address + "\nPradesh : " + pradesh,
                                        files: files,
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });

                            event.stopPropagation();
                        }}
                        className={"absolute flex items-center justify-center bottom-3 left-3 z-30 w-10 h-10 rounded-full bg-green-500 " + (active ? "" : "hidden")}
                    >
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.293 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L13 5.414V15a1 1 0 1 1-2 0V5.414L9.707 6.707a1 1 0 0 1-1.414-1.414l3-3zM4 11a2 2 0 0 1 2-2h2a1 1 0 0 1 0 2H6v9h12v-9h-2a1 1 0 1 1 0-2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9z" fill="white" />
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
