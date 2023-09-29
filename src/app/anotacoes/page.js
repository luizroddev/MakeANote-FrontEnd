'use client'

import NavBar from "@/components/NavBar";
import TarefaView, { CheckBox } from "@/components/TarefaView";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const url = 'http://localhost:8080/makeanote/api/usuario/tarefa'

const TarefasList = ({ handleSelectTarefa, currentTarefa }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                console.log(data);
            })
    }, [])

    return (
        <>
            <ul>
                {data.length > 0 ? data.map(tarefa => {
                    return (
                        <li key={tarefa.id} className={`pl-4 cursor-pointer ${currentTarefa != tarefa && 'hover:text-neutral-600'}  ${currentTarefa == tarefa ? 'text-black' : 'text-gray-500'}`} onClick={(e) => handleSelectTarefa(e, tarefa)}>
                            →	{tarefa.titulo}
                        </li>
                    )
                }) : <li>
                    <h1 className="pl-4">Nenhuma nota</h1></li>}
            </ul >
        </>
    );
};

function TarefaCreate({ tarefa, setTarefa }) {

    function handleFieldChange(field, value) {
        setTarefa({
            ...tarefa,
            [field]: value
        })
    }

    async function createNote() {
        const createURL = url

        const options = {
            method: "POST",
            body: JSON.stringify(tarefa),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const resp = await fetch(createURL, options)

        if (resp.status !== 200) return { error: "Erro ao criar tarefa" }

        revalidatePath("/anotacoes")
    }

    return (
        <>
            <div className="w-full px-8 mt-8">
                <h2 className="font-medium text-gray-400">Anotações</h2>
                <h1 className="font-semibold text-black text-4xl py-4">
                    <input onChange={(e) => handleFieldChange('titulo', e.target.value)} value={tarefa.titulo}></input></h1>

                <section>

                    <div className="flex flex-col mt-8 space-y-4">
                        <CheckBox text={"Pagar conta de Luz"}></CheckBox>
                        <CheckBox text={"Pagar conta de Água"}></CheckBox>

                        <h2 className="font-semibold text-xl text-neutral-700 mb-1">Descrição da tarefa:</h2>
                        <textarea id="message" rows="15" class="text-gray-900 focus:border-transparent focus:outline-none bg-transparent"
                            placeholder="Faça as anotações aqui" defaultValue={tarefa.descricao}
                            onChange={(e) => handleFieldChange('descricao', e.target.value)}></textarea>
                    </div>
                </section>
                <div className="space-x-8">
                    <button className="bg-blue-400 p-4 text-white font-medium" onClick={createNote}>Criar tarefa</button>
                </div>
            </div>
        </>
    )
}

export default function Anotacoes() {

    const [currentTarefa, setTarefa] = useState({
        titulo: 'Nova nota',
        descricao: '',
        data: new Date().toISOString()
    })

    const router = useRouter()

    const handleSelectTarefa = (e, tarefa) => {
        e.preventDefault()

        router.push('/anotacoes/' + tarefa.id)
    }

    return (
        <>
            <main className="bg-neutral-50 flex overflow-hidden">
                <NavBar active={"anotacoes"}>
                    <TarefasList handleSelectTarefa={handleSelectTarefa} currentTarefa={currentTarefa}></TarefasList>
                </NavBar>
                <TarefaCreate setTarefa={setTarefa} tarefa={currentTarefa}></TarefaCreate>
            </main>
        </>
    )
}
