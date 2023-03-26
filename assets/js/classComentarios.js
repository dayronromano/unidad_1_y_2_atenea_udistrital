class Comentarios {
  constructor({ nombre, comentario }) {
    this.id = '';
    this.nombre = nombre;
    this.comentario = comentario;
    this.fecha = '';
  }

  getDate() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let mili = date.getMilliseconds();

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (mili < 10) {
      mili = `0${mili}`;
    }

    return { id: `${hours}${minutes}${seconds}${mili}`, date: `${day}/${month}/${year} ${hours}:${minutes}:${seconds}` };
  }

  setData() {
    let getdate = this.getDate();
    this.id = getdate.id;
    this.fecha = getdate.date;
  }

  validate() {
    let status = false;
    let errors = [];
    if (this.nombre == '') {
      status = true;
      errors.push({ field: 'nombre', msg: 'Nombre no puede estar vacio' });
    }
    if (this.comentario == '') {
      status = true;
      errors.push({ field: 'comentario', msg: 'Comentario no puede estar vacio' });
    }
    return { status, errors };
  }

}
