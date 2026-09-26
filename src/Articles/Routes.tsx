import Dirichlet from "./Maths/Dirichlet/Dirichlet";
import Fejer from "./Maths/Fejer/Fejer";
import RSA from "./Maths/RSA/RSA";
import French from "./Language/French/French";
import Mahalanobis from "./Maths/Mahalanobis/Mahalanobis";

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

export const mahalanobisRoute = {
    path: "/Blog/Mahalanobis",
    element: <Mahalanobis />
};