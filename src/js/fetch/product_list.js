import { renderListWithTemplate } from "./utility.js";

function productCardTemplate(product) {
    return `<li class="product-card">
  <a href="/views/product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class ProductList {
    constructor(category, listEl, dataSource) {
        this.category = category;
        this.listElement = document.querySelector(listEl);
        this.dataSource = dataSource;
        this.init();
    }
    async init() {
        const products = await this.dataSource.getData(this.category);
        // console.log(products);
        let filteredProducts = this.filterList(products);
        this.renderList(filteredProducts);
    }
    renderList(products) {
        document.querySelector(".product-category").innerHTML = this.category;
        document.querySelector("#sort_select").addEventListener("change", (e) => {
            let sortedProducts = [];
            if (e.target.value == "price") {
                sortedProducts = this.sortListByPrice(products);
            }
            else if (e.target.value == "brand") {
                sortedProducts = this.sortListByBrand(products);
            }
            renderListWithTemplate(productCardTemplate, this.listElement, sortedProducts);
        });
        renderListWithTemplate(productCardTemplate, this.listElement, products);
    }
    filterList(products) {
        return products.filter((product) => product.Image != "");
    }
    sortListByPrice(products) {
        return products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    sortListByBrand(products) {
        return products.sort((a, b) => a.Brand.Name.localeCompare(b.Brand.Name));
    }
}