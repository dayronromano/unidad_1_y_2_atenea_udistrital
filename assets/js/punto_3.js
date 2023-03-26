let comentarios = [];
const form = document.getElementById('form-comentarios');

const showAlert = (icon, text) => {
    Swal.fire({icon,title: '',text});
}
const showErrors = ({ formData, errors }) => {
    for (let [name, value] of formData) {
        if (name !== 'id') {
            let index = errors.findIndex(error => error.field === name);
            if (index >= 0) {
                document.getElementById(`comentarios-${name}`).classList.add('invalid');
            } else {
                document.getElementById(`comentarios-${name}`).classList.remove('invalid');
            }
            document.getElementById(`comentarios-${name}-error`).innerHTML = (index >= 0) ? errors[index].msg : '';
        }
    }
}
const searchComment = (id) => {
    return comentarios.findIndex(comment => parseInt(comment.id) === parseInt(id));
}
const updateComment = (id) => {
    let index = searchComment(id);
    if (index >= 0) {
        const comentario = comentarios[index];
        let formData = new FormData(form);
        for (let [name, value] of formData) {
            if (name !== 'fecha') {
                document.getElementById(`comentarios-${name}`).value = comentario[name];
            }
        }
    }
    return false;
}
const deleteComment = (id) => {
    let index = searchComment(id);
    if (index >= 0) {
        comentarios.splice(index, 1);
        showAlert('success', 'Comentario eliminado con exito')
        printComentarios();
    }
    return false;
}
const resetForm = () => {
    document.getElementById(`comentarios-id`).value = '';
    form.reset();
}
const printComentarios = () => {
    document.getElementById(`content-comment-list`).innerHTML = '';
    const itemsComments = comentarios;
    if (itemsComments.length > 0) {
        // Crear la tabla
        const table = document.createElement('table');
        // Crear la cabecera
        const tableHeader = document.createElement('tr');
        // Crear las columnas de la cabecera
        const header = document.createElement('th');
            header.style.width = "80%";
        const update = document.createElement('th');
            update.style.width = "10%";
        const delet = document.createElement('th');
            delet.style.width = "10%";
        // Agregar los textos a las columnas
        header.innerText = "Comentario";
        update.innerText = "Editar";
        delet.innerText = "Eliminar";
        // Agregar las columnas a la cabecera
        tableHeader.appendChild(header);
        tableHeader.appendChild(update);
        tableHeader.appendChild(delet);
        // Agregar la cabecera a la tabla
        table.appendChild(tableHeader);

        for (let i = (itemsComments.length -1); i >= 0; i--) {
            const comment = itemsComments[i];
            // Crear una fila
            const commentRow = document.createElement('tr');
            // Crear las columnas
            const commentCel = document.createElement('td');
            const updateCel = document.createElement('td');
            const deleteCel = document.createElement('td');
            // Agregar los datos a las columnas
            commentCel.innerHTML = `<div class="content-coment"><span class="nombres">${comment.nombre}</span><p>${comment.comentario}</p><span class="fecha">${comment.fecha}</span></div>`;
            updateCel.innerHTML = `<a href="#" class="btn-action-update" onclick="updateComment(${comment.id})" ><i class="fas fa-pencil-alt"></i></a>`;
            deleteCel.innerHTML = `<a href="#" class="btn-action-delete" onClick="deleteComment(${comment.id})" ><i class="fas fa-trash-alt"></i></a>`;
            // Agregar las columnas a la fila
            commentRow.appendChild(commentCel);
            commentRow.appendChild(updateCel);
            commentRow.appendChild(deleteCel);
            // Agregar la fila a la tabla
            table.appendChild(commentRow);
        }
        // Agregar la tabla al body
        document.getElementById(`content-comment-list`).appendChild(table);
    }
}
const formListener = (event) => {
    event.preventDefault();
    let type = event.type;
    let formData = new FormData(form);
    const comentario = new Comentarios({ nombre: formData.get('nombre'), comentario: formData.get('comentario') });
    const { status, errors } = comentario.validate();
    if (!status && type === 'submit') {
        showAlert('success', 'Informacion ingresada con exito!');
        if (formData.get('id') == '') {
            comentario.setData();
            comentarios.push(comentario);
        } else {
            let index = searchComment(formData.get('id'));
            if (index >= 0) {
                comentarios[index] = { ...comentarios[index], nombre: comentario.nombre, comentario: comentario.comentario };
            }
        }
        //save comentario
        resetForm();
        printComentarios();
    } else {
        //show errors
        showErrors({ formData, errors });
    }
    return;
}
form.addEventListener('submit', formListener);
form.addEventListener('change', formListener);