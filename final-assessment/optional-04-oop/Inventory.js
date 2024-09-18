/**
 * TODO
 * Selesaikan kode pembuatan class Inventory dengan ketentuan:
 * - Memiliki properti `items` untuk menampung daftar item dalam bentuk array.
 * - Memiliki method `addItem` untuk menambahkan item ke properti `items`.
 * - Memiliki method `removeItem` untuk menghapus item berdasarkan `id`.
 * - Memiliki method `listItems` untuk mengembalikan string yang merupakan informasi detail barang (dipanggil dari fungs `item.displayDetails()`).
 */
class Inventory {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    removeItem(id) {
        const item = this.items.findIndex(it => it.id === id);
        this.items.splice(item,1);
    }
    listItems() {
        let str = '';
        this.items.forEach(item => {
            str += `${item.displayDetails()}\n`;
        });
        return str;
    }
}


// Jangan hapus kode di bawah ini!
export default Inventory;
