import type IFavouritesGrid from "./IFavouritesGrid";

const FavouritesGrid = ({ items, onToggle, max = 12 }: IFavouritesGrid) => {
    const list = items
        .filter((c) => c && c.idDrink && c.strDrink)
        .slice(0, max);
    if (!list.length) return null;
    return (
        <div className="space-y-2">
            <div className="text-sm font-medium">Favourites</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {list.map((c) => (
                    <div key={c.idDrink} className="relative border rounded overflow-hidden ">
                        {c.strDrinkThumb && <img src={`${c.strDrinkThumb}/medium`} alt="" className="h-32 w-full object-cover" />}
                        <div className="p-2 text-sm truncate">{c.strDrink}</div>
                        <button
                            type="button"
                            onClick={() => onToggle(c.idDrink)}
                            aria-label="toggle favourite"
                            className="absolute right-2 bottom-2 rounded-full px-2 py-1 text-sm border bg-white/90"
                        >
                            <span className="ml-auto text-red-600" aria-hidden="true">
                                &hearts;
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavouritesGrid;
