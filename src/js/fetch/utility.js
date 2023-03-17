// utility functions to fetch data for the page
export function renderWithTemplate(
  template,
  parentElement,
  data,
  position = "afterbegin",
  callback
) {
  parentElement.insertAdjacentHTML(position, template);
  if (callback) {
      callback(data);
  }
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  let cartContent = getLocalStorage("cart");
  console.log(cartContent);
  localStorage.setItem(key, JSON.stringify(data));
  
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  return await res.text();
}

export async function loadHeaderFooter() {
  //if local storage is empty it will cause an error with header and footer unless intialized.
  if (getLocalStorage("cart") == null) {
      setLocalStorage("cart", []);
  }
  let headerTemplate = await loadTemplate("../../partials/header.html");
  headerTemplate = headerTemplate.replace(`cartCount">0`, `cartCount">${getLocalStorage("cart").length}`);
  const headerElement = document.getElementById("main-header");
  const footerTemplate = await loadTemplate("../../partials/footer.html");
  const footerElement = document.getElementById("main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
