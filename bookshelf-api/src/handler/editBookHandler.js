const books = require('../model/Book')

const editBookHandler = (req, h) => {
    const id = req.params.bookId;
    //Client memberikan id yang tidak ada
    const index = books.findIndex(book => book.id === id);
    if(index === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        });
        response.code(404);
        return response;
    }
    const { 
        name, 
        year, 
        author, 
        summary, 
        publisher,
        pageCount, 
        readPage, 
        reading 
    } = req.payload;
    //Client tidak melampirkan properti name pada request body
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    };
    //Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    };
    const editedBook = books[index];
    editedBook.name = name;
    editedBook.year = year;
    editedBook.author = author;
    editedBook.summary = summary;
    editedBook.publisher = publisher;
    editedBook.pageCount = pageCount;
    editedBook.readPage = readPage;
    editedBook.reading = reading;
    editedBook.updatedAt = new Date().toISOString();
    books[index] = editedBook;
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    });
    response.code(200);
    return response;

};
module.exports = editBookHandler;