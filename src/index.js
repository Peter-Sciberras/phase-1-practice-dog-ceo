document.addEventListener('DOMContentLoaded', function () {

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const breedDropdown = document.querySelector('#breed-dropdown')
    const breedList = document.querySelector('#dog-breeds')
    const dogImageContainer = document.querySelector('#dog-image-container')
  
    function fetchImages() {
      fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => {
          json.message.forEach(imageUrl => addImage(imageUrl))
        })
    }
  
    function addImage(imageUrl) {
      const img = document.createElement('img')
      img.src = imageUrl
      dogImageContainer.appendChild(img)
    }
  
    function fetchBreeds() {
      fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => {
          Object.keys(json.message).forEach(breedName => addBreed(breedName))
        })
    }
  
    function addBreed(breedName) {
      const li = document.createElement('li')
      li.innerText = breedName
      breedList.appendChild(li)
      li.addEventListener('click', changeColor)
    }
  
    function changeColor(event) {
      event.target.style.color = 'red'
    }
  
    function filterBreedsByLetter() {
      const selectedLetter = breedDropdown.value
      const breedListItems = breedList.getElementsByTagName('li')
      for (let i = 0; i < breedListItems.length; i++) {
        const breedName = breedListItems[i].innerText
        if (breedName.startsWith(selectedLetter)) {
          breedListItems[i].style.display = 'list-item'
        } else {
          breedListItems[i].style.display = 'none'
        }
      }
    }
  
    fetchImages()
    fetchBreeds()
  
    breedDropdown.addEventListener('change', filterBreedsByLetter)
  
  })
  