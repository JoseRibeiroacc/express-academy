const notDeleted = {is_deleted: false}

const withNotDeleted = (where = {}) => ({
    ...where,
    is_deleted: false
})

const markDeleted = {is_deleted: true}

module.exports = {
    notDeleted,
    withNotDeleted,
    markDeleted
}