const books = require('../model/Book');

const getAllBookHandler = (req, h) => {
    const {name, reading, finished} = req.query;
    var booksFilter = books;
    if(name) {
        const nameLowerCase = name.toLowerCase();
        booksFilter = booksFilter.filter((book) => book.name.toLowerCase().includes(nameLowerCase));
    }
    if (reading == 0) {
        booksFilter = booksFilter.filter((book) => !book.reading);
    } else if (reading == 1) {
        booksFilter = booksFilter.filter((book) => book.reading);
    }
    if (finished == 0) {
        booksFilter = booksFilter.filter((book) => !book.finished);
    } else if (finished == 1) {
        booksFilter = booksFilter.filter((book) => book.finished);
    }
    booksFilter = booksFilter.map(({id, name, publisher}) => ({id, name, publisher}));
    const response = h.response({
        status: 'success',
        data: {
            books: booksFilter
        }
    });
    response.code(200);
    return response;
};

module.exports = getAllBookHandler;