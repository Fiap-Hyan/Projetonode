import React from 'react'
import { useState } from 'react'

const Frete = () => {

    // Hooks - useState - manipula o estado da variavel 
    const [distancia, setDistancia] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('bicicleta');
    const [valorFrete, setValorFrete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFrete =async(e) => {
        //previne que o formualrio não seja recarregado
        e.preventDefault();
        setLoading(true);
        setValorFrete(null);
        setError(null);
        //Tratamento de erros com try/catch/finally
        try {
            const resp =await fetch("http://localhost:3001/calcularfrete", {
                method: "POST", 
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({distancia:parseFloat(distancia), tipoTransporte}),
            });
            if(!resp.ok){
                const erroDados = await resp.json();
                //tratamento de erros na aplicação 
                throw new Error(erroDados.error || "erro ao calcular o frete")
            }
            const data = await resp.json();
            setValorFrete(data.valorTotal);


        }
    
        catch(error){
            setError(error)
        }
        finally{
            setLoading(false)
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
            <div className="bg-amber-100 p-8 rounded-2xl shadow-2xl w-full">
                <h1 className="text-3xl font-bold text-blue-950 mb-6">Calculadora de Frete</h1>
                <form onSubmit={handleFrete} className="space-y-6">
                    <div className="space-y-2 text-left">
                        <label className="block text-gray-700 font-medium">Distância(km)</label>
                        <input
                            type="number"
                            id="distancia"
                            value={distancia}
                            min="0"
                            step="0.01"
                            required
                            onChange={(e) => setDistancia(e.target.value)}
                            className="w-full px-4 py-3 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <label className="block text-gray-700 font-medium">Transporte</label>
                        <select
                            id="transport"
                            value={tipoTransporte}
                            onChange={(e) => setTipoTransporte(e.target.value)}
                            className="w-full px-4 py-3 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        >
                            <option value="bicicleta">Bicicleta</option>
                            <option value="carro">Carro</option>
                            <option value="drone">Drone</option>                     </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 text-white font-bold py-3 rounded-2xl hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"

                    >
                        {loading ? "Calculando" : "Calcular"}
                    </button>
                </form>

                {error && <p>{error}</p>}

                {valorFrete !== null && (
                    <div>
                        <h2>valor do Frete: R$ {valorFrete}</h2>
                    </div>
                )}
            </div>
        </div>
    )
}


export default Frete