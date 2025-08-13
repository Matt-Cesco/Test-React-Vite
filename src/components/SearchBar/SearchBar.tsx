import type ISearchBar from "./ISearchBar";

const SearchBar = ({ value, onChange, placeholder, disabled }: ISearchBar) => (
    <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="border rounded px-3 py-2 w-full max-w-md disabled:opacity-50"
    />
);

export default SearchBar;
