'use client'


import NavBar from "@/components/NavBar";
import { useState } from "react";
import { AiOutlineCheck } from 'react-icons/ai'
import { BsCheck } from 'react-icons/bs'

function CheckBox({ text }) {

    const [checked, setChecked] = useState(false)

    const toggleCheck = () => {
        setChecked(!checked)
    }

    return (
        <>
            <div className="flex items-center">
                <div onClick={toggleCheck} className={`flex justify-center items-center w-7 h-7 mr-4 transition-colors hover:cursor-pointer ${checked && 'bg-blue-500'} border-neutral-800 border-2 rounded`}>
                    <BsCheck color="white"></BsCheck>
                </div>

                <span className="text-neutral-800">{text}</span>
            </div >
        </>
    )
}

export default function Anotacoes() {
    return (
        <>
            <main className="bg-neutral-50 flex overflow-hidden">
                <NavBar active={"anotacoes"} />
                <div className="w-full px-8 mt-8">
                    <h2 className="font-medium text-gray-400">Anotações</h2>
                    <h1 className="font-semibold text-black text-4xl py-4">Tarefas semanais</h1>

                    <section className="">
                        <h2 className="font-regular text-neutral-800 text-xl">Meus Lembretes</h2>

                        <div className="flex flex-col mt-8 space-y-4">
                            <CheckBox text={"Pagar conta de Luz"}></CheckBox>
                            <CheckBox text={"Pagar conta de Água'"}></CheckBox>
                            <CheckBox text={"Pagar conta de Internet"}></CheckBox>
                            <textarea id="message" rows="15" class="text-gray-900 focus:border-transparent focus:outline-none bg-transparent" placeholder="Faça as anotações aqui"></textarea>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
