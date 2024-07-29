const formatador = (data) => { // o formatador é o pai de todas as datas
    return {
        dia: {
            numerico:dayjs(data).format('DD'),
            semana: {

                //ele só identifica as datas ou horarios no que esta no parentese
                curto:dayjs(data).format('ddd'), // mostra só a abreviacao com SEG, TER, QUA
                longo:dayjs(data).format('dddd'),
            }
        },
        mes:dayjs(data).format('MMMM'),
        hora:dayjs(data).format('HH:mm')
    }
}

//OBJECT {}
const atividade = { // singular pois é so uma atividade(ESTRUTURA DO OBJETO)
    nome: "Ir ao Mercado",
    data: new Date("2024-07-18 10:00"),// a data tenq ser invertida(ano-mes-dia hora)
    finalizada: false
}

let atividades = [
    atividade,
        {
            
            nome: "Jantar",
            data: new Date("2024-07-19 20:00"),
            finalizada: true 
        },
        {
            nome: "Dormir",
            data: new Date("2024-07-19 23:00"),
            finalizada: false 
        },
        {
            nome: "Acordar",
            data: new Date("2024-07-20 06:00"),
            finalizada: true
        },
]

//atividades = []

criarItemDeAtividade = (atividade) => {
    let input = '<input type="checkbox" ';

    if (atividade.finalizada) {
        input = input + 'checked';
    }

    input = input + '>';

    const formatarInicio = formatador(atividade.dataInicio);
    const formatarFim = formatador(atividade.dataFim);

    return `<div class="atividade">

    <div class="span">
        ${input}

            <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" style="stroke:#BEF264;stroke:color(display-p3 0.7451 0.9490 0.3922);stroke-opacity:1;" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" style="stroke:#A1A1AA;stroke:color(display-p3 0.6314 0.6314 0.6667);stroke-opacity:1;" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

                <span>${atividade.nome}</span>
            </div>    
                <time>
                    CO: ${formatarInicio.dia.semana.curto}, dia ${formatarInicio.dia.numerico} de ${formatarInicio.mes} às ${formatarInicio.hora}h<br>
                    TER: ${formatarFim.dia.semana.curto}, dia ${formatarFim.dia.numerico} de ${formatarFim.mes} às ${formatarFim.hora}h
                </time>
    </div>`;
};

const atualizarListaDeAtividades = () => {

const section = document.querySelector('section')
section.innerHTML = ''

if(atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada!</p>`
    return
}

for(let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade)
    }
}

atualizarListaDeAtividades()

const salvarAtividade = (event) => {
    event.preventDefault();

    const nome = document.getElementById('atividade').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;

    const novaAtividade = {
        nome,
        dataInicio: new Date(dataInicio),
        dataFim: new Date(dataFim),
        finalizada: false
    };

    atividades.unshift(novaAtividade); // Adiciona no início do array

    atualizarListaDeAtividades();
    event.target.reset(); // Limpa o formulário após adicionar a atividade
};

