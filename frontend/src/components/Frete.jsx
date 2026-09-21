import React from 'react'
import { useState } from 'react'

const Frete = () => {

    // Hooks - useState - manipula o estado da variavel 
    const [distancia, setDistancia] = useState();
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
    <>
      
    </>
  )
}

export default Frete
