const prueba = fetch('http://localhost:3000/api/inventario')
.then(response => {
  if (!response.ok) {
    throw new Error('No responde');
  }
  return response.json(); 
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Fetch error:', error);
});
import { createConnection } from 'mysql2';

// Configuración de la conexión a la base de datos
const connection = createConnection({
  host: 'localhost', // Cambia esto por la dirección de tu servidor de base de datos
  user: 'root',
  password: '',
  database: 'lopezfontalvo',
});

// Función para obtener un producto por su ID
function obtenerProductoPorId(Id) {
  return new Promise((resolve, reject) => {
    // Consulta SQL para obtener el producto por su ID
    const sql = 'SELECT * FROM inventario WHERE id = ?';

    connection.query(sql, [Id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (results.length > 0) {
          resolve(results[0]); // Devuelve el primer resultado (debería ser único por el ID)
        } else {
          resolve(null); // Si no se encuentra el producto, devolvemos null
        }
      }
    });
  });
}

// Ejemplo de uso:
const idProductoBuscado = 1; // Cambia esto por el ID del producto que deseas buscar

obtenerProductoPorId(idProductoBuscado)
  .then((producto) => {
    if (producto) {
      console.log('Producto encontrado:', producto);
    } else {
      console.log('Producto no encontrado.');
    }
  })
  .catch((error) => {
    console.error('Error al obtener el producto:', error);
  });
