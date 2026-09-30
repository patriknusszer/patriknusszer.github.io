import ItemViewTemplate from "../../../ItemViewTemplate/ItemViewTemplate.tsx"
import article from "./RSA.md?raw"
import { preprocessMarkdown } from "../Utils.ts";
import Style from "../Style.tsx";

function RSA() {
    //useMathJax()

    return (
        <>
            <Style></Style>
            <ItemViewTemplate
                title=" A short conclusion of RSA public key cryptography"
                subtitle="Linear congruencies, Euler-Fermat Theorem, RSA public key cryptography"
                description={preprocessMarkdown(article)}
            />
        </>
    );
}

export default RSA;