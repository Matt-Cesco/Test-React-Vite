import { Provider } from "react-redux";
import { store } from "@/store";
import { useSearchByLetterQuery, useSearchByNameQuery } from "@/services/cocktailApi";
import { useMemo, useState, useCallback } from "react";
import InitialState from "@/components/State/InitialState";
import LoadingState from "@/components/State/LoadingState";
import ErrorState from "@/components/State/ErrorState";
import useDebounced from "@/hooks/useDebounced";
import useFavourites from "@/hooks/useFavourites";
import { getVisibleList, getLoading, getError } from "@/lib/selectors";
import CocktailsGrid from "./components/CocktailGrid/CocktailGrid";
import ControlsBar from "./components/ControlsBar/ControlBar";
import FavouritesGrid from "./components/FavouritesGrid/FavouritesGrid";
import FiltersInUrl from "./components/FiltersInUrl/FitlersInUrl";
import Header from "./components/Header/Header";

const AppUI = () => {
    const [search, setSearch] = useState("");
    const [letter, setLetter] = useState("A");
    const dSearch = useDebounced(search, 500);
    const searching = dSearch.trim().length >= 3;

    const { data: byLetter, isLoading: l1, isError: e1 } = useSearchByLetterQuery(letter, { skip: searching });
    const { data: byName, isLoading: l2, isError: e2 } = useSearchByNameQuery(dSearch, { skip: !searching });

    const list = useMemo(() => getVisibleList(searching, byName, byLetter), [searching, byName, byLetter]);
    const loading = getLoading(searching, l2, l1);
    const error = getError(searching, e2, e1);

    const { favs, ids, toggle } = useFavourites();
    const handleToggle = (id: string) => {
        const item = list.find((c) => c.idDrink === id);
        if (item) toggle(item);
    };

    const handleRestore = useCallback(({ search: s, letter: l }: { search?: string; letter?: string }) => {
        if (typeof s !== "undefined") setSearch(s);
        if (l) setLetter(l.toUpperCase());
    }, []);

    return (
        <div className="min-h-screen bg-white text-black">
            <Header title="Cocktail Finder">
                <ControlsBar q={search} onQ={setSearch} letter={letter} onLetter={setLetter} disableLetters={searching} />
            </Header>

            <main className="container mx-auto p-6 space-y-6">
                <FiltersInUrl search={search} letter={letter} onRestore={handleRestore} />

                {!searching && list.length === 0 && !loading && !error && <InitialState />}
                {loading && <LoadingState />}
                {error && <ErrorState />}

                {!loading && !error && (
                    <>
                        <FavouritesGrid
                            items={favs}
                            favs={ids}
                            onToggle={(id) => {
                                const found = favs.find((f) => f.idDrink === id) || list.find((c) => c.idDrink === id);
                                if (found) toggle(found);
                            }}
                        />
                        <CocktailsGrid items={list} favs={ids} onToggle={handleToggle} />
                    </>
                )}
            </main>
        </div>
    );
};

const App = () => (
    <Provider store={store}>
        <AppUI />
    </Provider>
);

export default App;
