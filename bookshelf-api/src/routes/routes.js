const addBookHandler = require('../handler/addBookHandler');
const deleteBookHandler = require('../handler/deleteBookHandler');
const editBookHandler = require('../handler/editBookHandler');
const getAllBookHandler = require ('../handler/getAllBookHandler');
const getBookByIdHandler = require('../handler/getBookByIdHandler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookHandler,
    },
];
module.exports = routes;