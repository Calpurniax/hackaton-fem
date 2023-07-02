import { ChangeEvent } from "react";

import { dataProps } from "../evolution-country-chart";

export interface InputProps {
  data: dataProps[];
  selectedCountry: string;
  handleCountryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  text: string;
}
