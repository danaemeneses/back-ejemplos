const fs = require("fs");

class Contenedor {
  constructor(filename) {
    this.archivo = filename;
  }


  async getAll() {//Devuelve un array con todos los objetos del archivo
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      //lo parseo
      const arrayData = await JSON.parse(data); 
      return arrayData; // lo devuelvo
    } catch (e) {
      //si da error x parsear "data" , entonces asigno el []
      console.log(e);
    }
  }


  async save(obj) {    //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    try {
      const arrayData = await this.getAll(); // guardo en una variable lo que traigo del archivo, uso getAll para optimizar código 
      arrayData.length == 0
        ? (obj.id = 1) // si la longitud del array es 0, entones el id de mi nuevo objeto será 1 
        : (obj.id = arrayData[arrayData.length - 1].id + 1) // sino será el numero siguiente al último id;
      arrayData.push(obj); // pusheo a arrayData el obj recibido por parámetro
      fs.promises.writeFile(this.archivo, JSON.stringify(arrayData)); // escribo en el archivo este array con mi nuevo objeto agregado
      return obj.id; // devuelvo el id de mi objeto 
    } catch (e) {
      console.error("Error", e);
    }
  }


  async getById(id) {//Recibe un id y devuelve el objeto con ese id, o null si no está.
    try {
      const arrayData = await this.getAll(); //Leo archivo 
      const objObtenido = arrayData.find((e) => e.id == id) || null; // Busco el objeto cuyo id coincida con el recibido por parámetro y sino encuentra, será null 
      return objObtenido;
    } catch (e) {
      console.error("Error", e);
    }
  }


  async updateById(id, data) {
    const producto = await this.getById(id);
    try {
      const arrayData = await this.getAll(); //leo archivo 
      const index = arrayData.findIndex((e) => e.id == id);// busco el index del producto que modificare
      let product = arrayData[index];  // en una variable guardo el producto 
      product = data;  // lo igualo a la data que es lo que recibi por body 
      product.id = id; // el id seguirá siendo el mismo 
      arrayData[index] = product; // al indice de mi producto lo convierto en este nuevo producto 
      await fs.promises.writeFile(this.archivo, JSON.stringify(arrayData)); // escribo sobre el arcchivo
    } catch (e) {
      console.error("Error", e);
    }
    
  }


  async deleteById(id) {//Elimina del archivo el objeto con el id buscado.
    try {
      const arrayData = await this.getAll(); 
      const index = arrayData.findIndex((e) => e.id == id);
      index && arrayData.splice(index, 1);
      fs.promises.writeFile(this.archivo, JSON.stringify(arrayData));
    } catch (e) {
      console.error("Error", e);
    }
  }


  async deleteAll() {//Elimina todos los objetos presentes en el archivo.
    try {
      const arrayData = [];
      fs.promises.writeFile(this.archivo, JSON.stringify(arrayData)); // Escribo sobre mi archivo un array vacío
    } catch (e) {
      console.log("Error al limpiar el archivo", e);
    }
  }


}
module.exports = Contenedor;