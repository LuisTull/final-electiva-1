const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-name');
const message = document.getElementById('message');
const list = document.getElementById('item-list');

async function loadItems() {
  const response = await fetch('/api/items');
  const items = await response.json();

  list.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.id} - ${item.name}`;
    list.appendChild(li);
  });
}

itemForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = itemInput.value.trim();
  if (!name) {
    message.textContent = 'Ingresa un nombre valido';
    return;
  }

  const response = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  if (!response.ok) {
    const payload = await response.json();
    message.textContent = payload.message || 'Error al guardar';
    return;
  }

  itemInput.value = '';
  message.textContent = 'Item guardado';
  await loadItems();
});

loadItems().catch(() => {
  message.textContent = 'No se pudo cargar la lista de items';
});
