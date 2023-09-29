'use client'

import NavBar from "@/components/NavBar";
import TarefaView from "@/components/TarefaView";
import TarefaList from "@/components/TarefasList";
import { useParams, useRouter } from "next/navigation";
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

function CreateNote({ tarefa, setTarefa }) {


    function handleFieldChange(field, value) {
        setTarefa({
            ...tarefa,
            [field]: value
        })
    }

    return (
        <>
            <input onChange={(e) => handleFieldChange('titulo', e.target.value)} defaultValue={"Nova nota"}></input >

            <input onChange={(e) => handleFieldChange('descricao', e.target.value)} placeholder="Descrição da nota"></input >
        </>
    )
}

export default function Anotacoes() {

    const router = useRouter()

    const [currentTarefa, setTarefa] = useState(null)

    const params = useParams()

    console.log(params);

    useEffect(() => {
        fetch('http://localhost:8080/makeanote/api/usuario/tarefa/' + params.page_id)
            .then((res) => res.json())
            .then((data) => {
                setTarefa(data)
                console.log(data);
            })
    }, [])

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
                {currentTarefa ? <TarefaView setTarefa={setTarefa} tarefa={currentTarefa}></TarefaView> : <h1 className="text-black font-medium text-xl p-4">Nenhuma tarefa selecionada
                    <br></br>    Selecione na barra de navegação</h1>}
            </main>
        </>
    )
}
