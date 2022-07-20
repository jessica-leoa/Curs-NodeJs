const express = require("express");
const app = express(); //Inicializando a funcao express
const {randomUUID} = require("crypto") //Pegando a funcao randomUID da lib crypto para gerar um id
const fs = require("fs"); // Usar arquivo text na minha API
const { json } = require("express/lib/response");

//Criando middlwes (use)
app.use(express.json()); //Formato para receber um tipo de requisicao, no caso JSON

// O array precisa receber os dados do arquivo para iniciar, para isso faco a escrita dos dados do arquivo para o array
fs.readFile("products.json", "utf-8", (err, data) =>{
  if(err){
    console.log(err);
  }else{
    products = JSON.parse(data);
  }
});


// criando um array
let products = []; 

/* Posso usar os métodos no app (GET buscar, POST inserir, UPDATE alterar, DELETE)

Body > sempre que eu quiser enviar dados para minha aplicacao
Params > parametro da rota EX: /rota
Query > Fazem parte da rota mas nao é obrigatório EX: /rota?id=123&567
*/


// MÉTODO POST
//no primeiro parametro eu defino em que rota eu quero usar esse método post (res,req pq é HTTP)
app.post("/products", (req, res) => {
  //Nome, Preco
  const {name, price} = req.body;

  const product = {
    name,
    price,
    id: randomUUID(),

  }

  //Colocando objeto product na lista de products
  products.push(product);  

  //Inserindo no ARQUIVO
  productFile();
 

  // Retorna a resposta fazendo um request (res) em formato json do dobjeto
  return res.json(product)

});

// MÉTODO GET
app.get("/products", (req,res) => {
  
  // Retornando a lista de objetos em formato json
  return res.json(products)
});

// MÉTODO GET pegando objeto pelo ID, nao array inteiro
app.get("/products/:id", (req, res) => {
  const {id} = req.params; //Requesitando atávés de uma parametro que é o ID
  const product = products.find(product => product.id === id); //varrendo lista p encontrar por ID
  return res.json(product); 
});

// MÉTODO PUT
app.put("/products/:id", (req, res) => {
  const {id} = req.params;
  const {name, price} = req.body;

  //Encontrando o objeto que quero alterar
  const productIndex = products.findIndex((product) => product.id === id); 

  //Alterando o produto da posicao correspondente ao index identificado
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };
  //Atualizando o ARQUIVO
  productFile();

  return res.json({ message: "Produto alterado con sucesso!"});
});

// MÉTODO DELETE
app.delete("/products/:id", (req, res) => {
  const {id} = req.params;

  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);

  //Deletando produto do ARQUIVO
  productFile();
  
  return res.json({ message: "Produto removido com sucesso!"});
 
});

// FUNCAO PARA ATUALIZAR O ARQUIVO (BD) A CADA MÉTODO EXECUTADO
function productFile(){
  //Atualizando o arquivo com base com base nas modificacoes feitas no array(Recebendo arquivo em formati JSON)
  fs.writeFile("products.json", JSON.stringify(products), (err) =>{
    if(err){
      console.log(err); //Se der erro
    } else {
      console.log("Produto inserido!");
    }
  });
}

app.listen(4002, () => console.log("Servidor rodando na porta 4002"));

