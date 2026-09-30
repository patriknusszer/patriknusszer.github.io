import ItemViewTemplate from "../../../ItemViewTemplate/ItemViewTemplate.tsx"
import Style from "../Style.tsx";
import article from "./Fejer.md?raw"

function Fejer() {
    //useMathJax()

    return (
        <>
            <Style></Style>
            <ItemViewTemplate
                title="Convergence of Fourier Series to continuous functions"
                subtitle="Theorem of Lipót Fejér"
                description={article}
            />
        </>
    );
}

export default Fejer;