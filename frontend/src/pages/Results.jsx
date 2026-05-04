import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { triageData } = location.state || {};

  const topResult = triageData?.[0];

  if (!topResult) return <div>Loading...</div>;

  const handleClick = async () => {
    try {
      if (!navigator.geolocation) {
        toast.error("geolocation is not supported by your browser");
      }

      navigator.geolocation.getCurrentPosition((pos) => {
        console.log("position:", pos.coords);
        console.log("navigating with:", {
          careLevel: topResult.illness_severity,
          userLocation: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        });

        navigate("/facilities", {
          state: {
            careLevel: topResult.illness_severity,
            userLocation: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          },
        });
      });
    } catch (error) {
      toast.error("error occured while getting user location");
    }
  };

  let colorClasses = "";
  if (topResult.illness_severity === "home") {
    colorClasses = "bg-green-100 text-green-800";
  } else if (topResult.illness_severity === "clinic") {
    colorClasses = "bg-yellow-100 text-yellow-800";
  } else if (topResult.illness_severity === "hospital") {
    colorClasses = "bg-red-100 text-red-800";
  }

  return (
    <>
      <div
        className="flex flex-col items-center justify-center m-10 p-10 w-2xl h-2xl gap-2 border
     border-cyan-200 border-rounded rounded-sm bg-[#1e293b]"
      >
        <h2>{topResult.probable_illness}</h2>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${colorClasses}`}
        >
          {topResult.illness_severity}
        </span>
        <p>{topResult.first_aid}</p>
        {topResult.illness_severity === "home" ? (
          <button>Rest at home</button>
        ) : (
          <button
            onClick={handleClick}
            className="px-6 py-3 mt-2 bg-purple-100 text-2xl text-purple-800 border rounded-full
        hover:cursor-pointer hover:bg-purple-200"
          >
            Find nearby facilities
          </button>
        )}
      </div>
    </>
  );
};

export default Results;
