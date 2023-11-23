import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAtom } from "jotai";
import { dataAtom } from "../Variable";

import "swiper/css";

const HomePage = () => {
    const [data, setData] = useAtom(dataAtom);
    const [loading, setLoading] = useState(true);
    const [swiper, setSwiper] = useState(null);
    const [active, setActive] = useState(0);
    const [ambrishCount, setAmbrishCount] = useState(0);
    const [nonAmbrishCount, setNonAmbrishCount] = useState(0);
    const [yuvakCount, setYuvakCount] = useState(0);
    useEffect(() => {
        fetch("https://thejagstudio-bhaktamala.hf.space/data")
            .then((response) => response.json())
            .then((result) => {
                // sort result by result[1]
                result = result.sort(sortFunction);

                function sortFunction(a, b) {
                    if (a[1] === b[1]) {
                        return 0;
                    } else {
                        return a[1] < b[1] ? -1 : 1;
                    }
                }
                let ambrish = 0;
                let nonAmbrish = 0;
                let yuvak = 0;
                result.forEach((item) => {
                    if (item[6] === "A") {
                        ambrish++;
                    }
                    if (item[6] === "NA") {
                        nonAmbrish++;
                    }
                    if (item[6] === "Y") {
                        yuvak++;
                    }
                });
                setAmbrishCount(ambrish);
                setNonAmbrishCount(nonAmbrish);
                setYuvakCount(yuvak);
                setData(result);
                setLoading(false);
            })
            .catch((error) => console.error("Error:", error));
    }, []);
    return (
        <div className="bg-slate-200 min-h-screen noScrollBar">
            <div
                id="previewContainer"
                onClick={() => {
                    document.getElementById("previewContainer").classList.add("hidden");
                }}
                className="bg-black/90 backdrop-blur-lg absolute top-0 left-0 w-full h-full z-[60] hidden"
            >
                <img id="previewImg" className="object-contain w-full h-full p-10" src="/static/images/SHA_logo.png"></img>
            </div>
            {loading && (
                <div className="bg-white w-full h-full flex items-center justify-center fixed top-0 left-0 z-40">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-48 h-48" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <circle cx={50} cy={50} r={0} fill="none" stroke="#f97316" strokeWidth={24}>
                            <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s" />
                            <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s" />
                        </circle>
                        <circle cx={50} cy={50} r={0} fill="none" stroke="#fb923c" strokeWidth={24}>
                            <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s" />
                            <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s" />
                        </circle>
                    </svg>
                </div>
            )}
            <Navbar swiper={swiper} setActive={setActive} active={active} ambrishCount={ambrishCount} nonAmbrishCount={nonAmbrishCount} yuvakCount={yuvakCount} />
            <Swiper className="overflow-visible drop-shadow-xl" onSwiper={setSwiper} slidesPerView={1} onSlideChange={() => setActive(swiper.realIndex)}>
                <SwiperSlide>
                    <div className="p-4 pt-32  grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-5 items-center justify-center transition-all ">
                        {data.map((item, index) => {
                            if (item[6] === "A") {
                                return <Card key={index} name={item[1]} father={item[2]} address={item[3]} phone={item[4]} pradesh={item[5]} photo={item[7]} activeP={false} />;
                            }
                        })}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="p-4 pt-32  grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-5 items-center justify-center transition-all ">
                        {data.map((item, index) => {
                            if (item[6] === "NA") {
                                return <Card key={index} name={item[1]} father={item[2]} address={item[3]} phone={item[4]} pradesh={item[5]} photo={item[7]} activeP={false} />;
                            }
                        })}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="p-4 pt-32  grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-5 items-center justify-center transition-all ">
                        {data.map((item, index) => {
                            if (item[6] === "Y") {
                                return <Card key={index} name={item[1]} father={item[2]} address={item[3]} phone={item[4]} pradesh={item[5]} photo={item[7]} activeP={false} />;
                            }
                        })}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomePage;
