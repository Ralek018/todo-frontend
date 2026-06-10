function FooterComponent() {
    return (
        <footer className="footer text-center text-muted py-3 mt-5 border-top">
            <div className="container">
                © {new Date().getFullYear()} TodoApp — built by Aleksa
            </div>
        </footer>
    )
}

export default FooterComponent