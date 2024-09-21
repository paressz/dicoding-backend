const NanoId = require('nanoid');
const books = require('model/books.js')

const addBookHandler = (req, h) => {
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
    let id = NanoId.nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage ? true : false;
    const book = {
        id, name, year, author, summary, publisher, pageCount, readPage,
        finished, reading, insertedAt, updatedAt 
    };
    //Client tidak melampirkan properti namepada request body
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    };
    //Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    };
    //Secara kebetulan terjadi duplikasi ID
    const bookExist = books.some((book) => book.id === id);
    if (bookExist) { id = NanoId.nanoid(16) };
    books.push(book);
    const insertSuccess = books.some((book) => book.id === id);
    if (insertSuccess) {
        const response = h.response({
            status: 'Success',
            message: 'Buku berhasil ditambahkan',
            data: id
        });
        return response;
    };
    const response = h.response({
        status: 'fail',
        message: 'Mengeksekusi kode yang seharusnya tidak bisa dieksekusi',
    });
    response.code(400);
    return response;
};

module.exports = { addBookHandler }