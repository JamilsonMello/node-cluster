const express = require('express')
const cluster = require('cluster')
const os = require('os')

const app = express(express.json())

if (cluster.isMaster) {
    for (let index = 0; index < os.cpus().length; index++) {
        const worker = cluster.fork()
        console.log(`Worker Running ${worker.id}`)
    }
} else {
    app.get('/', (_, res) => {
       // console.log(`Executing... ${cluster.worker.id}`)

        res.send('Hello World')
    })

    app.listen(3000)
}