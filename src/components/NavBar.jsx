import Link from "next/link";

export default function NavBar({ children, active }) {
    return (
        <aside id="default-sidebar" className="z-40 w-64 h-screen overflow-hidden transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 bg-neutral-200 flex flex-col justify-between">
                <ul className="space-y-12 font-medium  text-neutral-400 mt-8">
                    <li>
                        <Link href="/">
                            <h1 className="text-2xl text-neutral-800">
                                MakeANote
                            </h1>
                        </Link>
                    </li>
                    <li>
                        <Link className={active == "geral" ? "text-neutral-900" : ''} href="/">
                            Geral
                        </Link>
                    </li>
                    <li>
                        <Link className={active == "anotacoes" ? "text-neutral-900" : ''} href="/anotacoes">
                            Anotações
                        </Link>
                        {children && children}
                    </li>
                    <li>
                        <Link className={active == "calendario" ? "text-neutral-900" : ''} href="/calendario">
                            Calendário
                        </Link>
                    </li>

                </ul>

                <ul className="space-y-12 font-medium  text-neutral-400 mb-8">
                    <li>
                        <Link className={active == "sua-conta" ? "text-neutral-900" : ''} href="/sua-conta">
                            Sua conta
                        </Link>
                    </li>
                    <li>
                        <Link href="/cadastro">
                            Sair
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}