export let orders =JSON.parse(localStorage.getItem("orders"))||[]; 

function saveOrderToLocal() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
export function clearOrderCart(){
  localStorage.removeItem("orders");
}
export function addOrder(order) {
  orders.unshift(order);
  saveOrderToLocal();
}
