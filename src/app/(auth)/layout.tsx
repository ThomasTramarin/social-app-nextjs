export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="bg-light-1 dark:bg-dark-1 h-screen">{children}</div>;
}