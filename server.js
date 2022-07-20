const http = require('http');

http
  .createServer((req, res) => {
    //Aqui digo o que eu quero que ele faca ao abrir no browser na porta correspondente
    res.writeHead(200, { 'Content-Type': 'application/json' });
// Direcionamento de rota
    if (req.url === "/products"){
      res.end(
        JSON.stringify({
          message: "Rota de produto",
        })
      );
    }
// Mostrando na browser no formato Json
    if (req.url === "/usuario"){
      res.end(
        JSON.stringify({
          message: "Rota de usuário",
        })
      );
    }
// Mostrando na browser no formato HTML
    res.end("Rota qualquer");

  })
  .listen(4001, () => console.log('Servidor rodando na porta 4001'));
 