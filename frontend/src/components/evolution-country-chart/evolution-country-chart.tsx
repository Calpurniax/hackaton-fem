import { FC, ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { evolutionCountryChartProps } from "./evolution-country-chart.interface";
import { Input } from "../input";
import "../../styles/components/evolution-country-chart.scss";
import { getFormatValue } from "../../utils/get-format-value";
export const EvolutionCountryChart: FC<evolutionCountryChartProps> = ({
  data,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    if (data.length > 0) {
      setSelectedCountry(data[0].country);
    }
  }, [data]);

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="c-evolution-country">
      <h3 className="c-evolution-country__title">Internet users per country</h3>
      <Input
        data={data}
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
        text="Select country"
      />
      <ResponsiveContainer
        width="100%"
        height={400}
        className="c-evolution-country__responsive"
      >
        <BarChart
          width={800}
          height={400}
          data={data?.find((item) => item.country === selectedCountry)?.year}
        >
          <Bar
            dataKey="internet_users"
            fill="#8884d8"
            width={100}
            height={100}
          />

          <XAxis dataKey="year" />
          <YAxis dataKey="internet_users" tickFormatter={getFormatValue} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
