const fs = require('fs');

class ProductDao {
    constructor(path) {
        this.path = `databases/${path}`;
    }

    async save(object) {
        object.id = `${Date.now()}`;
        let objects = await this.getAll();
        if (objects.some(o => o.id == object.id)) return;
        objects.push(object);
        try {
            fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        } catch (error) {
            throw new Error(`Error en guardar objeto de id ${object.id}`);
        }
        return object;

    }

    async update(object,id) {
        const objects = await this.getAll();
        const objectIndex = objects.findIndex(p => p.id == id);
        if(objectIndex==-1) return new Error("No hay persona con el id").tipo = 'db not found';
        object.id = id;
        objects[objectIndex] = object;
        try {
            fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        } catch (error) {
            throw new Error(`Error en guardar objeto de id ${object.id}`);
        }
        return object;

    }

    async getById(id) {
        const objects = await this.getAll();
        const object = objects.find(p => p.id == id);
        if(object === undefined){
            const error = new Error("No hay producto con ese id");
            error.tipo = 'db not found'
            throw error;
        }
        return object;
    }

    async getAll() {
        let objects;
        try {
            objects = await fs.promises.readFile(this.path, 'utf-8');
        } catch (error) {
            throw new Error(`Error en leer archivo ${this.path}`);
        }
        if (objects.length == 0) return [];
        objects = [...JSON.parse(objects)];
        return objects;
    }

    async deleteById(id) {
        let objects = await this.getAll();
        let index = objects.findIndex(o => o.id == id);
        if (index == -1) return;
        objects.splice(index, index == 0 ? index + 1 : index);
        try {
            return fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        } catch (error) {
            throw new Error(`Error en escritura, al borrar objeto de id ${id}`);
        }
    }

    async deleteAll() {
        try {
            return fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        } catch (error) {
            throw new Error("Error en escritura, al borrar todos los objetos");
        }
    }
}

module.exports = { ProductDao };