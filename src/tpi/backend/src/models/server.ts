import express, { Application, Request, Response } from 'express'
import db from '../db/connection'
import cors from 'cors'

// routes
import routesIngredients from '../routes/ingredient'
import routesRecipes from '../routes/recipe'
import routesUsers from '../routes/user'

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001'

    this.listen()
    this.middlewares()
    this.routes()

    this.dbConnect()
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicacion corriendo en el puerto ${this.port}`)
    })
  }

  routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        msg: 'Api working'
      })
    })

    this.app.use('/api/ingredients', routesIngredients)
    this.app.use('/api/recipes', routesRecipes)
    this.app.use('/api/users', routesUsers)
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  async dbConnect() {
    try {
      await db.sync({ alter: true });
    } catch (error) {
      console.log(error)
    }
  }
}

export default Server;