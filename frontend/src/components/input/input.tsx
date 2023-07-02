import { FC } from "react";
import { InputProps } from "./input.interface";

export const Input: FC<InputProps> = ({
  data,
  selectedCountry,
  handleCountryChange,
  text,
}) => {
  return (
    <>
      <label htmlFor="country" id="country">
        {text}
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
    </>
  );
};
