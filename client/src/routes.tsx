import App from "./App";
import Error404 from "./pages/errors/error404";
import Home from "./pages/home/home";
const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <Home />
            },
        ]
    }
]

export default routes