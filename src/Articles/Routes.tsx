import Dirichlet from "./Dirichlet/Dirichlet";
import Fejer from "./Fejer/Fejer";
import RSA from "./RSA/RSA";

export const dirichletRoute = {
    path: "/Blog/dirichlet",
    element: <Dirichlet />
};

export const fejerRoute = {
    path: "/Blog/fejer",
    element: <Fejer />
};

export const rsaRoute = {
    path: "/Blog/RSA",
    element: <RSA />
};