const API_URL = 'http://localhost:3000/api';

// Função para exibir todos os registros em uma tabela
async function fetchAllData() {
    try {
        const response = await fetch(`${API_URL}/getAll`);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();
        const tbody = document.querySelector('#dataTable tbody');
        tbody.innerHTML = ''; // Limpe o conteúdo anterior

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">Nenhum registro encontrado.</td></tr>';
        } else {
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>
                        <button class="edit" onclick="editData('${item._id}', '${item.name}', '${item.age}')">Editar</button>
                        <button class="delete" onclick="deleteData('${item._id}')">Deletar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Função para criar ou atualizar um registro
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
