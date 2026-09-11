import { Link } from "react-router-dom";
import './ItemsViewTemplate.css'

interface Item {
    page: string;
    name: string;
}

interface ItemCategory {
    name: string;
    items: Item[];
}

interface ItemsViewModel {
    categories: ItemCategory[];
}

interface ItemsViewTemplateProps {
    items: ItemsViewModel;
}

function ItemsViewTemplate({ items }: ItemsViewTemplateProps) {
    return (
        <>
            {items.categories.map((category) => (
                <div className="integrator" key={category.name}>
                    <div className="column">
                        <p className="heading">
                            {category.name}
                        </p>

                        {category.items.map((item) => (
                            <Link
                                key={item.page}
                                className="plain_button"
                                type="button"
                                to={item.page}
                            >
                                <p>{item.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}

export default ItemsViewTemplate;