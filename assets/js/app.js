const apiLink = "https://dummyjson.com";
(async function () {
    const allProducts = await getProductList();
    addHTML(allProducts.products);
    searchEngine();
})();
async function getProductList() {
    return await (await fetch(`${apiLink}/products`)).json();
}
async function addHTML(products) {
    document.querySelector(".product-list  .row").innerHTML = "";
    if (products.length == 0) {
        const searchInp = document.querySelector(".search-area input")
        const searchVal = searchInp.value;
        document.querySelector(".product-list  .row").innerHTML = searchVal + " depoda yoxdur";
    }
    for (let pro of products) {
        const productItemCol = document.querySelector(".product-list  .product-item").parentNode.cloneNode(true);
        const productItem = productItemCol.querySelector(".product-item");
        productItem.classList.remove("d-none");
        productItem.querySelector(".noob-img").setAttribute("src", pro.thumbnail);
        productItem.querySelector(".title").innerText = pro.title;
        productItem.querySelector(".price").innerText = pro.price + " AZN";
        productItem.querySelector(".description").innerText = pro.description;
        document.querySelector(".product-list .row").appendChild(productItemCol)
    }
}
function searchEngine() {
    const searchInp = document.querySelector(".parent-box .head-center-search input")
    const searchBtn = document.querySelector(".parent-box .head-center-search button")
    searchBtn.addEventListener("click", async function () {
        const searchVal = searchInp.value;
        const api_url = apiLink + "/products/search?q=" + searchVal;
        const data = await (await fetch(api_url)).json()
        addHTML(data.products);
    })
}
