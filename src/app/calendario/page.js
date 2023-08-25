'use client'


import NavBar from "@/components/NavBar";

export default function Calendario() {
    return (
        <>
            <main className="bg-neutral-50 flex overflow-hidden">
                <NavBar active={"calendario"} />
                <div className="w-full px-8 mt-8">
                    <h2 className="font-medium text-gray-400">Calendário</h2>
                </div>
            </main>
        </>
    )
}
