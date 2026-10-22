import MobileMenu from "../MobileMenu/MobileMenu"
import { createPortal } from 'react-dom'
import './ContentsButton.css'
import type { Dispatch, SetStateAction } from "react";
import Contents from "../Contents/Contents";


type ContentsButtonProps = {
    contentsOpen: boolean
    setContentsOpen: Dispatch<SetStateAction<boolean>>
}

function ContentsButton({ contentsOpen, setContentsOpen } : ContentsButtonProps) {
    const menuCharacter = contentsOpen ? "Close" : "ABC";

    return (
        <>
            <div id="contents_btn">
                <button onClick={() => setContentsOpen(!contentsOpen)} className="plain_button">
                    {menuCharacter}
                </button>
            </div>
            {contentsOpen && createPortal(
                <Contents setContentsOpen={setContentsOpen} />,
                document.body
            ) }
        </>
    )
}

export default ContentsButton