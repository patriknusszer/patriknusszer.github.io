import ItemViewTemplate from "../../../ItemViewTemplate/ItemViewTemplate.tsx"
import Style from "../Style.tsx";
import { preprocessMarkdown } from "../Utils.ts";
import article from "./Radon.md?raw"


function Radon() {
    //useMathJax()

    return (
        <>
            <Style></Style>
            <ItemViewTemplate
                title="Radiography with CT scanner"
                subtitle="Description of how the CT scanner works"
                description={preprocessMarkdown(article)}
            />
        </>
    );
}

export default Radon;