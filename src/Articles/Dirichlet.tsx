import ItemViewTemplate from "../ItemViewTemplate/ItemViewTemplate"
import { useMathJax } from "../Assets/ts/useMathJax.ts"
import article from "./Dirichlet.md?raw"

function Dirichlet() {
    //useMathJax()

    return (
        <>
            <ItemViewTemplate
                title="Proof of pointwise convergence of Fourier Series"
                subtitle="Why does it converge on $]-\pi,\ \pi[$?"
                description={article}
            />
        </>
    );
}

export default Dirichlet;