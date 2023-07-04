import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { CityData, MapChartProps } from "./map-chart.interface";
import { center, containerStyle } from "./map-chart.constant";
import "../../styles/components/map-chart.scss";

export const MapChart: React.FC<MapChartProps> = ({ data }) => {
  const [cityData, setCityData] = useState<CityData[]>([]);

  useEffect(() => {
    const fetchCityCoordinates = async () => {
      const coordinates: CityData[] = [];

      for (const item of data) {
        const city = item.country;
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              city
            )}&key=AIzaSyC2PJn7ZD5WHdINfQcwjNoZWGjNITkL_cI`
          );
          const responseData = await response.json();
          if (responseData.results.length > 0) {
            const { lat, lng } = responseData.results[0].geometry.location;

            coordinates.push({
              city_code: city,
              lat,
              lng,
            });
          }
        } catch (error) {
          console.error(`Error obteniendo coordenadas de ${city}:`, error);
        }
      }

      setCityData(coordinates);
    };

    fetchCityCoordinates();
  }, [data]);

  return (
    <>
      <h3 className="c-map-chart__title">Top 10 map users</h3>
      <LoadScript googleMapsApiKey="AIzaSyC2PJn7ZD5WHdINfQcwjNoZWGjNITkL_cI">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
          {cityData.map(({ city_code, lng, lat }) => (
            <Marker key={city_code} position={{ lat, lng }} />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};
