import MobileMenu from "../MobileMenu/MobileMenu"
import { createPortal } from 'react-dom'
import './MobileButton.css'
import type { Dispatch, SetStateAction } from "react";


type MobileButtonProps = {
    mobileMenuOpen: boolean
    setMobileMenuOpen: Dispatch<SetStateAction<boolean>>
}

function MobileButton({ mobileMenuOpen, setMobileMenuOpen } : MobileButtonProps) {
    const menuCharacter = mobileMenuOpen ? "×" : "=";

    return (
        <>
            <div id="mobile_menu_btn">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="plain_button">
                    {menuCharacter}
                </button>
            </div>
            {mobileMenuOpen && createPortal(
                <MobileMenu setMobileMenuOpen={setMobileMenuOpen} />,
                document.body
            ) }
        </>
    )
}

export default MobileButton