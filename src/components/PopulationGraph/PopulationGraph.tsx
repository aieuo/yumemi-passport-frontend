import { Population, Prefecture } from "@/types/data";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface PopulationGraphData {
  prefecture: Prefecture;
  data: Population[];
}

interface PopulationGraphProps {
  populations: PopulationGraphData[];
}

const generateColor = (n: number) => {
  const hue = Math.floor(360 * (n / 47));
  const saturation = 70;
  const lightness = 60;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default function PopulationGraph({ populations }: PopulationGraphProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{
        overflowY: "hidden",
      }}
    >
      <LineChart
        margin={{
          top: 5,
          left: 45,
          right: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          type="number"
          domain={["dataMin", "dataMax"]}
          height={50}
          tickCount={populations[0]?.data?.length || 0}
          angle={-15}
        >
          <Label position="insideBottom">年度</Label>
        </XAxis>
        <YAxis dataKey="value">
          <Label
            angle={-90}
            position="insideLeft"
            offset={-25}
            style={{ textAnchor: "middle" }}
          >
            人数
          </Label>
        </YAxis>
        <Tooltip
          formatter={(value, name) => [`${value.toLocaleString()}人`, name]}
          labelFormatter={(label) => `${label}年`}
        />
        <Legend />

        {populations.map((data, i) => {
          const color = generateColor(i);

          return (
            <Line
              dataKey="value"
              data={data.data}
              name={data.prefecture.prefName}
              key={data.prefecture.prefName}
              stroke={color}
              activeDot={{ r: 5, fill: color }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
