import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAtom } from "jotai";
import { dataAtom } from "../Variable";

import "swiper/css";

const SearchPage = () => {
    const [data, setData] = useAtom(dataAtom);
    const [swiper, setSwiper] = useState(null);
    const [active, setActive] = useState(0);
    const [search, setSearch] = useState("");
    useEffect(() => {
        fetch("dhttps://thejagstudio-bhaktamala.hf.space/data")
            .then((response) => response.json())
            .then((result) => {
                result = result.sort(sortFunction);

                function sortFunction(a, b) {
                    if (a[1] === b[1]) {
                        return 0;
                    } else {
                        return a[1] < b[1] ? -1 : 1;
                    }
                }
                setData(result);
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
            <Navbar swiper={swiper} setActive={setActive} active={active} />
            <div className="p-4 pt-32">
                <input
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                    type="text"
                    className="w-full p-2 px-4 mb-5 rounded-full shadow-inner focus:ring-orange-500 focus:outline-none ring-2 ring-transparent"
                    placeholder="Search"
                />
                <Swiper onSwiper={setSwiper} slidesPerView={1} onSlideChange={() => setActive(swiper.realIndex)}>
                    <SwiperSlide>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
                            {data.map((item, index) => {
                                let query = item[1] + " " + item[2] + " " + item[3] + " " + item[4];
                                if (item[6] === "A" && query.toLowerCase().includes(search.toLowerCase())) {
                                    return <Card key={index} name={item[1]} father={item[2]} address={item[3]} phone={item[4]} pradesh={item[5]} photo={item[7]} activeP={true} />;
                                }
                            })}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-5">
                            {data.map((item, index) => {
                                let query = item[1] + " " + item[2] + " " + item[3] + " " + item[4];
                                if (item[6] === "NA" && query.toLowerCase().includes(search.toLowerCase())) {
                                    return <Card key={index} name={item[1]} father={item[2]} address={item[3]} phone={item[4]} pradesh={item[5]} photo={item[7]} activeP={true} />;
                                }
                            })}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
                            {data.map((item, index) => {
                                let query = item[1] + " " + item[2] + " " + item[3] + " " + item[4];
                                if (item[6] === "Y" && query.toLowerCase().includes(search.toLowerCase())) {
                                    return <Card key={index} name={item[1]} father={item[2]} address={item[3]} phone={item[4]} pradesh={item[5]} photo={item[7]} activeP={true} />;
                                }
                            })}
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default SearchPage;
