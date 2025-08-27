import { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type ICocktailCard from "./ICocktailCard";

const CocktailCard = ({ cocktail, fav, onToggle }: ICocktailCard) => {
    const img = cocktail.strDrinkThumb ? `${cocktail.strDrinkThumb}/large` : "";
    const desc = (cocktail.strInstructions || "").slice(0, 120) + ((cocktail.strInstructions?.length ?? 0) > 120 ? "…" : "");

    const items = useMemo(() => {
        const out: string[] = [];
        for (let i = 1; i <= 15; i++) {
            const ing = (cocktail as any)[`strIngredient${i}`] as string | null | undefined;
            if (!ing) continue;
            const mea = (cocktail as any)[`strMeasure${i}`] as string | null | undefined;
            out.push(`${mea ? `${mea} ` : ""}${ing}`);
        }
        return out;
    }, [cocktail]);

    return (
        <div className="relative border rounded overflow-hidden">
            <button
                aria-label={fav ? "Unfavourite" : "Favourite"}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onToggle();
                }}
                className={`absolute right-2 bottom-2 z-10 rounded-full px-2 py-1 text-sm border bg-white/90 ${fav ? "border-red-500 text-red-600" : ""}`}
            >
                &hearts;
            </button>

            <Dialog>
                <DialogTrigger asChild>
                    <button className="text-left w-full cursor-pointer">
                        {img && <img src={img} alt={cocktail.strDrink} className="h-48 w-full object-cover" />}
                        <div className="p-3">
                            <div className="font-medium line-clamp-2 min-h-[3rem]">{cocktail.strDrink}</div>
                            <div className="text-sm text-gray-600 line-clamp-3 min-h-[3.5rem]">{desc || "No description"}</div>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-700">
                                {cocktail.strAlcoholic && <span className="border rounded px-2 py-0.5">{cocktail.strAlcoholic}</span>}
                                {cocktail.strGlass && <span className="border rounded px-2 py-0.5">{cocktail.strGlass}</span>}
                            </div>
                        </div>
                    </button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{cocktail.strDrink}</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-4">
                        {img && <img src={img} alt={cocktail.strDrink} className="rounded" />}
                        <div>
                            <p className="text-sm whitespace-pre-wrap">{cocktail.strInstructions || "No instructions"}</p>
                            <h3 className="mt-3 font-medium">Ingredients</h3>
                            <ul className="list-disc pl-5 text-sm">{items.length ? items.map((t, i) => <li key={i}>{t}</li>) : <li>None</li>}</ul>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CocktailCard;
