const books = require('../model/Book')

const deleteBookHandler = (req, h) => {
    const id = req.params.bookId;
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'Success',
            message: 'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'Fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;

};

module.exports = deleteBookHandler;