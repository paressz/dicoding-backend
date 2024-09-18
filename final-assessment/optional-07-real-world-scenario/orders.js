// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}


// TODO: buatlah variabel yang menampung data orders
let orders = [];

// TODO: selesaikan fungsi addOrder
function addOrder(customerName, items) {
  const totalPrice = items.reduce((sum, it) => sum += it.price, 0);
  const newOrder = {
    id: generateUniqueId(),
    customerName: customerName,
    items: items,
    totalPrice: totalPrice,
    status: 'Menunggu'
  };
  orders.push(newOrder)
}

// TODO: selesaikan fungsi updateOrderStatus
function updateOrderStatus(orderId, status) {
  const order = orders.find(it => it.id === orderId);
  order.status = status;
}

// TODO: selesaikan fungsi calculateTotalRevenue dari order yang berstatus Selesai
function calculateTotalRevenue() {
  const orderSelesai = orders.filter(it => it.status === 'Selesai');
  return orderSelesai.reduce((total, order) => {
    const totalOrder = order.items.reduce((sum, item) => sum += item.price, 0);
    return total + totalOrder
  }, 0);
}

// TODO: selesaikan fungsi deleteOrder
function deleteOrder(id) {
  const index = orders.findIndex(it => it.id === id);
  orders.splice(index, 1);
}

export { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };
