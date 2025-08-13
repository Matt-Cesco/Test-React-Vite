import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type ICocktailModal from "./ICocktailModal";
import type { Cocktail } from "@/types";

type N = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
type IngKey = `strIngredient${N}`;
type MeaKey = `strMeasure${N}`;
type WithIngredients = Cocktail & Partial<Record<IngKey | MeaKey, string | null>>;

const CocktailModal = ({ cocktail, trigger }: ICocktailModal) => {
    const data = cocktail as WithIngredients;
    const img = data.strDrinkThumb ? `${data.strDrinkThumb}/large` : "";

    const items = (() => {
        const out: string[] = [];
        for (let i = 1 as N; i <= 15; i++) {
            const ik = `strIngredient${i}` as IngKey;
            const mk = `strMeasure${i}` as MeaKey;
            const ing = data[ik];
            if (!ing) continue;
            const mea = data[mk];
            out.push(`${mea ? `${mea} ` : ""}${ing}`);
        }
        return out;
    })();

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{data.strDrink}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-4">
                    {img && <img src={img} alt={data.strDrink} className="rounded" />}
                    <div>
                        <p className="text-sm whitespace-pre-wrap">{data.strInstructions || "No instructions"}</p>
                        <div className="mt-3 font-medium">Ingredients</div>
                        <ul className="list-disc pl-5 text-sm">{items.length ? items.map((t, i) => <li key={i}>{t}</li>) : <li>None</li>}</ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CocktailModal;
