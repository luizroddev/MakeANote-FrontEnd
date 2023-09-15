'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation'

function CadastroForm() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
    });

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simule uma chamada à API com Axios (substitua pela sua URL real)
        try {
            const response = await axios.post('http://localhost:8080/makeanote/api/usuario/conta', formData)
            router.push('/', { scroll: false })
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#fffefc' }} className="h-screen flex flex-col items-center 
        justify-center pb-44">
            <label className='text-5xl text-neutral-900 font-bold mb-2 block'>Cadastre-se</label>
            <form onSubmit={handleSubmit} className="max-w-lg rounded px-8 pt-6 pb-8 mb-4">

                <div className="mb-4">
                    <label className="block text-gray-500 text-xs font-light mb-2" htmlFor="nome">
                        Seu nome
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-1 px-2 font-normal text-sm text-gray-700 pr-36 leading-tight focus:outline-none focus:shadow-outline
                        bg-neutral-100"
                        type="text"
                        name="nome"
                        id="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-500 text-xs font-light mb-2" htmlFor="email">
                        Seu e-mail
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-1 px-2 font-normal text-sm text-gray-700 pr-36 leading-tight focus:outline-none focus:shadow-outline
                        bg-neutral-100"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-500 text-xs font-light mb-2" htmlFor="senha">
                        Sua senha
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-1 px-2 font-normal text-sm text-gray-700 pr-36 leading-tight focus:outline-none focus:shadow-outline
                        bg-neutral-100"
                        type="password"
                        name="senha"
                        id="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-red-50 hover:bg-red-100 border-red-200 text-red-500 border w-full font-medium text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Criar nova conta
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CadastroForm;
