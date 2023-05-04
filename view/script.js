const url = 'http://localhost:8080/tarefas';
const urlAllTasks = url + '/allTask';

getAPI(urlAllTasks);


async function getAPI(url) {
    const response = await (await fetch(url, { method: "GET"})).json();
    showTasks(response);
}


function deleta(id) {
    const urlDeleteTask = `${url}/${id}`
    deleteTask(urlDeleteTask);
}
async function deleteTask(url) {
    const response = await fetch(url, { method: "DELETE"});
    getAPI(urlAllTasks)
}


async function authenticate(titulo, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data,
            titulo
        })
    });

    if (response.ok) {
        getAPI(urlAllTasks)
    } else {
        throw new Error('Erro ao criar a Task');
    }
}



document.querySelector('.tlNT_form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('tlNT_Nome');
    const data = document.getElementById('tlNT_Data');

    if(titulo.value != "") {
        if(new Date(new Date(data.value).getTime() + 10800000) > new Date()) {
            data.style.border = "1px solid black";
            authenticate(titulo.value, data.value);
        } else {
            data.style.border = "1px solid red";
            titulo.style.border = "1px solid black";
        }
    } else {
        titulo.style.border = "1px solid red";
    }
});




function showTasks(tasks) {
    let texto = '';
    let dados = tasks;
    if(tasks.length != 0){
    let data = dados[0].data.split('-').reverse().join('/');
    texto = texto + `
    <ul class="tlT_ul">
        <p class="tlT_DataTask">${data}</p>
        ${estrutura(dados[0])}
    `
    for (i=1; i<dados.length; i++) {
        let task = dados[i];
        let data = task.data.split('-').reverse().join('/');
        if(data == dados[i-1].data.split('-').reverse().join('/')) {
            texto = texto + estrutura(task)
        } else {
            texto = texto + `
            </ul>
            <ul class="tlT_ul">
                <p class="tlT_DataTask">${data}</p>
                ${estrutura(task)}
            `
        }
    }
    texto = texto + `</ul>`
}
    let divLista = document.getElementById("tlT_ul");
    divLista.innerHTML = texto;
}


function estrutura(task) {
    return `
    <ul>
        <li class="tlT_Task">
        <p class="tlT_TaskTitle">${task.titulo}</p>
            <button class="tlT_Delete" id="${task.id}" onclick="deleta(id)"><img src="imagens/trashcan.png" alt="lixeira"></button>
        </li>
    </ul>
`
}




document.querySelector('.tlMn_Btn').onclick = () => apareceNovo();

function apareceNovo() {
    document.querySelector(".menosHori").classList.toggle("menosHori1");
    document.querySelector(".menosVert").classList.toggle("menosVert1");
    document.querySelector(".tlNewTask").classList.toggle("tlNewTaskH");
}












