export default interface ISearchBar {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    disabled?: boolean;
}
