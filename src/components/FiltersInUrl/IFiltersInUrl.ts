export default interface IFiltersInUrl {
    search: string;
    letter: string;
    onRestore: (v: { search?: string; letter?: string }) => void;
}
