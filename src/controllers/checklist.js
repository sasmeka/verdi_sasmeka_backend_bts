const control = {}
const model = require('../models/checklist_model')
const resp = require('../utils/responses')

control.getAllData = async (req, res) => {
    try {
        let { page, limit } = req.query
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 100
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const result = await model.getAllData({ limit, offset })
        if (result.rowCount == 0) throw 'data not found.'
        const result_count_data = await model.getCountData()
        const meta = {
            next: result_count_data.rows[0].count_data <= 0 ? null : page == Math.ceil(result_count_data.rows[0].count_data / limit) ? null : page + 1,
            prev: page == 1 ? null : page - 1,
            last_page: Math.ceil(result_count_data.rows[0].count_data / limit),
            total: result_count_data.rows[0].count_data
        }
        return resp(res, 200, result.rows, meta)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.getAllDataItems = async (req, res) => {
    try {
        let { page, limit } = req.query
        const id_checklist = req.params.id
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 100
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const result = await model.getAllDataItems({ limit, offset, id_checklist })
        if (result.rowCount == 0) throw 'data not found.'
        const result_count_data = await model.getCountDataItems({ id_checklist })
        const meta = {
            next: result_count_data.rows[0].count_data <= 0 ? null : page == Math.ceil(result_count_data.rows[0].count_data / limit) ? null : page + 1,
            prev: page == 1 ? null : page - 1,
            last_page: Math.ceil(result_count_data.rows[0].count_data / limit),
            total: result_count_data.rows[0].count_data
        }
        return resp(res, 200, result.rows, meta)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.addData = async (req, res) => {
    try {
        const { name } = req.body
        const id_user = req.data_jwt.id_user
        const result = await model.addData({ name, id_user })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}
control.addDataItems = async (req, res) => {
    try {
        const { itemName } = req.body
        const id_checklist = req.params.id
        const result = await model.addDataItems({ itemName, id_checklist })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_checklist = req.params.id
        const id_user = req.data_jwt.id_user
        const result = await model.deleteData({ id_checklist, id_user })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.deleteDataItems = async (req, res) => {
    try {
        const id_checklist = req.params.id
        const id_item = req.params.id2
        const id_user = req.data_jwt.id_user
        const result = await model.deleteDataItems({ id_checklist, id_user, id_item })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control