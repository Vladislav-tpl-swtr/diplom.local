const apiUrl = 'http://localhost:5000/api/image'; // URL для работы с изображениями
const productsUrl = 'http://localhost:5000/api/product/names'; // URL для получения продуктов

// Загружаем продукты для выпадающего списка
async function loadProducts() {
    try {
        const response = await axios.get(productsUrl);
        const productSelect = document.getElementById('productSelect');

        response.data.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id; // ID продукта
            option.textContent = product.name; // Название продукта
            productSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
    }
}

// Загружаем изображения для выбранного продукта
async function loadImages(productId) {
    try {
        const response = await axios.get(`${apiUrl}/products/${productId}`);
        const imagesList = document.getElementById('imagesList');
        imagesList.innerHTML = ''; // Очищаем список перед добавлением новых изображений

        if (!response.data || response.data.length === 0) {
            console.log('Нет изображений для отображения.');
            return;
        }

        response.data.forEach(image => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'col-md-4';
            imgDiv.innerHTML = `
                <img src="${image.imageUrl}" alt="Image" class="img-thumbnail">
                <p>ID: ${image.id}</p>
                <button class="btn btn-danger" onclick="deleteImage(${image.id})">Удалить</button>
            `;
            imagesList.appendChild(imgDiv);
        });

    } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
    }
}

// Обработчик события для загрузки изображения
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const productId = document.getElementById('productSelect').value;
    const imageFile = document.getElementById('image').files[0];
    const isPrimary = document.getElementById('isPrimary').value;

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('isPrimary', isPrimary);

    try {
        await axios.post(`${apiUrl}/products/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        alert('Изображение успешно загружено!');
        loadImages(productId); // Обновляем список изображений для выбранного продукта
    } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
        alert('Ошибка при загрузке изображения. Попробуйте снова.');
    }
});

// Обработчик изменения для выбора продукта
document.getElementById('productSelect').addEventListener('change', (e) => {
    const productId = e.target.value;
    if (productId) {
        loadImages(productId); // Загружаем изображения для выбранного продукта
    } else {
        document.getElementById('imagesList').innerHTML = ''; // Очищаем список, если продукт не выбран
    }
});

// Функция для удаления изображения
async function deleteImage(imageId) {
    if (confirm('Вы уверены, что хотите удалить это изображение?')) {
        try {
            await axios.delete(`${apiUrl}/${imageId}`); // Запрос на удаление изображения по ID
            alert('Изображение успешно удалено!');
            const productId = document.getElementById('productSelect').value;
            loadImages(productId); // Обновляем список изображений для текущего продукта
        } catch (error) {
            console.error('Ошибка при удалении изображения:', error);
            alert('Ошибка при удалении изображения. Попробуйте снова.');
        }
    }
}

// Инициализация загрузки продуктов при загрузке страницы
loadProducts();
