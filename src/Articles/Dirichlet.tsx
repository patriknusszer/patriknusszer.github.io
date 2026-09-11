import ItemViewTemplate from "../ItemViewTemplate/ItemViewTemplate"
import { useMathJax } from "../Assets/ts/useMathJax.ts"

function Dirichlet() {
    useMathJax()

    return (
        <>
            <ItemViewTemplate
                title="Proof of pointwise convergence of Fourier Series"
                subtitle="Why does it converge on $]-\pi,\ \pi[$?"
                description={
                    <p>HELLO</p>
                }
            />
        </>
    );
}

export default Dirichlet;