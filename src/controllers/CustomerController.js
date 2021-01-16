const database = require('../database')

module.exports = {
    async list(request, response) {
       const customers = await database.select().table('customers')
       return response.status(200).json(customers)
    },

    async add(request, response) {
        const { name, phone, cep, uf, city, district, address, number, cnpj, date } = request.body

        database.insert({
            name, 
            phone, 
            cep, 
            uf, 
            city, 
            district, 
            address, 
            number, 
            cnpj,
            date 
        }).into('customers').then(result => {
            return response.status(200).json({ ok: true, id: result[0] })
        }).catch(err => {
            console.log(err)
            return response.status(400).json({ ok: false })
        })
    },

    async delete(request, response) {
        const { id } = request.body
        await database.delete().where({ id }).table('customers').then(result => {
            return response.status(200).json({ ok: true })
        }).catch(err => {
            return response.status(400).json({ ok: false })
        })
    }
}