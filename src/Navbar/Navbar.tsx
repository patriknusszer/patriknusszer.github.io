import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MobileButton from '../MobileButton/MobileButton'
import './Navbar.css'

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(
        window.matchMedia(query).matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const handler = () => {
            setMatches(mediaQuery.matches);
        };

        mediaQuery.addEventListener("change", handler);

        return () => {
            mediaQuery.removeEventListener("change", handler);
        };
    }, [query]);

    return matches;
}

function Navbar() {
  const isMobile = useMediaQuery("(max-width: 770px)")
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false)

  return (
    <>
        <div id="navbar">
            {isMobile && (<MobileButton mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />)}
            <Link onClick={() => setMobileMenuOpen(false)} to="/" id="navbar_logo">
                <svg width="100%" height="100%" viewBox="0 0 118 116" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 1.41421
                }}>
                <g transform="matrix(1,0,0,1,-627.592,-249.486)">
                <g transform="matrix(1,0,0,1,-600.157,-1353.94)">
                <g transform="matrix(1,0,0,1,600.157,1353.94)">
                <path id="nuss" d="M640.953,358.732C639.776,359.017 638.356,359.434 636.819,360.043C633.457,361.376 629.439,363.663 628.073,364.46L627.711,364.823L627.691,364.831C627.691,364.831 627.738,364.752 627.824,364.607C627.673,364.695 627.592,364.744 627.592,364.744L627.6,364.725L627.975,364.349C628.772,362.984 631.059,358.966 632.392,355.603C633.114,353.779 633.568,352.119 633.849,350.836C624.28,334.108 632.585,305.465 654.46,282.048C654.617,278.833 655.711,275.901 658.114,273.499C672.435,259.178 698.086,261.576 715.362,278.852C732.637,296.127 735.035,321.779 720.715,336.099C718.073,338.741 714.886,339.895 711.444,340.019C687.05,362.529 657.156,370.372 640.953,358.732ZM719.388,275.041C719.388,275.041 737.307,263.1 743.705,256.701C745.355,255.052 745.355,252.373 743.705,250.723C742.055,249.073 739.377,249.073 737.727,250.723C731.328,257.122 719.388,275.041 719.388,275.041Z" fill="#FFFFFF" />

                            </g>
                        </g>
                    </g>
                </svg>
            </Link>

            <Link onClick={() => setMobileMenuOpen(false)} to="/Projects" title="Projects" className="menuitem">Projects</Link>
            <Link onClick={() => setMobileMenuOpen(false)} to="/Blog" title="Blog" className="menuitem">Blog</Link>
        </div>
    </>
  )
}

export default Navbar
