const formatador = (data) => { // o formatador é o pai de todas as datas 
    return {
        dia: {
            numerico:dayjs(data).format("DD"),

                semana:{

                    // ele só identifica as datas ou horários no que esta no parentese
                    curto:dayjs(data).format("ddd"),// mostra só a abreviacao com SEG, TER, QUA
                    longo:dayjs(data).format("dddd"),
                }    
        },
        mes:dayjs(data).format("MMMM"),
        hora:dayjs(data).format("HH:mm")
    }
}


//OBJETO {}
const atividade = { // Singular pois é só uma atividade (ESTRUTURA DO OBJETO)

    nome: "Ir ao Mercado",
    data: new Date("2024-07-18 10:00"), // A data tenq ser invertida (ano-mês-dia hora)
    finalizada: false

}


let atividades = [ //Plural porque tenho varias afazeres
    atividade,
    {

        nome: "Jantar",
        data: new Date("2024-07-19 20:00"), // A data tenq ser invertida (ano-mês-dia hora)
        finalizada: true

    },

    {

        nome: "Dormir",
        data: new Date("2024-07-19 23:00"), 
        finalizada: false

    },    

    {
        nome: "Acordar",
        data: new Date("2024-07-19 06:00"), 
        finalizada: false

    },    
] 



criarItemdeAtividade = (atividade) => {  // '=>' igual a uma funcao; Primeira funcao criada

    let input = '<input type="checkbox"' // nao ta terminado

    if (atividade.finalizada) {
        input = input + 'checked'// para que a pessoa faca uma ou a outra (ela desliga uma e liga outra)
    }

    input = input + '>' // separado com o checked porq senao ela pode ser retirado junto com ela 

   const formatar = formatador(atividade.data); 


    return  `<div>
                ${input}
                <span>${atividade.nome}</span>
                <time datetime="">

                ${formatar.dia.semana.longo}, dia

                ${formatar.dia.numerico}

                de ${formatar.mes}

                às ${formatar.hora}h

                </time>
            </div>`// Foi pegado do html para o javascript
}

const atualizarListadeAtividades = () => {

const section = document.querySelector("section")//buscar a tag la na html; O const nunca muda

section.innerHTML = '' 

// Essa parte do código mostrará se alguma atividade foi cadastrada;
// Se não for cadatrada ela aparecerá como se nao tivesse atividades nela  

if(atividades.length == 0) {            // length serve para contar quanto objetos esta sendo criado
    
    section.innerHTML += `<p>Nenhuma atividade cadastrada</p>`
    return
    
}                             


for(let atividade of atividades ) { // O let pode mudar 

//section.innerHTML = 'Olá'  Vai escrever um texto em cima do outro texto do index
section.innerHTML = section.innerHTML + criarItemdeAtividade(atividade) // Mesma coisa mas ela faz com a primeira funcao criada; Precisa de um paramentro que esta dentro do parentese
// += é outra forma de concatenacao
}
}

atualizarListadeAtividades()

const salvarAtividade = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target) // Os dados do objeto foi parar aqui 

    const nome = dadosDoFormulario.get('atividade')

    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')

    const data = `${dia} ${hora}` // aqui o codigo vai concatenar o dia e a hora 

    const novaAtividade = {
        nome,
        data,
        finalizado: false
    }

    atividades = [novaAtividade, ...atividades] // Os três pontos é o pread

    atualizarListadeAtividades()

}



 