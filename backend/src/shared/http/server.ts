import 'reflect-metadata'
import { app } from './app'
import { connectionSource } from '../typeorm'

connectionSource
    .initialize()
    .then(() => {
        const server = app.listen(3333, () => {
            console.log('Server started on port ' + 3333)
        })
    })
    .catch(() => console.log('server offline'))
