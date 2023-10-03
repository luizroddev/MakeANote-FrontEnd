import React from 'react';

const TarefaList = ({ tarefas = [] }) => {
    return (
        <ul>
            {tarefas.length > 0 && tarefas.map((tarefa) => (

                <ul className="max-w-md divide-y divide-gray-700">
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {tarefa.titulo}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    {tarefa.descricao}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                {tarefa.data}
                            </div>
                        </div>
                    </li>
                </ul>
            ))}
        </ul>
    );
};

export default TarefaList;
