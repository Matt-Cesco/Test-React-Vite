import { render, screen, fireEvent, within } from "@testing-library/react";
import CocktailCard from "./CocktailCard";
import type ICocktailCard from "./ICocktailCard";
import * as DialogMod from "@/components/ui/dialog";

afterEach(() => jest.clearAllMocks());

jest.mock("@/components/ui/dialog", () => {
    const React = require("react");
    const Dialog = jest.fn((p) => React.createElement("div", null, p.children));
    const DialogTrigger = jest.fn((p) => React.createElement(React.Fragment, null, p.children));
    const DialogHeader = jest.fn((p) => React.createElement("div", null, p.children));
    const DialogTitle = jest.fn((p) => React.createElement("h2", null, p.children));
    const DialogContent = jest.fn((p) => React.createElement("div", { role: "dialog", className: p.className }, p.children));
    return { __esModule: true, Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent };
});

export const fakeCocktailCard: ICocktailCard = {
    cocktail: {
        idDrink: "123456",
        strDrink: "Margarita",
        strAlcoholic: "Alcoholic",
        strCategory: "Cocktail",
        strGlass: "Cocktail glass",
        strInstructions: "Shake with ice. Strain into glass.",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    },
    fav: false,
    onToggle: jest.fn(),
};

describe("CocktailCard Tests", () => {
    test("CocktailCard - renders wrapper classes", () => {
        const { container } = render(<CocktailCard cocktail={fakeCocktailCard.cocktail} fav={fakeCocktailCard.fav} onToggle={fakeCocktailCard.onToggle} />);
        const wrapper = container.firstElementChild as HTMLElement;
        expect(wrapper).toHaveClass("relative", "border", "rounded", "overflow-hidden");
    });

    test("CocktailCard - shows title and badges", () => {
        render(<CocktailCard cocktail={fakeCocktailCard.cocktail} fav={fakeCocktailCard.fav} onToggle={fakeCocktailCard.onToggle} />);
        const trigger = screen.getByRole("button", { name: /margarita/i });
        expect(within(trigger).getByText("Margarita")).toBeInTheDocument();
        expect(screen.getByText("Alcoholic")).toBeInTheDocument();
        expect(screen.getByText("Cocktail glass")).toBeInTheDocument();
    });

    test("CocktailCard - heart button triggers onToggle", () => {
        const onToggle = jest.fn();
        render(<CocktailCard cocktail={fakeCocktailCard.cocktail} fav={fakeCocktailCard.fav} onToggle={onToggle} />);
        fireEvent.click(screen.getByRole("button", { name: /favourite/i }));
        expect(onToggle).toHaveBeenCalledTimes(1);
    });
    test("CocktailCard - dialog renders with expected props and title", () => {
        render(<CocktailCard cocktail={fakeCocktailCard.cocktail} fav={fakeCocktailCard.fav} onToggle={fakeCocktailCard.onToggle} />);
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(DialogMod.DialogContent).toHaveBeenCalled();
        expect(DialogMod.DialogContent).toHaveBeenCalledWith(expect.objectContaining({ className: "max-w-2xl" }), undefined);
        expect(DialogMod.DialogTitle).toHaveBeenCalledWith(expect.objectContaining({ children: fakeCocktailCard.cocktail.strDrink }), undefined);
    });
});
