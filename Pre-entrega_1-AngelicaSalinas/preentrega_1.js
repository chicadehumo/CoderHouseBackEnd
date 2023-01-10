class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
  setId(id) {
    this.id = id;
  }
}

class ProductManager {
    #products
  constructor() {
    this.#products = [];
    this.idManager = 1;
  }

  validateProduct(product) {
    let flag = false;
    this.#products.forEach((producto) => { //Valido que no se repida el atributo code
      producto.code === product.code && (flag = true);
    });
    if (!flag) {
      if ( //Valido que los campos no esten vacios
        product.title !== "" &&
        product.description !== "" &&
        product.price !== "" &&
        product.thumbnail !== "" &&
        product.code !== "" &&
        product.stock !== ""
      ) {
        return true; //Si cumple todas las condiciones retorna verdadero
      } else {
        return `Error: No se pudo cargar ${product.title}, no debe haber casilleros vacios`;
      }
    } else {
      return `Error: El producto ${product.title} tiene el mismo codigo que otro producto`;
    }
  }

  addProduct(product) {
    const validacion = this.validateProduct(product)
    if (validacion === true) {
      product.setId(this.idManager);
      this.idManager += 1;
      this.#products.push(product);
      return `Carga de producto ${product.title} exitosa`
    } else {
      return validacion
    }
  }

  getProdcuts(){
    return this.#products
  }

  getProductById(id){
    return (this.#products.find(product => product.id === id)) || 'Error: Producto no encontrado' //Devuelve el producto, en caso de no encontrarlo devuelve un error
  }
}

const producto1 = new Product("Sahumerio", "Los sahumerios se han empleado desde la antigüedad para realizar rituales de limpieza y protección de energía.", 333, "s", "msS123", 108);

const producto2 = new Product("Zafus y zabufón","Relleno cascara de cacao. Funda y cubierta de tela hecha con pet 100% reciclado.", 555, "z", "msZ123", 54);

const producto3 = new Product("Ying Yang | Vela soha", "𝐲𝐢𝐧 𝐲𝐚𝐧𝐠 que armoniza nuestro hogar recordándonos que en cada cosa existen opuestos esenciales y complementarios, aún en nosotros", 108, "y", "msS123", 111);

const producto4 = new Product('Juego de macetas', '', '', '', '', '')

const ManejadorProductos = new ProductManager();

console.log(ManejadorProductos.addProduct(producto1))

console.log(ManejadorProductos.addProduct(producto2))

console.log(ManejadorProductos.addProduct(producto3)) //Producto con el mismo codigo que producto 1, debe dar error

console.log(ManejadorProductos.addProduct(producto4)) //Producto con parametros nulos, error


console.log('Metodo getProducts')
console.log(ManejadorProductos.getProdcuts())

console.log('Metodo getProductById')
console.log(ManejadorProductos.getProductById(3))

console.log('Metodo getProductById')
console.log(ManejadorProductos.getProductById(6)) //Busca un producto inexistente,  error