import { render } from "@testing-library/react";
import type ICocktailsGrid from "./ICocktailGrid";

afterEach(() => jest.clearAllMocks());

jest.mock("../CocktailCard/CocktailCard", () => ({
    __esModule: true,
    default: jest.fn(),
}));

import CocktailsGrid from "./CocktailGrid";
import MockCard from "../CocktailCard/CocktailCard";


const fakeCocktailGridData: ICocktailsGrid[] = [
    {
        items: [
            {
                idDrink: "999999",
                strDrink: "Manhattan",
                strAlcoholic: "Alcoholic",
                strCategory: "Cocktail",
                strGlass: "Cocktail glass",
                strInstructions: "Stir with ice. Strain into glass.",
                strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
            },
            {
                idDrink: "123456",
                strDrink: "Margarita",
                strAlcoholic: "Alcoholic",
                strCategory: "Cocktail",
                strGlass: "Cocktail glass",
                strInstructions: "Shake with ice. Strain into glass.",
                strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
            },
        ],
        favs: new Set<string>(["123456"]),
        onToggle: jest.fn(),
    },
];

describe("CocktailsGrid compoennte tests", () => {
    test("CocktailsGrid - passing props", () => {
        const data = fakeCocktailGridData[0];
        render(<CocktailsGrid items={data.items} favs={data.favs} onToggle={data.onToggle} />);
        for (let i = 0; i < data.items.length; i += 1) {
            const item = data.items[i];
            const expectedFav = data.favs.has(item.idDrink);
            expect(MockCard).toHaveBeenNthCalledWith(
                i + 1,
                expect.objectContaining({
                    cocktail: item,
                    fav: expectedFav,
                    onToggle: expect.any(Function),
                }),
                undefined
                // expect.anything()
            );
        }
    });

    test("CocktailsGrid - onToggle calls with correct id", () => {
        const data = fakeCocktailGridData[0];
        render(<CocktailsGrid items={data.items} favs={data.favs} onToggle={data.onToggle} />);
        const firstCallProps = (MockCard as jest.Mock).mock.calls[0][0];
        const secondCallProps = (MockCard as jest.Mock).mock.calls[1][0];
        firstCallProps.onToggle();
        expect(data.onToggle).toHaveBeenCalledWith(data.items[0].idDrink);
        secondCallProps.onToggle();
        expect(data.onToggle).toHaveBeenCalledWith(data.items[1].idDrink);
    });
});
