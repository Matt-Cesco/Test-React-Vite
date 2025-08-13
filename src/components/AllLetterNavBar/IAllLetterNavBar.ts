export default interface IAllLetterNavBar {
    value: string;
    onChange: (letter: string) => void;
    disabled?: boolean;
}
