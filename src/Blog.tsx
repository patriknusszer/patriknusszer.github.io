import ItemsViewTemplate from "./ItemsViewTemplate/ItemsViewTemplate";

interface Item {
    page: string;
    name: string;
}

interface ItemCategory {
    name: string;
    items: Item[];
}

interface ItemsViewModel {
    categories: ItemCategory[];
}

function Blog() {
    const model: ItemsViewModel = {
        categories: [
            {
                name: "Algorithms",
                items: [
                    {
                        page: "/Blog/knuthmorrispratt",
                        name: "Knuth-Morris-Pratt"
                    },
                    {
                        page: "/Blog/floydstortoiseandhare",
                        name: "Floyd's tortoise and hare"
                    },
                    {
                        page: "/Blog/mergesort",
                        name: "Mergesort"
                    },
                    {
                        page: "/Blog/heapsort",
                        name: "Heapsort"
                    },
                    {
                        page: "/Blog/dijkstra",
                        name: "Dijkstra"
                    }
                ]
            },

            {
                name: "Mathematics",
                items: [
                    {
                        page: "/Blog/fouriertransform",
                        name: "Fourier transform"
                    },
                    {
                        page: "/Blog/dirichlet",
                        name: "Fourier series: differentiable functions' pointwise convergence"
                    },
                    {
                        page: "/Blog/fejer",
                        name: "Fourier series: continuous functions' pointwise convergence"
                    },
                    {
                        page: "/Blog/rsa",
                        name: "Euler-Fermat theorem, linear congruencies, RSA"
                    }
                ]
            },

            {
                name: "Other",
                items: [
                    {
                        page: "/Blog/highlevellanguages",
                        name: "High level languages behind the scenes"
                    }
                ]
            }
        ]
    };

    return <ItemsViewTemplate items={model} />;
}

export default Blog;