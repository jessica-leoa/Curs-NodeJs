# Curs-NodeJs

O que é Node?
- É um interpretador Javascript que nao depende do navagador, ou seja, ele é totalmente desvinculado  ao navegafor.
Ao conseguir ter saído do navegador, foi possível expandir as funcionalidades para o back-end etc. (Foco desse curso: back-end)
Usa a máquina v8

Node (ou formalmente Node+js) é um ambiente em tempo de execução open-source (código
aberto) e multiplataforma que permite aos desenvolvedores criarem todo tipo de aplicativos e
ferramentas do lado servidor (backend) em JavaScript. Node é usado fora do contexto de um
navegador (ou seja executado diretamente no computador ou no servidor). Como tal, o ambiente
omite APIs JavaScript específicas do navegador e adiciona suporte para APIs de sistema
operacional mais tradicionais, incluindo bibliotecas de sistemas HTTP e arquivos.

==================  sigle theaded  ==================

Tem mais arquiteturas além de single-thread (ST) e multi-thread (MT). Basicamente o ST só pode tratar uma requisição de cada vez, então o processamento de cada uma não pode ser demorado, nem pode bloquear (por exemplo, ficar esperando pelo banco de dados). O MT, assumindo que se crie uma thread por requisição, pode tratar várias requisições em paralelo, mesmo que demorem ou bloqueiem.

Um servidor ST pode ser eficaz, desde que nunca bloqueie. O Node.js é assíncrono de modo a não bloquear. Qualquer processamento demorado deve ser delegado a um outro processo, o que também pode ser feito no Node com subprocess.

Outra forma de abordar o problema: o prefork do Apache cria um pool de subprocessos, e delega as requisições para cada subprocesso conforme elas chegam. Isto garante o paralelismo e evita as complexidades de programação MT. Isto pode ser implementado também no Node mas o Apache entrega isto de fábrica, o que facilita a vida do desenvolvedor PHP por exemplo, pois ele não precisa se preocupar se está bloqueando.