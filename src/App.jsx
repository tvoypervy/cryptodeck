import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import { routes } from "./routes.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    {routes.map((r) => (
                        <Route key={r.path} path={r.path} element={r.element} />
                    ))}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
