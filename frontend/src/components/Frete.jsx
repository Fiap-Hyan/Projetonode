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
        <div>
            <div>
                <h1>Calculadora de Frete</h1>
                <form>
                    <div>
                        <label>Distância(km)</label>
                        <input
                            type="number"
                            id="distancia"
                            value={distancia}
                            min="0"
                            step="0.01"
                            required
                            onChange={(e) => setDistancia(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Transporte</label>
                        <select
                            id="transport"
                            value={tipoTransporte}
                            onChange={(e) => setTipoTransporte(e.target.value)}
                        >
                            <option value="bicicleta">Bicicleta</option>
                            <option value="carro">Carro</option>
                            <option value="drone">Drone</option>                     </select>
                    </div>

                    <button type="submit" disabled={loading}>
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