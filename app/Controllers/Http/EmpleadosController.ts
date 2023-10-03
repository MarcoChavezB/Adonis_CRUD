import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empleado from 'App/Models/Empleado'


export default class EmpleadosController {
  
  public async index ({response} : HttpContextContract){
      try{
       const empleado = await Empleado.all()
        return response.status(200).json(empleado)
      }
      catch(error){
        console.error(error)
        return response.status(500).json({msg:"Error al obtener empleados"})
      }
  }




  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['nombre', 'apellido', 'correo', 'seccion'])
    
    try {
      const empleado = new Empleado()
      empleado.fill(data)
      await empleado.save()
      return response.status(201).json({mensaje: "se registro el empleado: ", empleado})

    } catch (error) {

      console.error(error)

      return response.status(500).json({ mensaje: 'Error al almacenar el empleado', data, error })
    }
  }




  
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const empleado = await Empleado.find(params.id)
      
      if (!empleado) {
        return response.status(404).json({ mensaje: 'Empleado no encontrado' })
      }
      
      await empleado.delete()
      return response.status(204).json({ mensaje: 'Empleado eliminado con éxito:', params })

    } catch (error) {
      console.error(error)
      return response.status(500).json({ mensaje: 'Error al eliminar el empleado', error })
    }
  }



  

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['id', 'nombre', 'apellido', 'correo', 'seccion'])
    
    try {
      const empleado = await Empleado.find(params.id)
      
      if (!empleado) {
        return response.status(404).json({ mensaje: 'Empleado no encontrado' })
      }
      
      empleado.merge(data)
      await empleado.save()
      
      return response.status(200).json({ mensaje: 'Empleado actualizado con éxito', empleado })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ mensaje: 'Error al actualizar el empleado', data, error })
    }
  }
}
