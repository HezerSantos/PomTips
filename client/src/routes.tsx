import App from "./App";
import Book from "./pages/book/book";
import Error404 from "./pages/errors/error404";
import Home from "./pages/home/home";
import Services from "./pages/services/services";
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
            {
                path: "/services",
                element: <Services />
            },
            {
                path: "/book",
                element: <Book />
            }
        ]
    }
]

export default routes