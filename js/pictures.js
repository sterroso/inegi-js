// La URL de entrada a la API de imágenes de perros.
const apiURL = 'https://dog.ceo/api/';

// Almacena el nombre de la raza.
const breed = {
    name: '',
    picsLinks: [],
};


// Título que contiene el nombre de la raza de perro.
const breedTitle = document.getElementById('breed-name');


// Contenedor de las imágenes.
const picturesContainer = document.getElementById('pictures-container');


// Botón para cargar las imágenes de los perros.
const loadPicturesButton = document.getElementById('get-pictures');

loadPicturesButton.addEventListener('click', event => {
    if (breed.picsLinks) {
        const picturesListFragment = document.createDocumentFragment();

        breed.picsLinks.forEach(link => {
            const picDiv = document.createElement('div');
            picDiv.classList.add('picture-item-container');
    
            const picItem = document.createElement('img');
            picItem.classList.add('dog-picture');
            picItem.setAttribute('src', link);
    
            picDiv.appendChild(picItem);
    
            picturesListFragment.appendChild(picDiv);
        });
    
        picturesContainer.appendChild(picturesListFragment);
    } else {
        console.error('No se encontró lista de imágenes.')
    }
});


window.addEventListener('load', async event => {
    if (storageAvailable('sessionStorage')) {
        breed.name = JSON.parse(loadRecord('breed', 'sessionStorage')).breed;

        breedTitle.textContent = `${breed.name.charAt(0).toUpperCase()}${breed.name.substring(1)}`;

        breed.picsLinks = await getAllImagesByBreed(breed.name);

        console.debug(breed.picsLinks);
    } else {
        console.error('No está disponible el almacenamiento.');
    }
});


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
        // Si hubo un error en la consulta se escribe el error en la consola.
        console.error(`No fue posible obtener las imágenes de la raza ${breed}.`, error);
    }
}

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
        alert(`No está disponible el almacenamiento ${storageType}.`);
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