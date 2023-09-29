import { revalidatePath } from "next/cache";
import { useState } from "react";
import { AiOutlineCheck } from 'react-icons/ai'
import { BsCheck } from 'react-icons/bs'

const url = 'http://localhost:8080/makeanote/api/usuario/tarefa'


export function CheckBox({ text }) {

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



const formatDate = (localDate) => {
    const [year, month, day] = localDate;
    return `${day}/${month}/${year}`;
};

function TarefaView({ tarefa, setTarefa }) {

    async function handleUpdate() {
        const updateUrl = url + "/" + tarefa.id

        const options = {
            method: "PUT",
            body: JSON.stringify(tarefa),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const resp = await fetch(updateUrl, options)

        if (resp.status !== 200) return { error: "Erro ao atualizar tarefa" }
    }

    async function handleDelete() {
        const deleteUrl = url + "/" + tarefa.id

        const options = {
            method: "DELETE"
        }

        const resp = await fetch(deleteUrl, options)

        if (resp.status !== 204) return { error: "Erro ao apagar tarefa. " }

    }

    function handleFieldChange(field, value) {
        setTarefa({
            ...tarefa,
            [field]: value
        })
    }

    return (
        <>
            <div className="w-full px-8 mt-8">
                <h2 className="font-medium text-gray-400">Anotações</h2>
                <h1 className="font-semibold text-black text-4xl py-4">
                    <input onChange={(e) => handleFieldChange('titulo', e.target.value)} value={tarefa.titulo}></input></h1>
                {/* <h2 className="font-medium text-neutral-700 mb-8">Data da tarefa: {formattedDate}</h2> */}

                <section>
                    {/* <h2 className="font-regular text-neutral-800 text-xl">Meus Lembretes</h2> */}

                    <div className="flex flex-col mt-8 space-y-4">
                        <CheckBox text={"Pagar conta de Luz"}></CheckBox>
                        <CheckBox text={"Pagar conta de Água"}></CheckBox>
                        {/* <CheckBox text={"Pagar conta de Internet"}></CheckBox> */}

                        <h2 className="font-semibold text-xl text-neutral-700 mb-1">Descrição da tarefa:</h2>
                        <textarea id="message" rows="15" className="text-gray-900 focus:border-transparent focus:outline-none bg-transparent" placeholder="Faça as anotações aqui" defaultValue={tarefa.descricao}></textarea>
                    </div>
                </section>
                <div className="space-x-8">
                    <button className="bg-blue-400 p-4 text-white font-medium" onClick={handleUpdate}>Salvar alterações</button>
                    <button className="bg-red-400 p-4 text-white font-medium" onClick={handleDelete}>Deletar tarefa </button>
                </div>
            </div>
        </>
    )
}

export default TarefaView