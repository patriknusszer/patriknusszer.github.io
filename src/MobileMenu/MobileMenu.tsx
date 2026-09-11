import type { SetStateAction, Dispatch } from 'react'
import { Link } from 'react-router-dom'

type MobileMenuProps = {
    setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
};

function MobileMenu({setMobileMenuOpen} : MobileMenuProps) {
    return (
        <>
        <div id="mobile_menu">
            <div id="menu_block">
                <div id="menu_text_block">
                    <span>
                        <Link to="/Projects" onClick={() => setMobileMenuOpen(false)} className="p_white">Projects</Link>
                    </span>
                    <span>
                        <Link to="/Blog" onClick={() => setMobileMenuOpen(false)} className="p_white">Blog</Link>
                    </span>
                </div>
            </div>
        </div>
        </>
    );
}

export default MobileMenu
