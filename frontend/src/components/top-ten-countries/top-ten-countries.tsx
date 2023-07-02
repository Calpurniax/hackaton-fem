import "../../styles/components/top-ten-countries.scss";
import { FC } from "react";
import { XAxis, YAxis, LineChart, ResponsiveContainer, Line } from "recharts";
import { colors } from "./top-ten.constant";
import { topTenCountriesProps } from "./top-ten-countries.interface";
import { getFormatValue } from "../../utils/get-format-value";

export const TopTenCountries: FC<topTenCountriesProps> = ({
  dataCountries,
}) => (
  <>
    <div className="c-top-ten-country">
      <h3 className="c-top-ten-country__title">Top 10</h3>
      <div className="c-top-ten-country__container">
        {dataCountries.map((data, index) => {
          let indx = index + 1;
          return (
            <div>
              <h4
                className="c-top-ten-country__subtitle"
                style={{ color: colors[index % colors.length] }}
              >
                Number {indx++}: {data.country}
              </h4>
              <ResponsiveContainer
                width="100%"
                height={400}
                className="c-top-ten-country__responsive"
              >
                <LineChart
                  className="c-top-ten-line-chart__line"
                  key={data.country}
                  width={400}
                  height={200}
                  data={data.year}
                >
                  <XAxis dataKey="year" />
                  <YAxis
                    type="number"
                    domain={["auto", "auto"]}
                    tickFormatter={getFormatValue}
                  />
                  <Line
                    type="monotone"
                    dataKey="internet_users"
                    name={data.country}
                    stroke={colors[index % colors.length]}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    </div>
  </>
);
