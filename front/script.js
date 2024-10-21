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
        div.innerHTML = `
            <span>Nome: ${item.name}, Idade: ${item.age}</span>
            <div>
                <button class="edit" onclick="editData('${item._id}', '${item.name}', '${item.age}')">Editar</button>
                <button class="delete" onclick="deleteData('${item._id}')">Deletar</button>
            </div>
        `;
        output.appendChild(div);
    });
}

// Função para criar ou editar um registro
async function createOrUpdateData(id, name, age) {
    const url = id ? `${API_URL}/update/${id}` : `${API_URL}/post`;
    const method = id ? 'PATCH' : 'POST';
    
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
    });

    const data = await response.json();
    alert(id ? 'Registro atualizado com sucesso!' : 'Registro criado com sucesso!');
    console.log(data);
    resetForm();
    fetchAllData(); // Atualizar a lista
}

// Função para deletar um registro
async function deleteData(id) {
    const confirmDelete = confirm("Tem certeza que deseja deletar este registro?");
    if (confirmDelete) {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        alert('Registro deletado com sucesso!');
        fetchAllData(); // Atualizar a lista
    }
}

// Função para preencher o formulário com os dados para edição
function editData(id, name, age) {
    document.getElementById('id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('submitButton').innerText = "Atualizar";
}

// Função para resetar o formulário
function resetForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('submitButton').innerText = "Adicionar";
}

// Manipular o envio do formulário
document.getElementById('dataForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    createOrUpdateData(id, name, age);
});

// Carregar todos os registros quando a página é carregada
window.onload = fetchAllData;
