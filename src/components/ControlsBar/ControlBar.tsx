import AllLetterNavBar from "../AllLetterNavBar/AllLetterNavBar";
import SearchBar from "../SearchBar/SearchBar";
import type IControlsBar from "./IControlBar";


const ControlsBar = ({ q, onQ, letter, onLetter, disableLetters }: IControlsBar) => (
    <div className="flex flex-col gap-3">
        <SearchBar value={q} onChange={onQ} placeholder="Search your favourite cocktail" />
        <AllLetterNavBar value={letter} onChange={onLetter} disabled={disableLetters} />
    </div>
);

export default ControlsBar;
