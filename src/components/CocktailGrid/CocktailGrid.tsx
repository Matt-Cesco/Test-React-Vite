import CocktailCard from "../CocktailCard/CocktailCard";
import type ICocktailsGrid from "./ICocktailGrid";


const CocktailsGrid = ({ items, favs, onToggle }: ICocktailsGrid) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {items.map((c) => (
            <CocktailCard key={c.idDrink} cocktail={c} fav={favs.has(c.idDrink)} onToggle={() => onToggle(c.idDrink)} />
        ))}
    </div>
);

export default CocktailsGrid;
