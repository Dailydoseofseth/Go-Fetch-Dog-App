//https://codepen.io/team/anniecannons/live/pvEzqGg

// declared VARs
let apiKey =
  "live_uZpiEeHiwYal4PkIcJhGqSa5WvwPJvLsnrfO7s7lnSH5V0wZdiHN2e0eYFGapyM1";

const form = document.querySelector("#dogForm");
const results = document.querySelector("#results");

// EL
form.addEventListener("submit", onFormSubmit);

// submit FUNC
function onFormSubmit(event) {
  console.log("FORM HAS BEEN SUBMITTED!");
  event.preventDefault();
  const data = new FormData(event.target);
  const dataObject = Object.fromEntries(data.entries());
  // console.log(dataObject);

  form.reset();

  getDogs(dataObject);
}

// FETCH function
const getDogs = (formInput) => {
  console.log("Fetching DOGS/data...");

  fetch("https://api.thedogapi.com/v1/breeds", {
    headers: {
      "x-api-key": apiKey,
    },
  })
    .then((res) => res.json())
    .then((apiData) => {
      console.log("API Data received:", apiData.length, "dogs");

      let filteredDogs = apiData.filter((dog) => {
        // --- Breed Filter ---
        if (formInput.breed) {
          if (!dog.name.toLowerCase().includes(formInput.breed.toLowerCase())) {
            return false;
          }
        }

        // --- Temperament Filter ---
        if (formInput.temperament) {
          if (!dog.temperament) {
            return false;
          }

          if (
            !dog.temperament
              .toLowerCase()
              .includes(formInput.temperament.toLowerCase())
          ) {
            return false;
          }
        }

        return true;
      });

      console.log("Filtered Dogs:", filteredDogs.length);
      displayDogs(filteredDogs);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

///////////////display DOGS//////////////
const displayDogs = (dogs) => {
  let html = "";

  for (let i = 0; i < dogs.length; i++) {
    let dog = dogs[i];

    // If dog has an image use it, otherwise a placeholder
    let imgURL =
      dog.image && dog.image.url
        ? dog.image.url
        : "https://t3.ftcdn.net/jpg/18/79/42/12/360_F_1879421294_8AvORKNGOTGjpqUtZlnpKVxtdLrfQQoZ.jpg";

    html += `
      <div class="dog-card">
        <h3>${dog.name}</h3>
        <img src="${imgURL}" alt="${dog.name}">
        <p><strong>Life Span:</strong> ${dog.life_span}</p>
        <p><strong>Temperament:</strong> ${dog.temperament || "N/A"}</p>
      </div>
    `;
  }

  results.innerHTML = html;
  console.log("Display complete:", dogs.length, "card/s shown");
};
