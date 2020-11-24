# Projeto Crime Manager 

Banco de consultas de crimes desenvolvido utilizando ReactJS, com layout adaptado para celulares e tablets.

## Requisitos

- Listar todos os crimes e realizar buscas (por texto ou por filtros)
- Ver detalhes de um crime específico
- Adicionar um novo crime
- Remover um crime

## Tecnologias utilizadas

- ReactJS
- Axios - Requisições na API
- React Bootstrap
- FontAwosome 4.7
- Datepicker - seleção de datas
- Random image - imagem randômica para imagem de perfil
- Moment JS - formatação de datas

## Alterações de funcionalidades e layout

### Geral:
- Em alguns títulos estão usando a fonte Cinzel no layout e não Cinzel Decorative.

### Tela de Listagem: 
- Filtro por Texto: não tem essa opção na API, não está funcionando na aplicação.

### Tela de Novo Crime: 
- Ao adicionar novo crime, não está salvando os dados de "criminal_list", sempre fica vazio:
```sh
"criminal_list": [{"criminal_id": 1,"id_crime_type": 1}]
```
- Registrar nova arma: não tem POST na API.
- Campos Vítimas, Criminosos e Armas: alterei para select, pois na API tinha que enviar o ID no cadastro.
- Adicionei o campo Country, mas não tinha no layout, porém tinha a opção na API.



## Como rodar a aplicação

No terminal, clone o projeto
```sh
$ git clone https://github.com/carolinavero/crime-manager-project.git
```

Entre na pasta do projeto
```sh
$ cd crime-manager-project
```

Instale as dependências
```sh
$ yarn install
```

Execute a aplicação
```sh
$ yarn start
```

A aplicação estará disponível na rota http://localhost:3000


### Deploy da aplicação com Vercel

Link para acessar a [aplicação](https://crime-manager-project.carolinavero.vercel.app/).
