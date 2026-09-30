import ItemViewTemplate from "../../../ItemViewTemplate/ItemViewTemplate.tsx"
import Style from "../Style.tsx";
import article from "./Mahalanobis.md?raw"


function Mahalanobis() {
    //useMathJax()

    return (
        <>
            <Style></Style>
            <ItemViewTemplate
                title="Generative LDA & Mahalanobis distance"
                subtitle="The problem of correlation with exponentially weighted z-scores"
                description={article}
            />
        </>
    );
}

export default Mahalanobis;