import { Population } from "@/types/data";
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
  name: string;
  data: Population[];
}

interface PopulationGraphProps {
  populations: PopulationGraphData[];
}

export default function PopulationGraph({ populations }: PopulationGraphProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
        <Tooltip />
        <Legend />

        {populations.map((data) => (
          <Line
            dataKey="value"
            data={data.data}
            name={data.name}
            key={data.name}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
