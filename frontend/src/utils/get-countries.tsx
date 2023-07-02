import { getUserPerYear } from "./get-user-per-year";

export const getCountries = async (
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  setDataCountries: React.Dispatch<React.SetStateAction<any[]>>,
  setUserXYear: React.Dispatch<React.SetStateAction<any[]>>
): Promise<void> => {
  try {
    const response = await fetch("http://localhost:8080/countries/");
    const countries = await response.json();

    const dataCountries = await Promise.all(
      countries.Countries.map(async (country: string) => {
        const response = await fetch(
          `http://localhost:8080/country/${country}`
        );
        const year = await response.json();

        const transformedData = Object.entries(year.Data).map(
          ([year, data]: [string, any]) => ({
            year,
            internet_users: data.internet_users_number,
          })
        );

        const usersXCountry = transformedData.reduce(
          (total: number, data: any) => total + data.internet_users,
          0
        );

        const totalUsersXCountry = usersXCountry / transformedData.length;

        return { country, year: transformedData, totalUsersXCountry };
      })
    );

    getUserPerYear(dataCountries, setUserXYear);

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
  }
};
