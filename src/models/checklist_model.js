const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.checklists LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_checklist) as count_data from public.checklists;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getAllDataItems = ({ limit, offset, id_checklist }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.checklist_items WHERE id_checklist_item=$3 LIMIT $1 OFFSET $2;`, [limit, offset, id_checklist])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getCountDataItems = ({ id_checklist }) => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_checklist_item) as count_data from public.checklist_items WHERE id_checklist_item=$1;`, [id_checklist])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name, id_user }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.checklists (name_checklist,id_user_checklist) values ($1,$2);', [name, id_user])
            .then(() => {
                resolve('checklist add.')
            }).catch((e) => {
                reject('checklist data failed to add.')
            })
    })
}

model.addDataItems = ({ itemName, id_checklist }) => {
    console.log(`insert into public.checklist_items (item_name,id_checklist_item) values ('${itemName}','${id_checklist}');`)
    return new Promise((resolve, reject) => {
        db.query('insert into public.checklist_items (item_name,id_checklist_item) values ($1,$2);', [itemName, id_checklist])
            .then(() => {
                resolve('Item add.')
            }).catch((e) => {
                reject('Item data failed to add.')
            })
    })
}

model.deleteData = ({ id_checklist, id_user }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.checklists where id_checklist=$1 AND id_user_checklist=$2', [id_checklist, id_user])
            .then(() => {
                resolve('checklist data successfully deleted.')
            }).catch(() => {
                reject('checklist data failed to delete.')
            })
    })
}



module.exports = model