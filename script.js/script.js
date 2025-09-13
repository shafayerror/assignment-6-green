console.log("js connected");

// getting catagories name  from catagories API

const loadCatagoriesData = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCatagoriesInfo(data.categories));
};
loadCatagoriesData();

// ---------------------------------------------------------------------

// display catagories data in the screen from catagories API

const displayCatagoriesInfo = (catagories) => {
  // 1.get the container and empty container
  const catagoriesNameContainer = document.getElementById(
    "catagory-name-container"
  );
  catagoriesNameContainer.innerHTML = "";

  // 2.get every catagory name from api
  for (const catagory of catagories) {
    // 3.create Element for catagories
    const catagoryDiv = document.createElement("div");
    catagoryDiv.innerHTML = `
        
        <div class="container ">
                            <button onclick="loadPlantCatagory()" class="btn btn-soft btn-success text-black text-left btn-block px-0 ">${catagory.category_name}</button>
                        </div>
        `;
    // 4.append the child in the catagoreisNameContainer

    catagoriesNameContainer.append(catagoryDiv);
  }
};
// -------------------------------------------------------------------

// Getting all the plants data from allplant API

const allPlantsInfo = () => {
  const plantUrl = "https://openapi.programming-hero.com/api/plants";
  fetch(plantUrl)
    .then((res) => res.json())
    .then((json) => displayPlantData(json.plants));
};
allPlantsInfo();

// ------------------------------------------------------------------------------

// display allPlant data in the screen from allplant API

const displayPlantData = (plants) => {
  // 1.get the container and empty container
  const treeDetails = document.getElementById("tree-details");
  treeDetails.innerHTML = "";
  // 2.get every catagory name from api
  for (const plant of plants) {
    const plantCart = document.createElement("div");
    plantCart.innerHTML = `
        
        <div class="tress bg-white   p-4">
                            <div class="mb-3">
                                <img class="h-50 w-full" src="${plant.image}" alt="">
                            </div>
                            
                            
                            <div class="mb-3">
                                <h3  class="font-bold text-xl">${plant.name}</h3>
                                <p class="line-clamp-2">${plant.description}</p>

                                <div class="flex justify-between">
                                    <button onClick="loadPlantDetails(${plant.id})" class="bg-[#DCFCE7] text-[#15803D] rounded-full p-2 font-semibold">${plant.name}</button>
                                    <p class="font-semibold "> <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
                                </div>

                            </div>
                            
                            <div>
                                <button class="bg-[#15803D] rounded-full w-full font-bold text-center py-3 text-white">Add to the cart</button>
                            </div>
                        </div>
        
        `;

    treeDetails.append(plantCart);
  }
};
// --------------------------------------------------------------------------------

// getting all the plant details data from plant details API
const loadPlantDetailsInfo = (plantId) => {
  const IdUrl = `https://openapi.programming-hero.com/api/plant/${plantId}`;
  console.log(IdUrl);
  fetch(IdUrl)
    .then((res) => res.json())
    .then((res) => displayInfo(res.plants));
};

// -------------------------------------------------------

// showing pland details on modal plant details API
const displayInfo = (planted) => {
  console.log(planted);
  const modalBox = document.getElementById("details-box");
  modalBox.innerHTML = `<img src="${planted.image}" alt="">
        <h3 class="text-xl font-bold">name: ${planted.name}</h3>
        <p>${planted.description}</p>
        <p class="text-xl font-bold">catagory: ${planted.category}</p>
        <p class="text-xl font-bold"> price: ${planted.price}</p>`;
  document.getElementById("plant-modal").showModal();
};

// -------------------------------------------------------------------------

// getting data from all plant by catagories API

const loadPlantCatagory = () => {};
