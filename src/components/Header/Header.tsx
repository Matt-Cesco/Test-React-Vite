import type IHeader from "./IHeader";

const Header = ({ title, children }: IHeader) => (
    <header className="border-b">
        <div className="container mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {children}
        </div>
    </header>
);

export default Header;
