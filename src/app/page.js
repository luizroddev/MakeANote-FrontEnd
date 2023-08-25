'use client'


import NavBar from "@/components/NavBar";

export default function Geral() {
    return (
        <>
            <main className="bg-neutral-50 flex overflow-hidden">
                <NavBar active={"geral"} />
                <div className="w-full px-8 mt-8">
                    <h2 className="font-medium text-gray-400">Geral</h2>
                </div>
            </main>
        </>
    )
}
