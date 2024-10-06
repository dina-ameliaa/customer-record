document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    addCustomer(name, email);
    document.getElementById('customerForm').reset();
    displayCustomers();
});

function getCustomers() {
    let customers = localStorage.getItem('customers');
    return customers ? JSON.parse(customers) : [];
}

function addCustomer(name, email) {
    const customers = getCustomers();
    customers.push({ name, email });
    localStorage.setItem('customers', JSON.stringify(customers));
}

function displayCustomers() {
    const customers = getCustomers();
    const listElement = document.getElementById('customerList');
    listElement.innerHTML = '';
    customers.forEach((customer, index) => {
        const customerElement = document.createElement('div');
        customerElement.textContent = `${customer.name} (${customer.email})`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteCustomer(index);
        };
        customerElement.appendChild(deleteButton);
        listElement.appendChild(customerElement);
    });
}

function deleteCustomer(index) {
    const customers = getCustomers();
    customers.splice(index, 1);
    localStorage.setItem('customers', JSON.stringify(customers));
    displayCustomers();
}

document.addEventListener('DOMContentLoaded', function() {
    displayCustomers();
});
