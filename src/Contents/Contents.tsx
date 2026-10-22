
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { useLocation } from 'react-router-dom'
import './Contents.css'

type ContentsProps = {
    setContentsOpen: Dispatch<SetStateAction<boolean>>;
};

type Section = {
    id: string;
    title: string;
};

function Contents({ setContentsOpen }: ContentsProps) {
    const [sections, setSections] = useState<Section[]>([]);
    const location = useLocation();

    useEffect(() => {
        const collectSections = () => {
            const elements = document.querySelectorAll<HTMLSpanElement>(
                'span[id]'
            );

            setSections(
                Array.from(elements).map(element => ({
                    id: element.id,
                    title: element.id
                }))
            );
        };

        // Collect sections after the current route's content renders.
        collectSections();

        // Also handle Markdown content rendered shortly afterward.
        const observer = new MutationObserver(collectSections);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => observer.disconnect();
    }, [location.pathname, location.search]);

    const navigateToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        setContentsOpen(false);
    };

    return (
        <div id="mobile_menu">
            <div id="menu_block">
                <div id="menu_text_block">
                    {sections.map(section => (
                        <span key={section.id}>
                            <div
                                className="p_white"
                                onClick={() => navigateToSection(section.id)}
                            >
                                {section.title}
                            </div>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Contents;
