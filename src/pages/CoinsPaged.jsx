import { useState } from "react";
import { Table, Avatar, Space, Typography } from "antd";
import { useCoinsPaged } from "../hooks/useCoinsPaged";

const { Text } = Typography;

// форматування ті ж що і у першій таблиці 
const formatCompact = (num) => {
  if (num == null) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(num);
};

const formatPrice = (num) => {
  if (num == null) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(num);
};

function CoinsPaged() {
  // тут створив стан, а трохи далі сунув в хук
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useCoinsPaged(currentPage);

  const columns = [
    {
      title: "#",
      dataIndex: "market_cap_rank",
      key: "market_cap_rank",
      sorter: (a, b) => a.market_cap_rank - b.market_cap_rank,
      width: 70,
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar src={record.image} size="small" />
          <Text strong>{record.name}</Text>
          <Text type="secondary" style={{ textTransform: "uppercase" }}>
            {record.symbol}
          </Text>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Price",
      dataIndex: "current_price",
      key: "current_price",
      render: (price) => formatPrice(price),
      sorter: (a, b) => a.current_price - b.current_price,
    },
    {
      title: "24h %",
      dataIndex: "price_change_percentage_24h",
      key: "price_change_percentage_24h",
      render: (pct) => {
        if (pct == null) return "-";
        const isPositive = pct >= 0;
        return (
          // тут тернарний бо подобається:)
          <span style={{ color: isPositive ? "#52c41a" : "#ff4d4f", fontWeight: 600 }}>  
            {isPositive ? "+" : ""}{pct.toFixed(2)}%
          </span>
        );
      },
      sorter: (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
      render: (cap) => formatCompact(cap),
      sorter: (a, b) => a.market_cap - b.market_cap,
    },
    {
      title: "Volume 24h",
      dataIndex: "total_volume",
      key: "total_volume",
      render: (vol) => formatCompact(vol),
      sorter: (a, b) => a.total_volume - b.total_volume,
    },
  ];

  if (isError) {
    return (
      <div style={{ padding: 24, color: "red" }}>
        Page load error.
      </div>
    );
  }

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="id"
      loading={isLoading || isFetching} // тут приліпив лоадер і при старті і при перемиканні
      scroll={{ y: 550 }} // клеїмо
      pagination={{
        current: currentPage,
        pageSize: 20, // в тз було 20 елементів на сторінку
        total: 200, // тут лімітів не було, тому най буде 10 сторінок
        onChange: (page) => setCurrentPage(page),
        placement: "bottomCenter",   // тут в процесі дізнався що position застарів
        showSizeChanger: false,
      }}
    />
  );
}

export default CoinsPaged;