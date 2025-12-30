
// Now accepts 'children', which will be our Route content
export default function Main({ children }) {
    return (
        <main className="w-full max-w-300 mx-auto grow
                 py-xl px-lg bg-body">
            {children}
        </main>
    )
}