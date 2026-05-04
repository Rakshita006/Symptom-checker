import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getFacilities } from "../../Api/Api.js";
import toast from "react-hot-toast";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import icon2x from 'leaflet/dist/images/marker-icon-2x.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  iconRetinaUrl: icon2x,
  shadowUrl: iconShadow,
})

const Facilities = () => {
  const location = useLocation();

  const { careLevel, userLocation } = location.state || {};

  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations,setLocations]=useState([])

  const fetchFacilities = async () => {
    console.log('careLevel:', careLevel)
  console.log('userLocation:', userLocation)
    try {
      if (!careLevel || !userLocation) {
        toast.error("did not receive userlocation or carelevel");
        return <div>Missing Data</div>;
      }
      const res = await getFacilities({
        illness_severity: careLevel,
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      });

      if (!res.data) {
        toast.error("some error occured while fetching facilities");
      }
      console.log('facilities response:', res.data)
      setResponse(res.data);

      const userMarker={position:[userLocation.latitude,userLocation.longitude], name:'you are here'}

      const facilityMarker=res.data.map((r)=>({
          position:[parseFloat(r.lat), parseFloat(r.lon)],
          name:r.name
      }))
      setLocations([userMarker,...facilityMarker])
      setLoading(false);
    } catch (error) {
      console.log('facilities error:', error)
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  
  return (
    <div className="flex flex-col items-center justify-center">
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex items-center justify-center grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {response.map((a) => (
            <div
              className="m-6 p-6 gap-2 flex flex-col items-center justify-center w-2xl h-2xl 
          border border-cyan-200 border-rounded rounded-sm bg-[#1e293b]"
              key={a.place_id}
            >
              <h1 className="text-2xl font-bold">{a.name}</h1>
              <p>{a.display_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>

    <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={13}
     className="h-[400px] w-full min-h-[300px]">

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; 
      <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />

      {
        locations.map((loc,index)=>(
          <Marker key={index} position={loc.position}>
            <Popup><span>{loc.name}</span></Popup>
          </Marker>
        ))
      }

    </MapContainer>
    </div>
  );
};

export default Facilities;
