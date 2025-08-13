export default interface IControlsBar {
    q: string;
    onQ: (v: string) => void;
    letter: string;
    onLetter: (v: string) => void;
    disableLetters?: boolean;
}
