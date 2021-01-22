const database = require('../database')
const { v4: uuidv4 } = require('uuid')
module.exports = {
    async list(request, response) {
       const containers = await database.select().table('containers')
       return response.status(200).json(containers)
    },

    async add(request, response) {
        const { number, sale_price, purchase_price, container_type, container_location, stack, height, status, customer_name, date } = request.body

        database.insert({
            number, 
            sale_price,
            purchase_price,
            container_type,
            container_location,
            stack,
            height,
            status, 
            customer_name,
            date,
            token: uuidv4().split('-').join('')
        }).into('containers').then(result => {
            return response.status(200).json({ ok: true, id: result[0] })
        }).catch(err => {
            console.log(err)
            return response.status(400).json({ ok: false, message: 'erro ao adicionar o container' })
        })
    },

    async delete(request, response) {
        const { id } = request.body
        await database.delete().where({ id }).table('containers').then(result => {
            return response.status(200).json({ ok: true })
        }).catch(err => {
            console.log(err)
            return response.status(400).json({ ok: false })
        })
    },

    async link(request, response) {
        const { id, customer_name, status } = request.body

        var data = {
            id,
            customer_name,
            status
        }

        database.update(data).where({ id }).table('containers').then(result => {
            return response.status(200).json({ ok: true })
        }).catch(err => {
            return response.status(400).json({ ok: false })
        })
    },

    async info(request, response) {
        const { container } = request.query

        database.select().where({ token: container }).table('containers').then(result => {
            return response.status(200).json(result)
        }).catch(err => {
            return response.status(200).json({ ok: false })
        })
    }
}