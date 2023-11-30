import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../Components/Navbar";

import "swiper/css";

const Form = ({ active, index }) => {
    return (
        <form
            onSubmit={(event) => {
                document.getElementById("formLoader" + index).classList.remove("scale-0");
                event.preventDefault();
                let profileImageInput = document.getElementById("profileImageInput" + index);
                let name = document.getElementById("name" + index);
                let fatherName = document.getElementById("fatherName" + index);
                let phone = document.getElementById("phone" + index);
                let pradesh = document.getElementById("pradesh" + index);
                let address = document.getElementById("address" + index);
                let category = document.getElementById("category" + index);

                if (profileImageInput.files.length === 0) {
                    alert("Please upload an image");
                    return;
                } else if (name.value === "") {
                    alert("Please enter name");
                    return;
                } else if (fatherName.value === "") {
                    alert("Please enter father's name");
                    return;
                } else if (phone.value === "") {
                    alert("Please enter phone number");
                    return;
                } else if (pradesh.value === "") {
                    alert("Please enter pradesh");
                    return;
                } else if (address.value === "") {
                    alert("Please enter address");
                    return;
                } else {
                    let formData = new FormData();
                    formData.append("profileImageInput", profileImageInput.files[0]);
                    formData.append("name", name.value);
                    formData.append("fatherName", fatherName.value);
                    formData.append("phone", phone.value);
                    formData.append("pradesh", pradesh.value);
                    formData.append("address", address.value);
                    formData.append("category", category.value);

                    fetch("https://thejagstudio-bhaktamala.hf.space/addData", {
                        method: "POST",
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            if (result.status === "success") {
                                alert("Data added successfully");
                                window.location.href = "/add";
                            } else {
                                alert("Error: " + result.error);
                            }
                        })
                        .catch((error) => {
                            alert("Error: " + error);
                        })
                        .finally(() => {
                            document.getElementById("formLoader" + index).classList.add("scale-0");
                        });
                }
            }}
            className="p-4 pt-32 sm:px-16 lg:px-48 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
            <div id={"formLoader" + index} className="absolute flex items-center justify-between top-0 left-0 w-full h-full bg-white/70 backdrop-blur-lg z-40 scale-0 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-48 h-48 mx-auto" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
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
            <div className="relative overflow-hidden h-32 w-32 sm:col-span-2 flex items-center justify-center bg-slate-300/25 shadow-inner shadow-black/25 rounded-full">
                <input
                    onChange={(event) => {
                        let file = event.target.files[0];
                        let reader = new FileReader();
                        reader.onloadend = function () {
                            document.getElementById("profileImage" + index).src = reader.result;
                            document.getElementById("labelImage" + index).classList.add("hidden");
                            document.getElementById("profileImage" + index).classList.remove("hidden");
                        };
                        reader.readAsDataURL(file);
                    }}
                    type="file"
                    required
                    accept="image/*"
                    className="bg-red-300 absolute top-0 left-0 h-full w-full opacity-0"
                    id={"profileImageInput" + index}
                    name="profileImageInput"
                />
                <p id={"labelImage" + index} className="text-orange-500 font-bold ">
                    Upload Image
                </p>
                <img id={"profileImage" + index} alt={"profileImage"} className="hidden h-full w-full object-cover shadow-inner shadow-black/25" />
            </div>
            <div>
                <p className="text-orange-500 font-semibold text-xl px-4 mb-2">Name</p>
                <input id={"name" + index} name="name" required placeholder="Enter Name" className="bg-white rounded-full shadow-inner shadow-black/10 p-2 px-4 w-full border focus:outline-none ring-2 focus:ring-orange-500 ring-transparent" type="text" />
            </div>
            <div>
                <p className="text-orange-500 font-semibold text-xl px-4 mb-2">Father Name</p>
                <input id={"fatherName" + index} name="fatherName" required placeholder="Enter Father's Name" className="bg-white rounded-full shadow-inner shadow-black/10 p-2 px-4 w-full border focus:outline-none ring-2 focus:ring-orange-500 ring-transparent" type="text" />
            </div>
            <div>
                <p className="text-orange-500 font-semibold text-xl px-4 mb-2">Phone Number</p>
                <input id={"phone" + index} name="phone" required placeholder="Enter Phone Number" className="bg-white rounded-full shadow-inner shadow-black/10 p-2 px-4 w-full border focus:outline-none ring-2 focus:ring-orange-500 ring-transparent" type="text" />
            </div>
            <div>
                <p className="text-orange-500 font-semibold text-xl px-4 mb-2">Pradesh</p>
                <input id={"pradesh" + index} name="pradesh" required placeholder="Enter Pradesh" className="bg-white rounded-full shadow-inner shadow-black/10 p-2 px-4 w-full border focus:outline-none ring-2 focus:ring-orange-500 ring-transparent" type="text" />
            </div>
            <div>
                <p className="text-orange-500 font-semibold text-xl px-4 mb-2">Address</p>
                <input id={"address" + index} name="address" required placeholder="Enter Address" className="bg-white rounded-full shadow-inner shadow-black/10 p-2 px-4 w-full border focus:outline-none ring-2 focus:ring-orange-500 ring-transparent" type="text" />
            </div>
            <input type="hidden" id={"category" + index} name="category" value={active === 0 ? "A" : active === 1 ? "NA" : "Y"} />
            <button type="submit" className="sm:col-span-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg p-2 px-4 w-32 h-10  border focus:outline-none ring-2 focus:ring-orange-500 ring-transparent">
                Submit
            </button>
        </form>
    );
};

const AddPage = () => {
    const [swiper, setSwiper] = useState(null);
    const [active, setActive] = useState(0);
    return (
        <div>
            <Navbar swiper={swiper} setActive={setActive} active={active} />
            <Swiper
                onSwiper={setSwiper}
                onDrag={(event) => {
                    event.preventDefault();
                }}
                allowTouchMove={false}
                slidesPerView={1}
                onSlideChange={() => setActive(swiper.realIndex)}
            >
                <SwiperSlide>
                    <Form active={active} index={1} />
                </SwiperSlide>
                <SwiperSlide>
                    <Form active={active} index={2} />
                </SwiperSlide>
                <SwiperSlide>
                    <Form active={active} index={3} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default AddPage;
