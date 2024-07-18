async function placeAPI() {
  try {
    let response = await fetch(
      "https://maps.googleapis.com/maps/api/kanpur/details/output?=json/parameters"
    );
    const finalR = response.json();
    console.log(finalR);
  } catch (err) {
    console.log("Unable to fetch");
  }
}

placeAPI();
