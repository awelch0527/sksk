class Product {
  //   title = 'DEFAULT';
  //   imageUrl;
  //   description;
  //   price;
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
    this.render()
  }

  render() {
      
    }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value)
      }
    }
    document.getElementById(this.hookId).append(rootElement)
    return rootElement
  }
  
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>total: \$${this.totalAmount.toFixed(2)}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prvVal, CrtItm) => prvVal + CrtItem.price,
      0
    );
    return sum
  }

  constructor(renderHookId) {
    super(renderHookId)
  }


  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
    
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId)
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
    alert(`you bought ${this.product.title}`);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}" >
        <div class="product-item__content">
          <h2> ${this.product.title}</h2>
          <h3>¥${this.product.price}</h3>
          <p>${this.product.description.description}</p>
          <button>Add to Cart !</button>
        </div>
      </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  
  }
}

class ProductList extends Component {
  products = [
    new Product(
      "A Pillow",
      "https://www.downetc.com/media/catalog/product/cache/4c0ee9c259e8813fe6f171ce41105c1f/g/o/goose_down_pillow_rhapsody.jpg",
      "World #1 softest pillow",
      19.99
    ),

    new Product(
      "Fresh Cucumbers",
      "https://www.healthline.com/hlcmsresource/images/AN_images/AN88-Cucumbers-732x549-thumb.jpg",
      "cucumbers?",
      519.99
    ),

    new Product(
      "Fresh Cucumbers",
      "https://www.healthline.com/hlcmsresource/images/AN_images/AN88-Cucumbers-732x549-thumb.jpg",
      "cucumbers?",
      519.99
    ),

    new Product(
      "Fresh Cucumbers",
      "https://www.healthline.com/hlcmsresource/images/AN_images/AN88-Cucumbers-732x549-thumb.jpg",
      "cucumbers?",
      519.99
    ),

    new Product(
      "Fresh Cucumbers",
      "https://www.healthline.com/hlcmsresource/images/AN_images/AN88-Cucumbers-732x549-thumb.jpg",
      "cucumbers?",
      519.99
    ),
    new Product(
      "Fresh Cucumbers",
      "https://www.healthline.com/hlcmsresource/images/AN_images/AN88-Cucumbers-732x549-thumb.jpg",
      "cucumbers?",
      519.99
    ),

    new Product(
      "Fresh Cucumbers",
      "https://www.healthline.com/hlcmsresource/images/AN_images/AN88-Cucumbers-732x549-thumb.jpg",
      "cucumbers?",
      519.99
    ),
  ];

  constructor(renderHookId) {
    super(renderHookId)
  }

  render() {
    this.createRootElement('ul', 'prooduct-list', [
      new ElementAttribute('id', 'prod-list')
    ]);
    for (const prod of this.products) {
      const productItem = new ProductItem(prod, 'prod-list')
    }
  }
}

class Shop {
  constructor() {
    this.render()
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
