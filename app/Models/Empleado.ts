import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Empleado extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public nombre: string

  @column()
  public apellido: string

  @column()
  public correo: string

  @column()
  public seccion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
