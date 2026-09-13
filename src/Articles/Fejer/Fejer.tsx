import ItemViewTemplate from "../../ItemViewTemplate/ItemViewTemplate.tsx"
import article from "./Fejer.md?raw"

function Fejer() {
    //useMathJax()

    return (
        <>
            <ItemViewTemplate
                title="Convergence of Fourier Series to continuous functions"
                subtitle="Theorem of Lipót Fejér"
                description={article}
            />
        </>
    );
}

export default Fejer;