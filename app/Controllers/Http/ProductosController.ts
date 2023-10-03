import Producto from 'App/Models/Producto'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductosController {

   public async index({response}:HttpContextContract){
    try{
        const productos = await Producto.all()
        return response.status(200).json({msg:"Productos", productos})

    }catch(erorr){
        return response.status(500).json({mensaje: "Erorr en mostrar los proveedores"})
    }
   }

   public async store({request, response}: HttpContextContract){
    const data = request.only(['nombre', 'categoria', 'precio', 'proveedor'])

        try{
            const producto = new Producto()
            producto.fill(data)
            await producto.save()
            return response.status(201).json({msg:"Producto registrado con exito" , data})

        }catch(error){
            return response.status(500).json({msg:"Error al alamacenar el producto"})
        }
   }


   public async destroy({params, response}:HttpContextContract){
    try{
        const productoEliminar = await Producto.find(params.id)
        if(!productoEliminar){
            return response.status(404).json({msg:"Producto no encontrado"})
        }
        await productoEliminar.delete()
        return response.status(204).json({
            msg: "Producto eliminado con exito",
            id: productoEliminar.id,
            fechaEliminado: new Date().toISOString()
        })
    }catch(error){
        return response.status(500).json({msg:"Error al eliminar el producto"})
    }
}

    public async update({request, response, params}:HttpContextContract){
        try {
            const productoUpdate = await Producto.find(params.id)
            if(!productoUpdate){
                return response.status(404).json({msg:"Producto no encontrado"})
            }
            const data = request.only(['nombre', 'categoria', 'precio', 'proveedor'])
            productoUpdate.merge(data)
            await productoUpdate.save()
        } catch (error) {
            return response.status(500).json({msg:"Error al actualizar el producto"})
        }
    }


}
