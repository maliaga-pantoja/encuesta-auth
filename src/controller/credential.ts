import Driver from "../datasource/drivers/mysql-driver";
import Base from './base'
import Uuid from 'node-uuid'
import * as CredentialInterface from '../interfaces/credential'
class Place extends Base{
  private driver: Driver
  private tableName: string
  constructor(driver: Driver) {
    super()
    this.driver = driver
    this.tableName = 'credentials'
  }
  public async Create (credential: CredentialInterface.model) {
    try {
      credential.id = Uuid.v4()
      credential.createdAt = new Date()
      let inserted = await this.driver.Create({
        query: `insert into ? (id, user, user_email, 
                password, createdAt) values (
                  ?, ?, ?, ?, ?, ?
                );`,
        data: [
                this.tableName, credential.id, credential.user_email,
                credential.password, credential.createdAt
              ]
      })
      return inserted
    } catch (error) {
      throw error
    }
  }
  public async FindById (userId: string) {
    try {
      
      let user = await this.driver.Find({
        query: `select * from ? where id = ?;`,
        params: [this.tableName, userId]
      })
      return user
    } catch (error) {
      throw error
    }
  }
}
export default Place