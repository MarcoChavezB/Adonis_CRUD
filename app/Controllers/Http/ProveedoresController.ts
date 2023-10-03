import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Proveedor from 'App/Models/Proveedor'


export default class ProveedoresController  {
  
        public async index ({response} : HttpContextContract){
            try{

             const proveedor = await Proveedor.all()
             if (!proveedor) {
                return response.status(404).json({msg:"Proveedores sin registrar"})
            }

              return response.status(200).json(proveedor)
            }
            catch(error){
              console.error(error)
              return response.status(500).json({msg:"Error al obtener empleados", error})
            }
        }

        public async store({request, response}:HttpContextContract){
            try {
                const data = request.only(['nombre', 'direccion', 'telefono', 'correo'])
            
                const proveedor = new Proveedor()
                proveedor.fill(data)
                await proveedor.save()

                return response.status(201).json({msg:"Proveedor registrado con exito" , data})

            } catch (error) {
                return response.status(500).json({msg:"Error al alamacenar el proveedor"}, error);
                
            }
            
        }

        public async destroy({params, response}:HttpContextContract){
           try {
            const proveedorDestroy = await Proveedor.find(params.id)

            if (!proveedorDestroy) {
                return response.status(404).json({msg:"Proveedor no encontrado"})
            }
            
            await proveedorDestroy.delete()
            
            return response.status(204).json({msg:"proveedor eliminado con exito", proveedorDestroy})

           } catch (error) {
            return response.status(500).json({msg:"Error al eliminar el proveedor", error})
           }
        }

        public async update({request, params, response}:HttpContextContract){
            try {
                const proveedorUpdate = await Proveedor.find(params.id)
                const data = request.only(["nombre", "direccion", "telefono", "correo"])
                
                if (!proveedorUpdate) {
                    return response.status(404).json({msg:"Proveedor no encontrado"})
                }
    
                proveedorUpdate.merge(data)
                await proveedorUpdate.save()
            } catch (error) {
                return response.status(500).json({msg:"Error al actualizar el proveedor", error})
            }
        }

}
