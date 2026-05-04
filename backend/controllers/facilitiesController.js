import axios from "axios";

export const getFacilities = async (req, res) => {
  try {
    const {  illness_severity } = req.query;

    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    let place_type = "";

    if (illness_severity === "clinic") {
      place_type = "clinic";
    } else if (illness_severity === "hospital") {
      place_type = "hospital";
    } else {
      return res.json({ message: "cure youlself at home" });
    }

    const getPlaces = async (place_type, lat, lng) => {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: place_type,
            format: "json",
            limit: 5,
            viewbox: `${lng - 0.05},${lat - 0.05},${lng + 0.05},${lat + 0.05}`,
            bounded: 1,
          },
          headers: {
            "User-Agent": "CareRoute/1.0",
          },
        },
      );
      return response.data;
    };

    const getPlc = await getPlaces(place_type, lat, lng);

    const ans=getPlc.map((g)=>({
        name:g.name,
        lat:g.lat,
        lon:g.lon,
        display_name:g.display_name
    }))

    res.json(ans);
  } catch (error) {
    console.log("facility search", error);
    res.status(500).json({ message: "error fetching facilities" });
  }
};

export default getFacilities;
