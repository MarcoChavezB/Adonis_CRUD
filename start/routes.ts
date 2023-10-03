import EmpleadosController from 'App/Http/EmpleadosController'
import ProductosController from 'App/Controllers/Http/ProductosController'
import ProveedoresController from 'App/Controllers/Http/ProveedoresController'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.get('empleados', 'EmpleadosController.index')
Route.post('empleados/store', 'EmpleadosController.store')
Route.delete('empleados/delete/:id', 'EmpleadosController.destroy').where('id', /^[0-9]+$/)
Route.put('empleados/update/:id', 'EmpleadosController.update').where('id', /^[0-9]+$/)



Route.get('productos', 'ProductosController.index')
Route.post('productos/store', 'ProductosController.store')
Route.delete('productos/destroy/:id', 'ProductosController.destroy').where('id', /^[0-9]+$/)
Route.put('productos/update/:id', 'ProductosController.update').where('id', /^[0-9]+$/)

Route.get('proveedores', 'ProveedoresController.index')
Route.post('proveedores/store', 'ProveedoresController.store')
Route.delete('proveedores/destroy/:id', 'ProveedoresController.destroy').where('id', /^[0-9]+$/)
Route.put('proveedores/update/:id', 'ProveedoresController.update').where('id', /^[0-9]+$/)

