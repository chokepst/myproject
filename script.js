"use strict";

// =====================================
// 1. ข้อมูลรถมอเตอร์ไซค์ตัวอย่าง
// =====================================

const motorcycles = [
  {
    id: 1,
    name: "Sport Racing 150",
    category: "สปอร์ต",
    price: 125000,
    badge: "ยอดนิยม",
    description: "รถสปอร์ตดีไซน์โฉบเฉี่ยว เหมาะสำหรับคนรักความเร็ว",
    engine: "150 cc",
    transmission: "เกียร์ธรรมดา",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    name: "Street Fighter 250",
    category: "สปอร์ต",
    price: 98000,
    badge: "แนะนำ",
    description: "ดีไซน์ดุดัน คล่องตัว เหมาะกับการเดินทางในเมือง",
    engine: "250 cc",
    transmission: "เกียร์ธรรมดา",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    name: "Urban Scooter 160",
    category: "ใช้งาน",
    price: 75000,
    badge: "ขับขี่ง่าย",
    description: "สกู๊ตเตอร์สำหรับการเดินทางในชีวิตประจำวัน",
    engine: "160 cc",
    transmission: "อัตโนมัติ",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    name: "City Ride 125",
    category: "ใช้งาน",
    price: 52000,
    badge: "คุ้มค่า",
    description: "รถขนาดกะทัดรัด ใช้งานสะดวก เหมาะกับการเดินทางทั่วไป",
    engine: "125 cc",
    transmission: "เกียร์ธรรมดา",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    name: "Classic Legend 350",
    category: "คลาสสิก",
    price: 110000,
    badge: "สไตล์คลาสสิก",
    description: "ดีไซน์เหนือกาลเวลา เหมาะกับผู้ชื่นชอบรถสไตล์วินเทจ",
    engine: "350 cc",
    transmission: "เกียร์ธรรมดา",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    name: "Retro Road 250",
    category: "คลาสสิก",
    price: 89000,
    badge: "ดีไซน์โดดเด่น",
    description: "รถสไตล์เรโทร ผสมผสานความคลาสสิกและความทันสมัย",
    engine: "250 cc",
    transmission: "เกียร์ธรรมดา",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80"
  }
];

// =====================================
// 2. ตัวแปรและองค์ประกอบของเว็บไซต์
// =====================================

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

const detailDialog = document.getElementById("detailDialog");
const detailContent = document.getElementById("detailContent");

const cartDialog = document.getElementById("cartDialog");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");
const closeDetailButton = document.getElementById("closeDetail");
const checkoutButton = document.getElementById("checkoutButton");

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const toast = document.getElementById("toast");

let selectedCategory = "ทั้งหมด";
let searchKeyword = "";
let cart = [];
let toastTimer;

// =====================================
// 3. จัดรูปแบบราคาเป็นเงินบาท
// =====================================

function formatPrice(price) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0
  }).format(price);
}

// =====================================
// 4. แสดงข้อความแจ้งเตือน
// =====================================

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// =====================================
// 5. แสดงรายการรถ
// =====================================

function renderProducts() {
  const filteredBikes = motorcycles.filter((bike) => {
    const matchesCategory =
      selectedCategory === "ทั้งหมด" ||
      bike.category === selectedCategory;

    const matchesSearch =
      bike.name.toLowerCase().includes(searchKeyword) ||
      bike.category.toLowerCase().includes(searchKeyword);

    return matchesCategory && matchesSearch;
  });

  resultCount.textContent =
    `พบรถ ${filteredBikes.length} รุ่น`;

  emptyMessage.hidden = filteredBikes.length !== 0;

  productGrid.innerHTML = filteredBikes.map((bike) => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${bike.image}"
          alt="${bike.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x400/222225/ffffff?text=Motorcycle';"
        >
        <span class="product-badge">${bike.badge}</span>
      </div>

      <div class="product-info">
        <span class="product-category">${bike.category}</span>
        <h3>${bike.name}</h3>
        <p class="product-description">${bike.description}</p>

        <div class="product-bottom">
          <span class="product-price">${formatPrice(bike.price)}</span>

          <div class="product-actions">
            <button
              class="detail-button"
              data-action="detail"
              data-id="${bike.id}"
              type="button"
            >รายละเอียด</button>

            <button
              class="add-button"
              data-action="add"
              data-id="${bike.id}"
              type="button"
            >+ เพิ่มลงตะกร้า</button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

// =====================================
// 6. ค้นหารถ
// =====================================

searchInput.addEventListener("input", () => {
  searchKeyword = searchInput.value.trim().toLowerCase();
  renderProducts();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchKeyword = "";
  renderProducts();
  searchInput.focus();
});

// =====================================
// 7. กรองประเภทรถ
// =====================================

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    document.querySelectorAll(".category-card").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    renderProducts();

    document.getElementById("bikes").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// =====================================
// 8. ดูรายละเอียดรถ
// =====================================

function showDetails(id) {
  const bike = motorcycles.find((item) => item.id === id);

  if (!bike) return;

  detailContent.innerHTML = `
    <img
      class="modal-product-image"
      src="${bike.image}"
      alt="${bike.name}"
      onerror="this.onerror=null;this.src='https://placehold.co/600x400/222225/ffffff?text=Motorcycle';"
    >

    <p class="eyebrow">${bike.category}</p>
    <h2>${bike.name}</h2>
    <p class="modal-product-description">${bike.description}</p>

    <p>ขนาดเครื่องยนต์: <strong>${bike.engine}</strong></p>
    <p>ระบบเกียร์: <strong>${bike.transmission}</strong></p>

    <p class="modal-product-price">${formatPrice(bike.price)}</p>

    <button
      class="primary-button"
      id="detailAddButton"
      type="button"
    >+ เพิ่มลงตะกร้า</button>

    <p class="small-note">
      ราคาและรายละเอียดเป็นข้อมูลสมมติสำหรับเว็บไซต์ตัวอย่าง
    </p>
  `;

  detailDialog.showModal();

  document.getElementById("detailAddButton")
    .addEventListener("click", () => {
      addToCart(id);
      detailDialog.close();
    });
}

closeDetailButton.addEventListener("click", () => {
  detailDialog.close();
});

// =====================================
// 9. เพิ่มสินค้าในตะกร้า
// =====================================

function addToCart(id) {
  const bike = motorcycles.find((item) => item.id === id);

  if (!bike) return;

  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: bike.id,
      name: bike.name,
      price: bike.price,
      quantity: 1
    });
  }

  renderCart();
  showToast(`เพิ่ม ${bike.name} ลงตะกร้าแล้ว`);
}

// =====================================
// 10. ปุ่มรายละเอียดและเพิ่มสินค้า
// =====================================

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "detail") {
    showDetails(id);
  }

  if (action === "add") {
    addToCart(id);
  }
});

// =====================================
// 11. แสดงและคำนวณตะกร้าสินค้า
// =====================================

function renderCart() {
  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        ยังไม่มีสินค้าในตะกร้า 🛒<br>
        เลือกรถที่คุณสนใจเพื่อเริ่มต้น
      </p>
    `;

    checkoutButton.disabled = true;
    checkoutButton.style.opacity = "0.5";
    return;
  }

  checkoutButton.disabled = false;
  checkoutButton.style.opacity = "1";

  cartItems.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${formatPrice(item.price)} / คัน</span>

        <div class="quantity-controls">
          <button
            type="button"
            data-cart-action="decrease"
            data-id="${item.id}"
            aria-label="ลดจำนวน"
          >−</button>

          <span>${item.quantity}</span>

          <button
            type="button"
            data-cart-action="increase"
            data-id="${item.id}"
            aria-label="เพิ่มจำนวน"
          >+</button>
        </div>
      </div>

      <div>
        <strong>${formatPrice(item.price * item.quantity)}</strong>
        <br>
        <button
          class="remove-button"
          type="button"
          data-cart-action="remove"
          data-id="${item.id}"
        >นำออก</button>
      </div>
    </div>
  `).join("");
}

// =====================================
// 12. เพิ่ม ลด หรือลบสินค้าในตะกร้า
// =====================================

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-cart-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.cartAction;

  const item = cart.find((product) => product.id === id);

  if (!item) return;

  if (action === "increase") {
    item.quantity += 1;
  }

  if (action === "decrease") {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart = cart.filter((product) => product.id !== id);
    }
  }

  if (action === "remove") {
    cart = cart.filter((product) => product.id !== id);
  }

  renderCart();
});

// =====================================
// 13. เปิดและปิดตะกร้า
// =====================================

openCartButton.addEventListener("click", () => {
  renderCart();
  cartDialog.showModal();
});

closeCartButton.addEventListener("click", () => {
  cartDialog.close();
});

// =====================================
// 14. ปุ่มสอบถามรายการรถ
// =====================================

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) return;

  const lines = cart.map((item) => {
    return `${item.name} จำนวน ${item.quantity} คัน`;
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const subject = encodeURIComponent("สอบถามรถมอเตอร์ไซค์ MOTOZONE");

  const body = encodeURIComponent(
    "สวัสดีครับ/ค่ะ สนใจรถมอเตอร์ไซค์ดังนี้\n\n" +
    lines.join("\n") +
    "\n\nยอดรวมโดยประมาณ: " + formatPrice(total) +
    "\n\nรบกวนขอรายละเอียดเพิ่มเติม"
  );

  // เปลี่ยนเป็นอีเมลจริงของร้านก่อนนำไปใช้งาน
  window.location.href =
    `mailto:hello@example.com?subject=${subject}&body=${body}`;
});

// =====================================
// 15. เมนูสำหรับโทรศัพท์มือถือ
// =====================================

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "ปิดเมนู" : "เปิดเมนู"
  );

  menuButton.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "เปิดเมนู");
    menuButton.textContent = "☰";
  });
});

// =====================================
// 16. เริ่มต้นเว็บไซต์
// =====================================

renderProducts();
renderCart();
