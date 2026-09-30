import ItemViewTemplate from "../../../ItemViewTemplate/ItemViewTemplate.tsx"
import Style from "../Style.tsx";
import article from "./Dirichlet.md?raw"


function Dirichlet() {
    //useMathJax()

    return (
        <>
            <Style></Style>
            <ItemViewTemplate
                title="Proof of pointwise convergence of Fourier Series"
                subtitle="Why does it converge on $$]-\pi,\ \pi[$$?"
                description={article}
            />
        </>
    );
}

export default Dirichlet;