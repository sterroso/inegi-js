// La URL de entrada a la API de imágenes de perros.
const apiURL = 'https://dog.ceo/api/';

// Botón que desencadena el evento para llenar la lista de razas de perros.
const getBreedsButton = document.getElementById('get-breeds');

// Ícono de sincronización
const syncIcon = document.getElementById('sync-icon');


/**
 * Llena el diccionario de razas de perros con los datos obtenidos en la API.
 */
getBreedsButton.addEventListener('click', event => {
    if (!syncIcon.classList.contains('in-sync')) {
        syncIcon.classList.add('in-sync');
    }

    fillBreedsLists();
});

// Elemento div que contiene el índice del diccionario de razas de perros.
const breedsIndex = document.getElementById('breeds-index');


// Elemento div que contiene el contenido del diccionario de razas de perros.
const breedsContainer = document.getElementById('breeds-container');


/**
 * Pares llave/valor con todos los tipos de datos que se pueden obtener de 
 * la API.
 */
const apiDataType = {
    breeds: {
        description: 'Lista de todas las razas.',
        path: ['breeds', 'list', 'all'],
        requiresBreed: false,
    },
    randomImage: {
        description: 'Imagen aleatoria de cualquier raza.',
        path: ['breeds', 'image', 'random'],
        requiresBreed: false
    },
    allImagesByBreed: {
        description: 'Todas las imágenes de una raza específica.',
        path: ['breed', 'images'],
        requiresBreed: true,
        breedPosition: 1,
    },
    allSubBreeds: {
        description: 'Lista de subrazas de una raza específica.',
        path: ['breed', 'list'],
        requiresBreed: true,
        breedPosition: 1,
    },
};


/**
 * Devuelve todas las razas de perros registradas en la API.
 * 
 * @returns Un objeto JSON con la lista de todas las razas de perro.
 */
const getAllBreeds = async () => {
    // Ruta a la lista de razas de perros en la API.
    const path = 'breeds/list/all';

    // El URL de donde se obtendrá la lista de razas de perros en la API.
    const baseURL = new URL(path, apiURL);

    // Bloque try... catch para capturar errores en el proceso de consulta a la API.
    try {
        // Consulta a la API.
        const response = await fetch(baseURL);
        // Convertir los resultados en un objeto JSON.
        const data = await response.json();

        // Si existen datos, y el estatus de la respuesta es 'success' ('exito) ...
        // Devuelve el atributo 'message' que contiene los datos útiles.
        if (data && data.status === 'success') return data.message;

        // Si llega hasta aquí no hubieron datos o el estatus fue diferente a 'success' (éxito)
        // Devuelve null.
        return null;

    } catch (error) {
        // Si hubo un error en la consulta se muestra el error en un Toast.
        Toastify({
            text: `No fue posible obtener la lista de razas del servidor:\n${error}`,
            duration: 2500,
            gravity: 'top',
            position: 'right'
        }).showToast();
    }
}

/**
 * Devuelve una liga aleatoria a una imagen de un perro en la API.
 * 
 * @returns Un objeto JSON con una liga a una imagen aleatoria de un perro.
 */
const getRandomImage = async () => {
    // Ruta a la imagen aleatoria de perros en la API.
    const path = 'breeds/image/random';

    // El URL de donde se obtendrá la imagen aleatoria de perros en la API.
    const baseURL = new URL(path, apiURL);

    // Bloque try... catch para capturar errores en el proceso de consulta a la API.
    try {
        // Consulta a la API.
        const response = await fetch(baseURL);
        // Convertir los resultados en un objeto JSON.
        const data = await response.json();

        // Si existen datos, y el estatus de la respuesta es 'success' ('exito) ...
        // Devuelve el atributo 'message' que contiene los datos útiles.
        if (data && data.status === 'success') return data.message;

        // Si llega hasta aquí no hubieron datos o el estatus fue diferente a 'success' (éxito)
        // Devuelve null.
        return null;

    } catch (error) {
        // Si hubo un error en la consulta se muestra el error en un Toast.
        Toastify({
            text: `No fue posible obetener la imagen del servidor:\n${error}`,
            duration: 2500,
            gravity: 'top',
            position: 'right'
        }).showToast();
    }
}

/**
 * Devuelve una lista de ligas a imágenes de perros de la raza especificada mediante el parámetro breed.
 * 
 * @param {string} breed La raza de perro (consulte las razas válidas mediante la función getAllBreeds)
 * @returns Una lista de ligas a imágenes de perros de la raza especificada.
 */
const getAllImagesByBreed = async (breed) => {
    if (!breed) {
        return null;
    }

    // Ruta a la lista de imágenes de perros, de la raza especificada, en la API.
    const path = `breed/${breed.toLowerCase()}/images`;

    // El URL de donde se obtendrá la lista de imágenes de perros, de la raza especificada, en la API.
    const baseURL = new URL(path, apiURL);

    // Bloque try... catch para capturar errores en el proceso de consulta a la API.
    try {
        // Consulta a la API.
        const response = await fetch(baseURL);
        // Convertir los resultados en un objeto JSON.
        const data = await response.json();

        // Si existen datos, y el estatus de la respuesta es 'success' ('exito) ...
        // Devuelve el atributo 'message' que contiene los datos útiles.
        if (data && data.status === 'success') return data.message;

        // Si llega hasta aquí no hubieron datos o el estatus fue diferente a 'success' (éxito)
        // Devuelve null.
        return null;

    } catch (error) {
        // Si hubo un error en la consulta se muestra el error en un Toast.
        Toastify({
            text: `No fue posible obtener las imágenes de la raza ${breed}:\n${error}`,
            duration: 2500,
            gravity: 'top',
            position: 'right'
        }).showToast();
    }
}

/**
 * Devuelve una lista de subrazas correspondiente a la raza especificada mediante el parámetro breed.
 * 
 * @param {string} breed La raza de perro (consulte las razas válidas mediante la función getAllBreeds)
 * @returns Una lista de subrazas pertenecientes a la raza especificada.
 */
const getAllSubBreeds = async (breed) => {
    if (!breed) {
        return null;
    }

    // Ruta a la lista de subrazas de perros, dentro de la raza especificada, en la API.
    const path = `breed/${breed.toLowerCase()}/list`;

    // El URL de donde se obtendrá la lista de subrazas de perros, dentro de la raza especificada, en
    // la API.
    const baseURL = new URL(path, apiURL);

    // Bloque try... catch para capturar errores en el proceso de consulta a la API.
    try {
        // Consulta a la API.
        const response = await fetch(baseURL);
        // Convertir los resultados en un objeto JSON.
        const data = await response.json();

        // Si existen datos, y el estatus de la respuesta es 'success' ('exito) ...
        // Devuelve el atributo 'message' que contiene los datos útiles.
        if (data && data.status === 'success') return data.message;

        // Si llega hasta aquí no hubieron datos o el estatus fue diferente a 'success' (éxito)
        // Devuelve null.
        return null;

    } catch (error) {
        // Si hubo un error en la consulta se muestra el error en un Toast.
        Toastify({
            text: `No fue posible obtener la lista de subrazas correspondiente a la raza ${breed}:\n${error}`,
            duration: 2500,
            gravity: 'top',
            position: 'right'
        }).showToast();
    }
};


/**
 * Verifica que esté disponible un tipo de almacenamiento (localStorage | sessionStorage).
 * 
 * @param {string} type El tipo de storage que se quiere verificar: localStorage | sessionStorage
 * @returns true si está disponible, false de lo contrario.
 */
 const storageAvailable = type => {
    // El objeto donde se guarda la referencia al almacenamiento.
    let storage;

    // Intenta hacer una prueba de almacenamiento.
    try {
        storage = window[type];
        const x = '__storageTest__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch(e) {
        return e instanceof DOMException && (
            // No Firefox
            e.code == 22 ||
            // Firefox
            e.code == 1014 ||
            // Campo 'nombre' para casos en que el código de error
            // no se especifica.
            // No Firefox
            e.name == 'QuotaExceededError' ||
            // Firefox
            e.name == 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // reporta error de Cuota Excedida  solo si ya hay datos guardados
            (storage && storage.length !== 0);
    }
}

/**
 * Guarda un objeto (registro), identificado por la llave (key) proporcionada,
 * en el almacenamiento de Sesión (sessionStorage).
 * 
 * @param {string} key La llave que identificará al objeto (registro) guardado.
 * @param {Object} record Registro de puntuación de un usuario.
 * @param {string} storageType El tipo de almacenamiento en el que se guardará
 * el objeto (registro).
 * @returns true si se guardó el objeto (registro), false de lo contrario.
 */
 const saveRecord = (key, record, storageType) => {
    if (storageAvailable(storageType)) {
        let storage = window[storageType];
        storage.setItem(key, JSON.stringify(record));
    } else {
        Toastify({
            text: `No está disponible el almacenamiento ${storageType}`,
            duration: 2500,
            gravity: 'top',
            position: 'right'
        }).showToast();
        return false;
    }

    return true;
};


/**
 * Devuelve un objeto, del almacenamiento proporcionado, identificado con la
 * llave proporcionada.
 * 
 * @param {string} key Llave del registro que se desea cargar.
 * @param {string} storageType Tipo de almacenamiento en el que se buscará el registro (objeto).
 * @returns Un objeto JSON, del tipo de almacenamiento proporcionado, identificado por la 
 * llave proporcionada. Devuelve nulo (null) si no existe un objeto identificado con la llave 
 * proporcionada o no está disponible el almacenamiento de Sesión.
 */
const loadRecord = (key, storageType) => {
    if (storageAvailable(storageType)) {
        let storage = window[storageType];
        return JSON.parse(storage.getItem(key));
    }

    return null;
};


/**
 * Elimina un registro, identificado con la llave proporcionada, del almacenamiento 
 * indicado.
 * 
 * @param {string} key Llave del registro a eliminar.
 * @param {string} storageType Tipo de almacenamiento del que se desea remover el registro
 */
const removeRecord = (key, storageType) => {
    if (storageAvailable(storageType)) {
        let storage = window[storageType];
        storage.removeItem(key);
    }
}


/**
 * Crea la estructura del diccionario de razas de perros en el documento.
 */
const fillBreedsLists = async () => {
    // Obtiene todas las razas de perros de la API.
    const breeds = await getAllBreeds();

    // Todas las letras del alfabeto.
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    // Crea un arreglo alfabético con todas las letras del alfabeto.
    const alphabetArray = alphabet.split('');
    // Ordena alfabéticamente las razas de perros.
    const orderedBreeds = Object.entries(breeds).sort();

    // Crea un fragmento donde se agregará el índice de razas de perros.
    const alphabetFragment = document.createDocumentFragment();

    // Título para el índice
    const indexFragmentTitle = document.createElement('h2');
    indexFragmentTitle.classList.add('index-title');
    indexFragmentTitle.textContent = 'Índice';
    alphabetFragment.appendChild(indexFragmentTitle);

    // Una lista desordenada (ul) para el índice.
    const indexList = document.createElement('ul');
    indexList.classList.add('index-list');
    indexList.setAttribute('name', 'index');

    // Crea un fragmento donde se agregaran todas las razas de perros, agrupadas alfabéticamente.
    const breedsFragment = document.createDocumentFragment();

    // Título para el fragmento de razas de perros.
    const breedsTitle = document.createElement('h2');
    breedsTitle.classList.add('breeds-title');
    breedsTitle.textContent = 'Diccionario de Razas';
    breedsFragment.appendChild(breedsTitle);

    const breedsDiv = document.createElement('div');
    breedsDiv.classList.add('breeds');

    // Recorre el arreglo alfabético ...
    alphabetArray.forEach(letter => {
        // Si encuentra, entre las razas de perros, por lo menos una que comienza con la letra en turno ...
        if (orderedBreeds.find(item => item[0].charAt(0).toLowerCase() === letter)) {
            // ... agrega esa letra al índice.
            const indexListItem = document.createElement('li');
            indexListItem.classList.add('index-list-item');
            // Elemento 'a' (liga) del elemento del índice.
            const indexListItemLink = document.createElement('a');
            indexListItemLink.classList.add('link');
            indexListItemLink.setAttribute('href', `#${letter}`);
            indexListItemLink.textContent = letter.toUpperCase();
            indexListItem.appendChild(indexListItemLink);
            indexList.appendChild(indexListItem);

            // Elemento div que contiene la lista de razas que empiezan con la letra en turno
            const letterContainer = document.createElement('div');
            letterContainer.classList.add('alphabetic-container');
            letterContainer.setAttribute('id', letter);

            // Crea el título del bloque div ...
            const letterTitle = document.createElement('h3');
            letterTitle.classList.add('letter-title');
            letterTitle.textContent = letter.toUpperCase();
            // ... y lo agrega al elemento div en turno.
            letterContainer.appendChild(letterTitle);

            // Crea una lista desordenada (ul) de razas que comienzan con la letra en turno.
            const breedsList = document.createElement('ul');
            breedsList.classList.add('breed-list');
            orderedBreeds.filter(breed => {
                // Filtra únicamente las razas cuya primera letra es igual a la letra en turno.
                if (breed[0].charAt(0).toLowerCase() === letter) {
                    return breed;
                }
            }).map(breed => {
                // Para cada raza que cumple con el filtro ...
                // ... crea un elemento li que contiene el nomnre de la raza, con una liga que lleva a una foto ...
                const breedListItem = document.createElement('li');
                breedListItem.classList.add('breed-item');
                const breedLink = document.createElement('a');
                breedLink.classList.add('link');
                breedLink.setAttribute('href', 'views/pictures.html');
                breedLink.textContent = breed[0];
                breedLink.addEventListener('click', event => {
                    if (storageAvailable('sessionStorage')) {
                        const breedRecord = { breed: breed[0], };

                        if (!saveRecord('breed', JSON.stringify(breedRecord), 'sessionStorage')) {
                            event.preventDefault();
                        }
                    }
                });
                breedListItem.appendChild(breedLink);
                // ... y lo agrega a la lista.
                breedsList.appendChild(breedListItem);
            });

            // Agrega la lista desordenada de razas al elemento div en turno.
            letterContainer.appendChild(breedsList);

            // Agrega una liga para regresar al índice.
            const indexLinkParagraph = document.createElement('p');
            indexLinkParagraph.setAttribute('alt', 'Regresar al índice');
            indexLinkParagraph.classList.add('goto-index');
            const indexButtonLink = document.createElement('a');
            indexButtonLink.setAttribute('href', '#breeds-index');
            indexButtonLink.classList.add('link', 'index-button');
            const indexButtonLinkIcon = document.createElement('span');
            indexButtonLinkIcon.classList.add('material-symbols-outlined');
            indexButtonLinkIcon.textContent = 'arrow_upward';
            indexButtonLink.appendChild(indexButtonLinkIcon);

            indexLinkParagraph.appendChild(indexButtonLink);
            letterContainer.appendChild(indexLinkParagraph);

            // Agrega el elemento div en turno al fragmento de razas.
            breedsDiv.appendChild(letterContainer);
        }
    });



    // Agrega el índice alfabético al fragmento correspondiente.
    alphabetFragment.appendChild(indexList);

    // Agrega el índice alfabético de razas al contenedor del diccionario de razas.
    breedsIndex.innerHTML = '';
    breedsIndex.appendChild(alphabetFragment);

    breedsFragment.appendChild(breedsDiv);

    // Limpia el contenedor antes de agregar el fragmento.
    breedsContainer.innerHTML = '';

    // Agrega el diccionario de razas al contenedor del diccionario de razas.
    breedsContainer.appendChild(breedsFragment);

    if (syncIcon.classList.contains('in-sync')) {
        syncIcon.classList.remove('in-sync');
    }
}
