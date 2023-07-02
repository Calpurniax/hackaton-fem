import { FC } from "react";
import {
  XAxis,
  YAxis,
  AreaChart,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import { totalUsersProps } from "./total-user-chart.interface";
import "../../styles/components/total-users-charts.scss";
import { getFormatValue } from "../../utils/get-format-value";

export const TotalUsers: FC<totalUsersProps> = ({ userXYear, currentYear }) => (
  <div className="c-total-users">
    <h3 className="c-total-users__title">Internet total users</h3>
    <ResponsiveContainer
      width="100%"
      height={400}
      className="c-total-users__responsive"
    >
      <AreaChart data={userXYear.filter((item) => item.year <= currentYear)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={getFormatValue} />
        <Tooltip formatter={getFormatValue} />
        <Area
          type="monotone"
          dataKey="internet_users"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
