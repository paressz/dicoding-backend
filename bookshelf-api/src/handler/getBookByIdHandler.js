const books = require('../model/Book');


const getBookByIdHandler = (req, h) => {
    const id = req.params.bookId;
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        const book = books[index];
        const response = h.response({
            status: 'Success',
            data: {
                book: book
            }
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'Fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
};

module.exports = getBookByIdHandler;