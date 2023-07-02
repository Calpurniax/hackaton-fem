import { dataProps } from "../components/evolution-country-chart";

export const getUserPerYear = async (
  data: dataProps[],
  setUserXYear: React.Dispatch<React.SetStateAction<any[]>>
): Promise<void> => {
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
  }
};
