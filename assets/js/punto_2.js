const BASE_URL = `https://api.disneyapi.dev/`;
const content_list = document.getElementById(`content-disney-list`);
const content_detail = document.getElementById(`disney-detail`);
const form = document.getElementById(`form-disney`);

const getData = (complement) => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}${complement}`)
        .then(response => response.json())
        .then(data => {
            resolve(data);
        })
        .catch(error => console.error(error));
    });
}
const detailCharacter = async(id) => {
    const detail = await getData(`characters/${id}`);
    printDetailDisney(detail);
    return false;
}
const printDetailDisney = (detail) => {
    content_detail.innerHTML = '';
    if (detail) {
        const {_id, films, shortFilms, tvShows, videoGames, parkAttractions, allies, enemies, name, imageUrl} = detail;
        // Crear la tabla
        const infoCharacter = document.createElement('div');
        infoCharacter.innerHTML = `<div><span class="nombres">Nombre : </span><p>${name}</p></div>
            <div><span class="nombres">Imagen :</span><div class="content-img"><img src="${imageUrl}" /> </div></div>
            <div><span class="nombres">Peliculas : </span><p>${films.join('<br>')}</p></div>
            <div><span class="nombres">Cortometrajes : </span><p>${shortFilms.join('<br>')}</p></div>
            <div><span class="nombres">Programas TV : </span><p>${tvShows.join('<br>')}</p></div>
            <div><span class="nombres">Videojuegos : </span><p>${videoGames.join('<br>')}</p></div>
            <div><span class="nombres">Atracciones en parques : </span><p>${parkAttractions.join('<br>')}</p></div>
            <div><span class="nombres">Alias</span><p>${allies.join('<br>')}</p></div><div>
            <span class="nombres">Enemigos : </span><p>${enemies.join('<br>')}</p></div>`;
        content_detail.appendChild(infoCharacter);
    }
}
const printListDisney = (data) => {
    content_list.innerHTML = '';
    if (data.length > 0) {
        // Crear la tabla
        const table = document.createElement('table');
        // Crear la cabecera
        const tableHeader = document.createElement('tr');
        // Crear las columnas de la cabecera
        const name = document.createElement('th');
            name.style.width = "45%";
        const image = document.createElement('th');
            image.style.width = "45%";
        const detail = document.createElement('th');
            detail.style.width = "10%";
        // Agregar los textos a las columnas
        name.innerText = "Personaje";
        image.innerText = "Imagen";
        detail.innerText = "Ver detalle";
        // Agregar las columnas a la cabecera
        tableHeader.appendChild(name);
        tableHeader.appendChild(image);
        tableHeader.appendChild(detail);
        // Agregar la cabecera a la tabla
        table.appendChild(tableHeader);

        for (let i = 0; i < data.length; i++) {
            const character = data[i];
            // Crear una fila
            const characterRow = document.createElement('tr');
            // Crear las columnas
            const nameCel = document.createElement('td');
            const imageCel = document.createElement('td');
            const detailCel = document.createElement('td');
            // Agregar los datos a las columnas
            nameCel.innerHTML = `<span class="nombres">${character.name}</span>`;
            imageCel.innerHTML = `<div class="content-img"><img src="${character.imageUrl}" /> </div>`;
            detailCel.innerHTML = `<a href="#" class="btn-action-delete" onClick="detailCharacter(${character._id})" ><i class="fas fa-eye fa-fw"></i></a>`;
            // Agregar las columnas a la fila
            characterRow.appendChild(nameCel);
            characterRow.appendChild(imageCel);
            characterRow.appendChild(detailCel);
            // Agregar la fila a la tabla
            table.appendChild(characterRow);
        }
        // Agregar la tabla al body
        content_list.appendChild(table);
    }
}
const listarDisney = async() =>{
    const {data} = await getData(`characters`);
    if(data){
        printListDisney(data);
    }
}
const formListener = async (event) => {
    event.preventDefault();
    let formData = new FormData(form);
    const name = formData.get('nombre');
    const url = (name != '')? `character?name=${name}` : `characters`;
    const {data} = await getData(url);
    if(data){
        printListDisney(data);
    }
    content_detail.innerHTML = '';
    return;
}
listarDisney();
form.addEventListener('submit', formListener);