import { cart } from "../../data/cart.js";
import { clearOrderCart } from "../../data/order-data.js";
import { loadProductsFetch } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { products } from "../../data/products.js";
import { getDeliveryOptionId } from "../../data/delevary-option.js";
import { deliveryDateFormat } from "../utils/delivery-date.js";
await loadProductsFetch();

let trackingHTML;
const url = new URL(window.location.href);
const productId = url.searchParams.get("productId");
const matchingProduct = products.find((product) => product.id === productId);
if (matchingProduct) {
  //finding the matching cart item
  const matchingCartItem = cart.find(
    (cartItem) => cartItem.productId === productId
  );

  // finding the delivery date
  const deliveryOptionId = matchingCartItem.deliveryOptionsId;
  const deliveryOption = getDeliveryOptionId(deliveryOptionId);
  const arrivingDate = deliveryDateFormat(deliveryOption.deliveryDate);

  const productName = matchingProduct.name;
  trackingHTML += `
<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${arrivingDate}
        </div>

        <div class="product-info">
          ${productName}
        </div>

        <div class="product-info">
          Quantity: ${matchingCartItem.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
`;
}

//updating the HTML
document.querySelector(".order-tracking").innerHTML = trackingHTML;

//reseting the order detail
document
  .querySelector(".track-order-js-header-link")
  .addEventListener("click", () => {
    clearOrderCart();
  });
document
  .querySelector(".track-order-js-cart-link")
  .addEventListener("click", () => {
    clearOrderCart();
  });
