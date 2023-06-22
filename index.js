import config from 'dotenv/config'
import express from 'express'
import sequelize from './sequelize.js'
import * as mapping from './models/mapping.js'
import cors from 'cors'
import router from './routes/index.js'

const PORT = process.env.PORT || 5000

const app = express()
// Cross-Origin Resource Sharing
app.use(cors({origin: ['http://localhost:3000'], credentials: true}))
// middleware для работы с json
app.use(express.json())
// middleware для статики (img, css)
app.use(express.static('static'))

// все маршруты приложения
app.use('/api', router)

// обработка ошибок
// app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        sequelize.freeTableName =  true;
        // await sequelize.sync({ force: true })
        await sequelize.sync()
        // console.log(sequelize.process.env)
        app.listen(PORT, () => console.log('Сервер запущен на порту', PORT))
    } catch(e) {
        console.log(e)
    }
}

start()
