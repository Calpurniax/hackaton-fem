import "./App.scss";
import { useEffect, useState } from "react";
import { getCountries } from "./utils/get-countries";
import { TotalUsers, userXYearProps } from "./components/total-users-chart";
import {
  EvolutionCountryChart,
  dataProps,
} from "./components/evolution-country-chart";
import { TopTenCountries } from "./components/top-ten-countries";
import { Header } from "./components/header";
import { MapChart } from "./components/map-chart";

function App() {
  const [data, setData] = useState<dataProps[]>([]);
  const [userXYear, setUserXYear] = useState<userXYearProps[]>([]);
  const [dataCountries, setDataCountries] = useState<dataProps[]>([]);
  const [currentYear, setCurrentYear] = useState<string>("");

  useEffect(() => {
    getCountries(setData, setDataCountries, setUserXYear);
  }, []);

  useEffect(() => {
    if (userXYear.length > 0) {
      setCurrentYear(userXYear[0].year);
      const interval = setInterval(() => {
        setCurrentYear((prevYear) => {
          const currentIndex = userXYear.findIndex(
            (item) => item.year === prevYear
          );
          const nextIndex = currentIndex + 1;
          const nextYear = userXYear[nextIndex]?.year;

          if (nextYear) {
            return nextYear;
          } else {
            clearInterval(interval);
            return prevYear;
          }
        });
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [userXYear]);

  return (
    <div>
      <Header />
      {data.length > 0 && (
        <>
          <MapChart data={dataCountries} />
          <div className="c-app">
            {userXYear && (
              <TotalUsers userXYear={userXYear} currentYear={currentYear} />
            )}
            {data && <EvolutionCountryChart data={dataCountries} />}
            {dataCountries && <TopTenCountries dataCountries={dataCountries} />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
