const addBookHandler = require('handler/addBookHandler.js');
const deleteBookHandler = require('handler/deleteBookHandler.js');
const editBookHandler = require('handler/editBookHandler.js');
const getAllBookHandler = require ('handler/getAllBookHandler.js');
const getBookByIdHandler = require('handler/getBookByIdHandler.js');

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
        method: 'POST',
        path: '/books/{id}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookHandler,
    },
];
module.exports = routes;