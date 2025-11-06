import App from "./App";
import Error404 from "./pages/errors/error404";
const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <></>
            },
        ]
    }
]

export default routes