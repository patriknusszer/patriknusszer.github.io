import Dirichlet from "./Dirichlet/Dirichlet";
import Fejer from "./Fejer/Fejer";


export const dirichletRoute = {
    path: "/Blog/dirichlet",
    element: <Dirichlet />
};

export const fejerRoute = {
    path: "/Blog/fejer",
    element: <Fejer />
};