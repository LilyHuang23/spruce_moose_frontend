import { getParam, loadHeaderFooter } from "../fetch/utility.js";
import ExternalServices from "../fetch/ExternalServices.js";
import ProductDetails from "../fetch/product_details.js";

loadHeaderFooter();

const dataSource = new ExternalServices();
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();
