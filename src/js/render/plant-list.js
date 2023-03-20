import ExternalServices from "../fetch/ExternalServices.js";
import ProductList from "../fetch/plant_list.js";
import { loadHeaderFooter, getParam } from "../fetch/utility.js";

loadHeaderFooter();

const category = getParam("category");
// first create an instance of our ExternalServices class.
const dataSource = new ExternalServices();
// then get the element we want the product list to render in
const listElement = ".product-list";
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList(category, listElement, dataSource);
