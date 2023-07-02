interface yearProps {
  year: string;
  internet_user: number;
}

export interface dataProps {
  country: string;
  year: yearProps[];
}

export interface evolutionCountryChartProps {
  data: dataProps[];
}
