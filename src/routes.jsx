import { AreaChartOutlined, HomeOutlined, LineChartOutlined, NumberOutlined, UserOutlined } from "@ant-design/icons";
import Home from "./pages/Home.jsx";
import Coins from "./pages/Coins.jsx";
import CoinsPaged from "./pages/CoinsPaged.jsx";
import CoinChartPage from "./pages/CoinChartPage.jsx";
import Wizard from "./pages/Wizard.jsx";

export const routes = [
  {
    path: "/",
    label: "Home",
    icon: <HomeOutlined />,
    element: <Home />
  },
  {
    path: "/coins",
    label: "Quote",
    icon: <AreaChartOutlined />,
    element: <Coins />
  }, // пів години щоб пофіксити помилку (я забув кому)
  {
    path: "/coins-paged",
    label: "Pagination",
    icon: <NumberOutlined />,
    element: <CoinsPaged />
  }, // смішно, але тут фікс зайняв хвили 10 (ну та, також кома)
  {
    path: "/chart",
    label: "Graph",
    icon: <LineChartOutlined />,
    element: <CoinChartPage />
  }, // цю я всунув одразу вже
  {
    path: "/wizard",
    label: "Form",
    icon: <UserOutlined />,
    element: <Wizard />
  }, // тут також кома, про всяк випадок
];
