// Variables globales
let editIndex = null; // Para saber si estamos editando un cliente

// Al cargar la página, muestra los clientes almacenados
document.addEventListener("DOMContentLoaded", function() {
    loadClients();
});

// Maneja el evento de envío del formulario
document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const medidor = document.getElementById('medidor').value;
    const password = document.getElementById('password').value;

    if (editIndex === null) {
        // Crear un nuevo cliente
        addClient(name, email, medidor, password);
    } else {
        // Editar cliente existente
        updateClient(editIndex, name, email, medidor, password);
    }

    resetForm();
    loadClients(); // Actualiza la tabla
});

// Función para agregar un cliente a localStorage
function addClient(name, email, medidor, password) {
    const clients = getClientsFromLocalStorage();
    clients.push({ name, email, medidor, password });
    localStorage.setItem('clients', JSON.stringify(clients));
}

// Función para editar un cliente en localStorage
function updateClient(index, name, email, medidor, password) {
    const clients = getClientsFromLocalStorage();
    clients[index] = { name, email, medidor, password };
    localStorage.setItem('clients', JSON.stringify(clients));
    editIndex = null; // Resetear el índice de edición
}

// Función para cargar clientes desde localStorage
function loadClients() {
    const clients = getClientsFromLocalStorage();
    const tableBody = document.getElementById('user-table');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla de nuevo

    clients.forEach((client, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${client.medidor}</td>
            <td>
                <button onclick="editClient(${index})">Editar</button>
                <button onclick="deleteClient(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Obtener clientes desde localStorage
function getClientsFromLocalStorage() {
    return localStorage.getItem('clients') ? JSON.parse(localStorage.getItem('clients')) : [];
}

// Función para editar cliente
function editClient(index) {
    const clients = getClientsFromLocalStorage();
    const client = clients[index];
    document.getElementById('name').value = client.name;
    document.getElementById('email').value = client.email;
    document.getElementById('medidor').value = client.medidor;
    document.getElementById('password').value = client.password;
    editIndex = index; // Guardamos el índice que estamos editando
}

// Función para eliminar cliente
function deleteClient(index) {
    const clients = getClientsFromLocalStorage();
    clients.splice(index, 1); // Elimina el cliente del array
    localStorage.setItem('clients', JSON.stringify(clients)); // Guarda el nuevo array
    loadClients(); // Actualiza la tabla
}

// Función para resetear el formulario
function resetForm() {
    document.getElementById('user-form').reset();
    editIndex = null; // Resetear el índice de edición
}
