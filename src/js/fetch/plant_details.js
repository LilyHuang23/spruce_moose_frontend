import { Cart } from "./Cart";

function plantDetailsTemplate(plant) {
    return `<section class="plant-detail"> <h3>${plant.scientificName}</h3>
    <h2 class="divider">${plant.commonName}</h2>
    <img
      class="divider"
      src="${plant.imgUrl}"
      alt="${plant.scientificName}"
    />
    <p class="plant-card__price">$${plant.price}</p>
    <p class="plant__stock">${plant.stockQty}</p>
    
    </p>
    <div class="plant-detail__add">
      <button type="button" id="addToCart")">Add to Cart</button>
      <h4 class="cartAddSuccess" style="display: none;">Added to Cart!</h4>
    </div></section>`;
}

export default class PlantDetails {
    constructor(plantId, dataSource) {
        this.plantId = plantId;
        this.plant = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use our data source to get the details for the current plant. findPlantById will return a promise! use await or .then() to process it
        this.plant = await this.dataSource.findPlantById(this.plantId);
        // once we have the plant details we can render out the HTML
        this.renderPlantDetails("main");
    }
   
    renderPlantDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            plantDetailsTemplate(this.plant)
        );
        const button = document.getElementById("addToCart");
        button.addEventListener("click", () => {Cart.addToCart(this.plant)});
    }
}
