'use client'

import NavBar from "@/components/NavBar";
import TarefaView from "@/components/TarefaView";
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
                {data.map(tarefa => {
                    return (
                        <li key={tarefa.id} className={`pl-4 cursor-pointer ${currentTarefa != tarefa && 'hover:text-neutral-600'}  ${currentTarefa == tarefa ? 'text-black' : 'text-gray-500'}`} onClick={(e) => handleSelectTarefa(e, tarefa)}>
                            →	{tarefa.titulo}
                        </li>
                    )
                })}
            </ul >
        </>
    );
};

export default function Anotacoes() {

    const [currentTarefa, setTarefa] = useState(null)

    const handleSelectTarefa = (e, tarefa) => {
        e.preventDefault()
        setTarefa(tarefa)
        console.log(tarefa);
    }

    return (
        <>
            <main className="bg-neutral-50 flex overflow-hidden">
                <NavBar active={"anotacoes"}>
                    <TarefasList handleSelectTarefa={handleSelectTarefa} currentTarefa={currentTarefa}></TarefasList>
                </NavBar>
                {currentTarefa ? <TarefaView tarefa={currentTarefa}></TarefaView> : <h1 className="text-black font-medium text-xl p-4">Nenhuma tarefa selecionada
                    <br></br>    Selecione na barra de navegação</h1>}
            </main>
        </>
    )
}
