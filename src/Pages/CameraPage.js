import React, { useRef, useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import InstallButton from "../Components/InstallButton";
import Card from "../Components/Card";
import Webcam from "react-webcam";

const CameraPage = () => {
    const [deviceId, setDeviceId] = useState(null);
    const [devices, setDevices] = useState([]);
    const [imageSrc, setImageSrc] = useState(null);
    const [matches, setMatches] = useState([]);
    const webcamRef = useRef(null);

    const handleDevices = useCallback((mediaDevices) => setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")), [setDevices]);

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);
    return (
        <div className="relative h-screen flex flex-col bg-black items-center justify-between">
            <div
                id="previewContainer"
                onClick={() => {
                    document.getElementById("previewContainer").classList.add("hidden");
                }}
                className="bg-black/90 backdrop-blur-lg absolute top-0 left-0 w-full h-full z-[60] hidden"
            >
                <img id="previewImg" className="object-contain w-full h-full p-10" src="/static/images/SHA_logo.png"></img>
            </div>
            <div id="capturedImageContainer" className="scale-0 transition-all absolute top-0 left-0 w-full h-full bg-black/90 backdrop-blur-xl z-50 p-10">
                <button
                    onClick={() => {
                        document.getElementById("capturedImageContainer").classList.add("scale-0");
                    }}
                    className="absolute top-3 right-3 bg-white rounded-full"
                >
                    <svg fill="black" width={30} height={30} viewBox="-6 -6 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
                        <path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z" />
                    </svg>
                </button>
                <img id="capturedImage" src={imageSrc} className="object-contain w-full h-48 border rounded-lg  bg-white py-3" />
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 h-[calc(100vh-16rem)] overflow-scroll pb-5">
                    {matches.map((item, index) => {
                        return <Card key={index} name={item[1]} father={item[2]} address={item[3]} phone={item[4]} pradesh={item[5]} photo={item[7]} activeP={true} />;
                    })}
                </div>
            </div>
            <div className="w-full text-white p-4 text-lg flex justify-between items-center ">
                <NavLink to={"/"} className="font-bold text-xl">
                    BhaktaMala
                </NavLink>
                <div className="flex gap-3">
                    <NavLink to={"/search"} className="bg-white text-black hover:text-white shadow-inner hover:shadow-lg shadow-black/30 hover:shdow-white/30 hover:bg-blue-500 rounded-md p-1.5">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
                        </svg>
                    </NavLink>
                    <NavLink to={"/add"} className="bg-white text-black group hover:text-white shadow-inner hover:shadow-lg shadow-black/30 hover:shdow-white/30 hover:bg-blue-500 rounded-md p-1.5">
                        <svg width={26} height={26} className="border-2 border-black group-hover:border-white rounded-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" fill="currentColor" />
                        </svg>
                    </NavLink>
                    <NavLink to={"/camera"} className="bg-white text-black group hover:text-white shadow-inner hover:shadow-lg shadow-black/30 hover:shdow-white/30 hover:bg-blue-500 rounded-md p-1.5">
                        <svg fill="currentColor" width={26} height={26} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.93701993,5.84537513 C7.00786835,5.74688122 7.08655624,5.62630565 7.18689485,5.46372088 C7.24312147,5.37261346 7.44826977,5.03326382 7.48180254,4.97841195 C8.31078564,3.62238725 8.91339481,3 10,3 L14,3 C15.0866052,3 15.6892144,3.62238725 16.5181975,4.97841195 C16.5517302,5.03326382 16.7568785,5.37261346 16.8131052,5.46372088 C16.9134438,5.62630565 16.9921316,5.74688122 17.0629801,5.84537513 C17.1097019,5.91032811 17.1505105,5.96193936 17.1838035,6 L20,6 C21.6568542,6 23,7.34314575 23,9 L23,18 C23,19.6568542 21.6568542,21 20,21 L4,21 C2.34314575,21 1,19.6568542 1,18 L1,9 C1,7.34314575 2.34314575,6 4,6 L6.81619653,6 C6.84948947,5.96193936 6.8902981,5.91032811 6.93701993,5.84537513 Z M4,8 C3.44771525,8 3,8.44771525 3,9 L3,18 C3,18.5522847 3.44771525,19 4,19 L20,19 C20.5522847,19 21,18.5522847 21,18 L21,9 C21,8.44771525 20.5522847,8 20,8 L17,8 C16.3356579,8 15.8876309,7.6364073 15.4393863,7.01325501 C15.3362526,6.86987789 15.2340812,6.71331789 15.1111283,6.51408981 C15.0490387,6.41348225 14.8408368,6.06908144 14.8118025,6.02158805 C14.359498,5.28172234 14.0867281,5 14,5 L10,5 C9.91327186,5 9.64050203,5.28172234 9.18819746,6.02158805 C9.15916317,6.06908144 8.95096127,6.41348225 8.88887167,6.51408981 C8.76591877,6.71331789 8.66374737,6.86987789 8.56061366,7.01325501 C8.11236912,7.6364073 7.66434214,8 7,8 L4,8 Z M19,11 C19.5522847,11 20,10.5522847 20,10 C20,9.44771525 19.5522847,9 19,9 C18.4477153,9 18,9.44771525 18,10 C18,10.5522847 18.4477153,11 19,11 Z M12,18 C9.23857625,18 7,15.7614237 7,13 C7,10.2385763 9.23857625,8 12,8 C14.7614237,8 17,10.2385763 17,13 C17,15.7614237 14.7614237,18 12,18 Z M12,16 C13.6568542,16 15,14.6568542 15,13 C15,11.3431458 13.6568542,10 12,10 C10.3431458,10 9,11.3431458 9,13 C9,14.6568542 10.3431458,16 12,16 Z" />
                        </svg>
                    </NavLink>
                    <InstallButton />
                </div>
            </div>
            <div className="bg-white h-[calc(100vh-10rem)] w-full">
                <Webcam audio={false} ref={webcamRef} videoConstraints={{ deviceId: devices?.[deviceId]?.deviceId }} className="w-full h-full object-cover" screenshotFormat="image/jpeg" />;
            </div>
            <div className="relative h-20 w-full flex items-center justify-center">
                <img
                    onClick={() => {
                        document.getElementById("capturedImageContainer").classList.remove("scale-0");
                    }}
                    src={imageSrc}
                    className="absolute left-3 w-16 h-16 object-cover rounded-lg bg-white cursor-pointer"
                />
                <button
                    onClick={() => {
                        const imageSrcRaw = webcamRef.current.getScreenshot();
                        setImageSrc(imageSrcRaw);
                        console.log(imageSrcRaw);
                        document.getElementById("capturedImageContainer").classList.remove("scale-0");
                        let formData = new FormData();
                        formData.append("imageSrc", imageSrcRaw);
                        fetch("https://thejagstudio-bhaktamala.hf.space/ai", {
                            method: "POST",
                            body: formData,
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data);
                                setMatches(data);
                                // document.getElementById("capturedImage").src = data.imageSrc;
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }}
                    className="bg-white rounded-full h-14 w-14 outline outline-white outline-offset-2 active:outline-offset-4 active:bg-white/80 active:scale-[93%]"
                ></button>
                <button
                    onClick={() => {
                        setDeviceId((deviceId + 1) % devices.length);
                    }}
                    className="absolute right-5 active:-rotate-45 transition-all"
                >
                    <svg fill="white" width={38} height={38} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.98313549,11.0001422 C5.49589839,10.9914935 5.92501998,11.3703506 5.99116425,11.8666444 L5.99985778,11.9831355 L6.00348884,12.2068855 C6.11245031,15.4321748 8.76323537,17.9999971 11.9999971,17.9999971 C12.1869612,17.9999971 12.3726725,17.9914753 12.5567465,17.9745765 L12.2928932,17.7071068 C11.9023689,17.3165825 11.9023689,16.6834175 12.2928932,16.2928932 C12.6834175,15.9023689 13.3165825,15.9023689 13.7071068,16.2928932 L15.7071068,18.2928932 C16.0976311,18.6834175 16.0976311,19.3165825 15.7071068,19.7071068 L13.7071068,21.7071068 C13.3165825,22.0976311 12.6834175,22.0976311 12.2928932,21.7071068 C11.9023689,21.3165825 11.9023689,20.6834175 12.2928932,20.2928932 L12.6111505,19.9769552 C12.4086045,19.9922816 12.2047796,19.9999971 11.9999971,19.9999971 C7.7687005,19.9999971 4.28886152,16.7094374 4.01666425,12.5105203 L4.00420123,12.2575143 L4.00014222,12.0168645 C3.9908282,11.4646583 4.43092928,11.0094562 4.98313549,11.0001422 Z M11.7071068,2.29289322 C12.0675907,2.65337718 12.0953203,3.22060824 11.7902954,3.61289944 L11.7071068,3.70710678 L11.3891629,4.0230186 C11.5916051,4.00770767 11.7953244,4 12,4 C16.418278,4 20,7.581722 20,12 C20,12.5522847 19.5522847,13 19,13 C18.4477153,13 18,12.5522847 18,12 C18,8.6862915 15.3137085,6 12,6 C11.8129339,6 11.6271216,6.00853145 11.4429483,6.02544919 L11.7071068,6.29289322 C12.0976311,6.68341751 12.0976311,7.31658249 11.7071068,7.70710678 C11.3466228,8.06759074 10.7793918,8.09532028 10.3871006,7.79029539 L10.2928932,7.70710678 L8.29289322,5.70710678 C7.93240926,5.34662282 7.90467972,4.77939176 8.20970461,4.38710056 L8.29289322,4.29289322 L10.2928932,2.29289322 C10.6834175,1.90236893 11.3165825,1.90236893 11.7071068,2.29289322 Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CameraPage;
