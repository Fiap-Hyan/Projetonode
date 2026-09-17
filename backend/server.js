//importar o modulo express - framework de aplicação web para node.js
const express = require('express')

// modulo que permite que o servidor aceite requisições diferentes(Dominioss)
const cors = require('cors')

// instanciando express para app
const app = express();

// definindo a porta que o servidor usará
const port=3001;

//configura o express para analisar as requisições com o corpo no formato json, sendo necessario para ler os dados enviados
//no corpo da requisição
app.use(express.json());

//habilita o CORS para todas as rotas da aplicação, permitindo acesso
app.use(cors());

//objeto( tabela com os preços )
const precos = {
    bicicleta: 0.75, // preço por km para bicicleta
    carro: 0.25, // preço por km para carro
    drone: 1.20, // preço por km para drone
}

//definindo uma rota de api tipo POST
// função de callback lida com requisição 
app.post('/calcularfrete',(req,res)=>{
    //destruct para o corpo da requisição e extrair distancia e tipoTransporte
    const {distancia, tipoTransporte} = req.body;

    //verifica se a distancia ou tipotransporte não foram fornecidos
    if(distancia === undefined || tipoTransporte === undefined){
        return res.status(400).json({error:'Distancia e tipo de transporte são obrigatorios'})
    }
    
    //busca o preço por km no objeto convertendo o tipo de transporte para minusculo
    const precoPorKm = precos[tipoTransporte.toLowerCase()];

    //verifica se o tipotransporte fornecido existe na tabela de preços
    if(precoPorKm === undefined){
        return res.status(400).json({error: "tipo de transporte invalido"});
    }

    // calcula o valor total do frete multiplicando a distancia pelo preço por km
    const valorTotal = distancia * precoPorKm;
    //envia a resposta com o objeto json
    //toFixed limita as casas decimais
    res.json({valorTotal: valorTotal.toFixed(2)})
})

// inicia o servidor para que ele começe a escutr as requisições na porta
app.listen(port,()=>{
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})