import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'productos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 50).notNullable()
      table.string('categoria', 50)
      table.decimal('precio', 10,2).notNullable()
      table.string('proveedor', 50)
      
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: false })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
