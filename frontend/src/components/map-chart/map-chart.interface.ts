export interface CityData {
  city_code: string;
  lat: number;
  lng: number;
}

export interface MapChartProps {
  data: { country: string }[];
}
