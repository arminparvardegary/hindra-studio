"use client";

import React from "react";

export default function Built() {
  return (
    <div className="w-full flex justify-between">



    <div className="w-full flex flex-col gap-10  items-center mt-20">

<div
  style={{ position: "relative", zIndex: 1 }}
  className="-rotate-[20deg] bg-white shadow-xl rounded-[28px] p-6 h-[430px] w-[350px] flex flex-col"
>
  <div className="flex items-center gap-2 mb-4">
<img src='/Group (1).svg'/>
    <p className="font-semibold text-gray-800">Stats</p>
  </div>

  <div className="bg-gray-100 rounded-[22px] py-6 px-4 text-center shadow-sm mb-4">
    <p className="text-4xl font-bold text-black">50+</p>
    <p className="text-gray-600 text-sm mt-1">Projects completed</p>
  </div>

  <div className="bg-gray-100 rounded-[22px] py-6 px-4 text-center shadow-sm mb-4">
    <p className="text-4xl font-bold text-black">7+</p>
    <p className="text-gray-600 text-sm mt-1">Years experience</p>
  </div>

  <div className="bg-gray-100 rounded-[22px] py-6 px-4 text-center shadow-sm">
    <p className="text-4xl font-bold text-black">100+</p>
    <p className="text-gray-600 text-sm mt-1">Happy Customers</p>
  </div>
</div>


<div
  style={{ position: "relative", zIndex: 10, bottom: "70px" }}
  className="rotate-[20deg] bg-white shadow-xl rounded-[28px] p-6 h-[430px] w-[350px] flex flex-col"
>
  <div className="flex items-center gap-2 mb-5">
<img src='/Vector (6).svg'/>
    <p className="font-semibold text-gray-800">Resume</p>
  </div>

  <div className="flex gap-4">

    <div className="w-[2px] bg-gray-200 rounded-full"></div>

    <div className="flex flex-col gap-5">
      <div>
        <p className="font-semibold text-gray-700">Position or Role</p>
        <p className="text-gray-500 text-sm -mt-1">Company Name</p>
        <div className="flex items-center gap-2 mt-2 bg-gray-100 px-3 py-2 rounded-full shadow-sm w-fit">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <p className="text-gray-500 text-sm">Mon, Year – Mon, Year</p>
        </div>
      </div>

      <div>
        <p className="font-semibold text-gray-700">Position or Role</p>
        <p className="text-gray-500 text-sm -mt-1">Company Name</p>
        <div className="flex items-center gap-2 mt-2 bg-gray-100 px-3 py-2 rounded-full shadow-sm w-fit">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <p className="text-gray-500 text-sm">Mon, Year – Mon, Year</p>
        </div>
      </div>

      <div>
        <p className="font-semibold text-gray-700">Position or Role</p>
        <p className="text-gray-500 text-sm -mt-1">Company Name</p>
        <div className="flex items-center gap-2 mt-2 bg-gray-100 px-3 py-2 rounded-full shadow-sm w-fit">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <p className="text-gray-500 text-sm">Mon, Year – Mon, Year</p>
        </div>
      </div>
    </div>
  </div>
</div>


    </div>


 <div className="w-full flex flex-col gap-10  items-center mt-20">

<div
  style={{ position: "relative", zIndex: 10 }}
  className="rotate-[20deg] bg-white shadow-xl rounded-[28px] p-6 h-[260px] w-[340px]"
>
  <div className="flex items-center gap-2 mb-5">
   <img src='/Group (2).svg'/>
    <p className="font-semibold text-gray-800">My Stack</p>
  </div>

  <div className="grid grid-cols-3 gap-4">

    <div className="w-full h-20 bg-gray-100 rounded-2xl shadow-sm flex items-center justify-center">
      <a href="#"> <img src='/linkedin.svg' width={50}/></a>
    </div>

    <div className="w-full h-20 bg-gray-100 rounded-2xl shadow-sm flex items-center justify-center">
    <a href="#"><img src='/youtube.svg' width={50}/></a>
    </div>

    <div className="w-full h-20 bg-gray-100 rounded-2xl shadow-sm flex items-center justify-center">
    <a href="#"><img src='/instagram.svg' width={50}/></a>
    </div>

    <div className="w-full h-20 bg-gray-100 rounded-2xl shadow-sm flex items-center justify-center">
    <a href="#"> <img src='/behance.svg' width={50}/></a>
    </div>

    <div className="w-full h-20 bg-gray-100 rounded-2xl shadow-sm flex items-center justify-center">
    <a href="#"><img src='/dribbble.svg' width={50}/></a>
    </div>

    <div className="w-full h-20 bg-gray-100 rounded-2xl shadow-sm flex items-center justify-center">
    <a href="#"> <img src='/pinterest.svg' width={50}/></a>
    </div>

  </div>
</div>



<div
  style={{ position: "relative", zIndex: 1, bottom: "70px" }}
  className="-rotate-[20deg] bg-white shadow-xl rounded-[28px] p-6 w-[340px] flex flex-col gap-4"
>

  <div className="flex items-center gap-2 mb-2">
  <img src='/Vector (7).svg'/>
    <p className="font-semibold text-gray-800">FAQ</p>
  </div>

  <div className=" rounded-xl border-[1px] shadow-sm p-4">
    <div className="flex justify-between items-center cursor-pointer">
      <p className="font-semibold text-gray-800">Question goes here</p>
     
    </div>

    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
      Long answer for this frequently asked question goes here.
    </p>
  </div>

  <details className="bg-gray-100 rounded-xl shadow-sm">
    <summary className="flex justify-between items-center px-4 py-3 cursor-pointer list-none">
      <span className="font-semibold text-gray-800">Question goes here</span>
      <img src='/chevron-down-solid-full.svg' width={20}/>
    </summary>

    <div className="px-4 pb-3">
      <p className="text-gray-600 text-sm leading-relaxed">
        Long answer for this question goes here.
      </p>
    </div>
  </details>

  <details className="bg-gray-100 rounded-xl shadow-sm">
    <summary className="flex justify-between items-center px-4 py-3 cursor-pointer list-none">
      <span className="font-semibold text-gray-800">Question goes here</span>
      <img src='/chevron-down-solid-full.svg' width={20}/>    </summary>

    <div className="px-4 pb-3">
      <p className="text-gray-600 text-sm leading-relaxed">
        Long answer for this question goes here.
      </p>
    </div>
  </details>

</div>


    </div>




    </div>
  );
}
