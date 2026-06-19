import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <Card>
      <Title level={2}>Домашня</Title>
      <Paragraph>
        Тут шаблон для старту, бо чому ні? форма робилась, бо в думках хотілось
        перетворити це на щось трохи більше, але воно відклалось на колись
      </Paragraph>
      <Paragraph type="secondary">Стек: React + Vite + React Router.</Paragraph>
    </Card>
  );
}

export default Home;
