import "./App.css";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  CartesianGrid,
  Tooltip,
  Area,
  LineChart,
  Legend,
  Line,
} from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [userXYear, setUserXYear] = useState([]);
  const [dataCountries, setDataCountries] = useState([]);

  const initialValue = data[0]?.country;
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      const response = await fetch("http://localhost:8080/countries/");
      const countries = await response.json();

      const dataCountries = await Promise.all(
        countries.Countries.map(async (country) => {
          const response = await fetch(
            `http://localhost:8080/country/${country}`
          );
          const year = await response.json();

          const transformedData = Object.entries(year.Data).map(
            ([year, data]) => ({
              year,
              internet_users: data.internet_users_number,
            })
          );

          const usersXCountry = transformedData.reduce(
            (total, data) => total + data.internet_users,
            0
          );

          const totalUsersXCountry = usersXCountry / transformedData.length;

          return { country, year: transformedData, totalUsersXCountry };
        })
      );

      getUserPerYear(dataCountries);

      const top10Countries = [...dataCountries]
        .sort((a, b) => b.totalUsersXCountry - a.totalUsersXCountry)
        .slice(0, 10)
        .map(({ country }) => country);

      const top10DataCountries = dataCountries.filter(({ country }) =>
        top10Countries.includes(country)
      );

      setData(dataCountries);
      setDataCountries(top10DataCountries);
    } catch (error) {
      console.log("Error fetching countries", error);
      return [];
    }
  };

  const getUserPerYear = async (data) => {
    try {
      const allYears = Array.from(
        new Set(data.flatMap((item) => item.year.map((data) => data.year)))
      );

      const dataUsers = await Promise.all(
        allYears.map(async (year) => {
          const response = await fetch(
            `http://localhost:8080/internet-users/${year}`
          );
          const data = await response.json();
          return { year, internet_users: data.Data.Total };
        })
      );
      return setUserXYear(dataUsers);
    } catch (error) {
      console.log("Error fetching countries", error);
      return [];
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  console.log(dataCountries);
  return (
    <div className="App">
      {userXYear && (
        <AreaChart
          width={500}
          height={400}
          data={userXYear}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis dataKey="internet_users" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="internet_users"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      )}
      <label htmlFor="country" id="country">
        Search for a country
      </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        {data?.map((item, index) => {
          return (
            <option key={index} value={item?.country}>
              {item?.country}
            </option>
          );
        })}
      </select>
      <BarChart
        width={340}
        height={150}
        data={data?.find((item) => item.country === selectedCountry)?.year}
      >
        <Bar dataKey="internet_users" fill="#8884d8" width={100} height={100} />

        <XAxis dataKey="year" />
        <YAxis dataKey="internet_users" />
      </BarChart>

      <LineChart
        width={500}
        height={300}
        data={dataCountries.flatMap((data) => data.year)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="year" />
        <YAxis />
        <Legend />

        {dataCountries.map((data) => (
          <Line
            key={data.country}
            type="monotone"
            dataKey="internet_users"
            data={data.year}
            name={data.country}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </div>
  );
}

export default App;
