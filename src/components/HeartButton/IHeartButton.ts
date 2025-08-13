export default interface IHeartButton {
    active: boolean;
    onToggle: () => void;
    className?: string;
}
