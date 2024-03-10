# Gerenciador de Clientes e Otimização de Rotas - Frontend

Este projeto consiste em um sistema de gerenciamento de clientes e otimização de rotas para uma empresa que realiza limpeza em residências. O frontend foi desenvolvido em React.

## Funcionalidades

### Parte 1: Gerenciamento de Clientes

- Listagem de clientes cadastrados
- Filtragem de clientes com base nas informações cadastradas (nome, email e telefone)
- Cadastro de novos clientes

### Parte 2: Otimização de Rotas

- Visualização da ordem de visitação dos clientes na rota calculada

## Tecnologias Utilizadas

- React
- Axios (para comunicação com o backend)
- Material ui (Criação de layouts com mais facilidade) 
- konva (para desenhar o mapa bidimensional)

## Configuração do Ambiente

1. Clone o repositório: `git clone https://github.com/AlisonLeme/Frontend-Sistema-de-Gerenciamento-de-Clientes.git`
2. Navegue até o diretório do projeto: `cd seu-repositorio`
3. Instale as dependências: `npm install`
4. Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente necessárias

    - `REACT_APP_API_URL`: Esta variável define a URL da API utilizada pelo frontend. Por exemplo: `http://localhost:3333`.

    - `REACT_APP_WEB_SOCKET`: Esta variável define o endpoint do WebSocket utilizado para comunicação em tempo real, se aplicável. Por exemplo: `ws://localhost:3333`.


## Execução

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm start
```

O servidor será iniciado na porta padrão (geralmente 3000) e você poderá acessá-lo em seu navegador.

## Rotas da Aplicação
- `/ Página inicial`: com os cards que abrem um modal flexivel com as funcionalidades.