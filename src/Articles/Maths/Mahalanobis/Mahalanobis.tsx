import ItemViewTemplate from "../../../ItemViewTemplate/ItemViewTemplate.tsx"
import article from "./Mahalanobis.md?raw"


function Mahalanobis() {
    //useMathJax()

    return (
        <>
            <ItemViewTemplate
                title="Generative LDA & Mahalanobis distance"
                subtitle="The problem of correlation with exponentially weighted z-scores"
                description={article}
            />
        </>
    );
}

export default Mahalanobis;