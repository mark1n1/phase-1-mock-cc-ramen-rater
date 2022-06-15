document.addEventListener('DOMContentLoaded', () => {
  const URL = 'http://localhost:3000/ramens';
  const ramenDiv = document.getElementById('ramen-menu');
  const imgDetail = document.querySelector('.detail-image');
  const nameDetail = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const rating = document.getElementById('rating-display');
  const comment = document.getElementById('comment-display');

  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event.target["new-comment"].value);
    const configObject = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target["new-comment"].value
      })
    };

    fetch(URL, configObject).then((response) => response.json())
      .then((ramen) => renderRamen(ramen));
  });

  fetch(URL).then((response) => response.json())
    .then((ramens) => ramens.map((ramen) => renderRamen(ramen)));

  function renderRamen(ramen) {
    const img = document.createElement('img');
      
    img.src = ramen.image;
    img.addEventListener('click', () => {
      imgDetail.src = ramen.image;
      nameDetail.innerText = ramen.name;
      restaurant.innerText = ramen.restaurant;
      rating.innerText = ramen.rating;
      comment.innerText = ramen.comment;
    });

    ramenDiv.append(img);
  }
});