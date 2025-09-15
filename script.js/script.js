console.log('js connected');

// keeping track of total
let currentTotal = 0;

// getting catagories name from categories API
const loadCatagories = () => {
    const catagoriesUrl = "https://openapi.programming-hero.com/api/categories";
    fetch(catagoriesUrl)
        .then(res => res.json())
        .then(data => displayCatagories(data.categories));
};
loadCatagories();

// display categories
const displayCatagories = (catagories) => {
    const catagoriesNameContainer = document.getElementById("catagory-name-container");
    catagoriesNameContainer.innerHTML = '';

    for (const catagory of catagories) {
        const catagoryDiv = document.createElement('div');
        catagoryDiv.innerHTML = `
            <div class="container">
                <button id="btn-catagories-${catagory.id}" onclick="loadPlantByCatagory(${catagory.id})" class="btn btn-soft btn-success text-black text-left btn-block px-0 catagories-btn">${catagory.category_name}</button>
            </div>
        `;
        catagoriesNameContainer.append(catagoryDiv);
    }
};

// Getting all plants
const allPlants = () => {
    const plantUrl = "https://openapi.programming-hero.com/api/plants";
    fetch(plantUrl)
        .then(res => res.json())
        .then(json => displayPlant(json.plants));
};
allPlants();

// Display all plants
const displayPlant = (plants) => {
    const treeDetails = document.getElementById('tree-details');
    treeDetails.innerHTML = '';

    for (const plant of plants) {
        const plantCart = document.createElement('div');
        plantCart.innerHTML = `
            <div class="tress bg-white p-4">
                <div class="mb-3">
                    <img class="h-50 w-full" src="${plant.image}" alt="">
                </div>
                <div class="mb-3">
                    <h3 class="font-bold text-xl">${plant.name}</h3>
                    <p class="line-clamp-2">${plant.description}</p>
                    <div class="flex justify-between">
                        <button onClick="loadPlantDetails(${plant.id})" class="bg-[#DCFCE7] text-[#15803D] rounded-full p-2 font-semibold">${plant.name}</button>
                        <p class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
                    </div>
                </div>
                <div>
                    <button onClick="addToCart('${plant.name}', ${plant.price})" class="bg-[#15803D] rounded-full w-full font-bold text-center py-3 text-white">Add to the cart</button>
                </div>
            </div>
        `;
        treeDetails.append(plantCart);
    }
};

// load plant details
const loadPlantDetails = (plantId) => {
    const IdUrl = `https://openapi.programming-hero.com/api/plant/${plantId}`;
    fetch(IdUrl)
        .then(res => res.json())
        .then(res => displayDetails(res.plants));
};

// display plant details in modal
const displayDetails = (planted) => {
    const modalBox = document.getElementById('details-box');
    modalBox.innerHTML = `
        <img src="${planted.image}" alt="">
        <h3 class="text-xl font-bold">name: ${planted.name}</h3>
        <p>${planted.description}</p>
        <p class="text-xl font-bold">category: ${planted.category}</p>
        <p class="text-xl font-bold">price: ${planted.price}</p>
    `;
    document.getElementById('plant-modal').showModal();
};

// load plant by category
const loadPlantByCatagory = (catagoryId) => {
    const catagoryUrl = `https://openapi.programming-hero.com/api/category/${catagoryId}`;
    fetch(catagoryUrl)
        .then(res => res.json())
        .then(json => {
            removeActive();
            const clickBtn = document.getElementById(`btn-catagories-${catagoryId}`);
            clickBtn.classList.add('active');
            displayPlantByCatagory(json.plants);
        });
};

// display plant by category
const displayPlantByCatagory = (plantsCatagory) => {
    const plantDetailsByCatagory = document.getElementById('tree-details');
    plantDetailsByCatagory.innerHTML = '';

    for (const catagory of plantsCatagory) {
        const plantCatagoryCart = document.createElement('div');
        plantCatagoryCart.innerHTML = `
            <div class="tress bg-white p-4">
                <div class="mb-3">
                    <img class="h-50 w-full" src="${catagory.image}" alt="">
                </div>
                <div class="mb-3">
                    <h3 class="font-bold text-xl">${catagory.name}</h3>
                    <p class="line-clamp-2">${catagory.description}</p>
                    <div class="flex justify-between">
                        <button onClick="loadPlantDetails(${catagory.id})" class="bg-[#DCFCE7] text-[#15803D] rounded-full p-2 font-semibold">${catagory.name}</button>
                        <p class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${catagory.price}</p>
                    </div>
                </div>
                <div>
                    <button onClick="addToCart('${catagory.name}', ${catagory.price})" class="bg-[#15803D] rounded-full w-full font-bold text-center py-3 text-white">Add to the cart</button>
                </div>
            </div>
        `;
        plantDetailsByCatagory.append(plantCatagoryCart);
    }
};

// add to cart
const addToCart = (plantName, plantPrice) => {
    const CartContainer = document.getElementById('CartHistory');

    const paymentCart = document.createElement('div');
    paymentCart.classList.add('cart-item');
    paymentCart.innerHTML = `
        <div class="flex justify-between items-center bg-[#DCFCE7] rounded-lg p-2 mb-2">
            <div>
                <h4 class="text-xl font-semibold">${plantName}</h4>
                <p class="text-lg"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plantPrice} x 1</p>
            </div>
            <button onclick="removePayment(this, ${plantPrice})" class="text-red-600 hover:text-red-800"><i class="fa-solid fa-x"></i></button>
        </div>
    `;
    CartContainer.append(paymentCart);
    totalBill(plantPrice);
};

// remove from cart
const removePayment = (btn, price) => {
    btn.parentElement.remove();
    currentTotal -= price;
    updateTotal();
};

// total bill
const totalBill = (price) => {
    currentTotal += price;
    updateTotal();
};

// update total HTML
const updateTotal = () => {
    const priceContainer = document.getElementById('total-bill');
    priceContainer.innerHTML = `
        <div class="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${currentTotal}</span>
        </div>
    `;
};

// remove highlights color
const removeActive = () => {
    const catagoriesButtons = document.querySelectorAll('.catagories-btn');
    catagoriesButtons.forEach(btn => btn.classList.remove('active'));
};

// spinner
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden');
    } else {
        document.getElementById('spinner').classList.add('hidden');
    }
};
