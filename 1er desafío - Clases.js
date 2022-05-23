class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor})
    }

    getBookNames() {
        const bookNames = []
        this.libros.forEach(e => {
            bookNames.push(e.nombre)
        })
        return bookNames
    }
}

const me = new Usuario("Rommel", "Aranguren")

console.log(me.getFullName())

me.addMascota("Ascaris Lumbricoides")
me.addMascota("Taenia saginata")
console.log(me.countMascotas())
console.log(me.mascotas);
me.addBook("A Song of Ice and Fire", "George R.R. Martin")
me.addBook("The Witcher", "Andrzej Sapkowski")
console.log(me.libros);
console.log(me.getBookNames())