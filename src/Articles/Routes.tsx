import Dirichlet from "./Dirichlet/Dirichlet";
import Fejer from "./Fejer/Fejer";
import RSA from "./RSA/RSA";

export const dirichletRoute = {
    path: "/Blog/Dirichlet",
    element: <Dirichlet />
};

export const fejerRoute = {
    path: "/Blog/Fejer",
    element: <Fejer />
};

export const rsaRoute = {
    path: "/Blog/RSA",
    element: <RSA />
};

export const frenchRoute = {
    path: "/Blog/French",
    element: <French />
};