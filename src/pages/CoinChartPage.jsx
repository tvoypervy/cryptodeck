import { useState } from "react";
import { Card, Segmented, Button, Spin, Space, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useCoinChart } from "../hooks/useCoinChart";

const { Title } = Typography;

function CoinChartPage() {
  // стан для селект монети і хукаємо
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const { data, isLoading, isFetching, refetch, isError, error } = useCoinChart(selectedCoin);

  const coinOptions = [
    { label: "Bitcoin", value: "bitcoin" },
    { label: "Ethereum", value: "ethereum" },
    { label: "Dogecoin", value: "dogecoin" },
  ];

  if (isError) {
    return <div style={{ color: "red", padding: 24 }}>Error: {error.message}</div>;
  }

  return (
    <Card>
      {/* Тут тако виявилось що потрібно orientation, бо direction старий: */}
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <Title level={3} style={{ margin: 0 }}>7 days analis</Title>
          
          <Space size="middle">
            <Segmented
              options={coinOptions}
              value={selectedCoin}
              onChange={(value) => setSelectedCoin(value)}
            />
            <Button 
              type="primary" 
              icon={<ReloadOutlined />} 
              onClick={() => refetch()}
              loading={isFetching && !isLoading} 
            >
              Оновити
            </Button>
          </Space>
        </div>

        <Spin spinning={isLoading} description="Graph loading...">
          <div style={{ 
            width: "100%", 
            display: "flex", 
            justifyContent: "center", 
            background: "rgba(0,0,0,0.02)", 
            borderRadius: 8, 
            padding: "16px 16px 16px 0" 
          }}>
            {data && (
              <LineChart width={750} height={350} data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false}
                  interval={Math.floor(data.length / 7)} 
                  style={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={["auto", "auto"]} 
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: 12 }}
                  tickFormatter={(tick) => `$${tick}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, "Price"]}
                  contentStyle={{ borderRadius: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#6495ED" // мій неймовірний колір (жартую, я би обрав рожевий, але в тз синій)
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            )}
          </div>
        </Spin>
      </Space>
    </Card>
  );
}

export default CoinChartPage;