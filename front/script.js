const API_URL = 'http://localhost:3000/api';

// Função para exibir todos os registros
async function fetchAllData() {
    const response = await fetch(`${API_URL}/getAll`);
    const data = await response.json();
    const output = document.getElementById('output');
    output.innerHTML = '';

    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('data-item');
        div.innerHTML = `Nome: ${item.name}, Idade: ${item.age}`;
        output.appendChild(div);
    });
}

// Função para criar um novo registro
async function createData(name, age) {
    const response = await fetch(`${API_URL}/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
    });

    const data = await response.json();
    alert('Registro criado com sucesso!');
    console.log(data);
    fetchAllData(); // Atualizar a lista
}

// Manipular o envio do formulário
document.getElementById('dataForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    createData(name, age);
});

// Exibir todos os registros ao clicar no botão "Obter Todos"
document.getElementById('getAll').addEventListener('click', fetchAllData);

// Carregar todos os registros quando a página é carregada
window.onload = fetchAllData;
