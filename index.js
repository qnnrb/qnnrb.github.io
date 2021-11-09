/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Quinn Robertson
 * Email: robertsq@oregonstate.edu 
 */

    var sellSomethingButton = document.getElementById('sell-something-button')
 
function sellSomethingClick() { 
    var sellBackground = document.getElementById('modal-backdrop')
    sellBackground.style.display = "inline"
    var sellSomethingModal = document.getElementById('sell-something-modal')
    sellSomethingModal.style.display = "inline"
    document.getElementById('post-text-input').value = ''
    document.getElementById('post-photo-input').value = ''
    document.getElementById('post-price-input').value = ''
    document.getElementById('post-city-input').value = ''
}

var sellAcceptButton = document.getElementById('modal-accept')

function sellAccept() {
    var postTitle = document.getElementById('post-text-input').value
    var photoUrl = document.getElementById('post-photo-input').value 
    var postPrice = document.getElementById('post-price-input').value
    var postCity = document.getElementById('post-city-input').value
    var postCondition = document.querySelector('input[name = "post-condition"]:checked').value

    if (postTitle == '' || photoUrl == '' || postPrice == '' || postCity == '') { 
        window.alert("Please fill out all fields.")

    } 

    else {
    insertNewCity(postCity)
    insertNewPost(photoUrl, postPrice, postCity, postCondition, postTitle)
    }
}

sellAcceptButton.addEventListener('click', sellAccept)

function sellCancelClick() { 
    var modalBackground = document.getElementById('modal-backdrop')
    modalBackground.style.display = "none"
    var sellModal = document.getElementById('sell-something-modal')
    sellModal.style.display = "none"
}

var closeModal = document.getElementById('modal-close')
closeModal.addEventListener('click', sellCancelClick)
var cancelSellButton = document.getElementById('modal-cancel')
 
cancelSellButton.addEventListener('click', sellCancelClick)
sellSomethingButton.addEventListener('click', sellSomethingClick)

function handleWords (event) { 
    var text = event.currentTarget.value
    console.log("inside handleWords: ", text) 
    allWords = text.replace(/[!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '')
    .toLowerCase().split(' ');
}

/*
<div class="post" data-price="20000000" data-city="Eugene" data-condition="good">
          <div class="post-contents">
            <div class="post-image-container">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/102707-Oregon-AutzenStadium-ext.jpg/1200px-102707-Oregon-AutzenStadium-ext.jpg" alt="Football stadium (we kind of want to build a new one)">
            </div>
            <div class="post-info-container">
              <a href="#" class="post-title">Football stadium (we kind of want to build a new one)</a> <span class="post-price">$20000000</span> <span class="post-city">(Eugene)</span>
            </div>
          </div>
        </div>

    */
function insertNewPost(photoUrl, postPrice, postCity, postCondition, postTitle)  { 
   
    var posts = document.getElementById('posts')

    var postDiv = document.createElement('class')
    postDiv.classList.add('post') 
    posts.appendChild(postDiv)
    postDiv.dataset.price = postPrice
    postDiv.dataset.city = postCity
    postDiv.dataset.condition = postCondition 
    
    var postContentsDiv = document.createElement('div')
    postContentsDiv.classList.add('post-contents')
    postDiv.appendChild(postContentsDiv)

    var postImageContainerDiv = document.createElement('div')
    postImageContainerDiv.classList.add('post-image-container')
    postContentsDiv.appendChild(postImageContainerDiv)

    var postImg = document.createElement('img')
    postImg.src = photoUrl
    postImg.alt = postTitle
    postImageContainerDiv.appendChild(postImg)

    var postInfoContainerDiv = document.createElement('div')
    postInfoContainerDiv.classList.add('post-info-container')
    postContentsDiv.appendChild(postInfoContainerDiv)

    var postInfoLinks = document.createElement('a')
    postInfoLinks.href = "#"
    postInfoLinks.classList.add('post-title')
    postInfoLinks.textContent = postTitle 
    postInfoContainerDiv.appendChild(postInfoLinks)

    var postPriceSpan = document.createElement('span')
    postPriceSpan.classList.add('post-price')
    postPriceSpan.textContent = "$" + postPrice 
    postInfoContainerDiv.appendChild(postPriceSpan)

    var postCitySpan = document.createElement('span')
    postCitySpan.classList.add('post-city')
    postCitySpan.textContent = "(" + postCity + ")"
    postInfoContainerDiv.appendChild(postCitySpan)

    console.log("Post: ", postDiv)

}

/*  <div class="filter-input-container">
          <label for="filter-city" class="filter-input-label">City</label>
          <div class="filter-input-element">
            <select id="filter-city" class="filter-input" name="filter-city">
              <option selected value="">Any</option>
              <option>Corvallis</option>
              <option>Albany</option>
              <option>Eugene</option>
              <option>Portland</option>
              <option>Salem</option>
              <option>Bend</option>
            </select>
          </div>
        </div> */

function insertNewCity (cityName) { 
    
    
    var postCities = document.getElementsByClassName('post')
    
    for (var i = 0; i < postCities.length; i++) {
        console.log("postCities[", i,"].dataset.city: ", postCities[i].dataset.city," , cityName: ", cityName)
        if (postCities[i].dataset.city == cityName) { 
            return
        } 
    }
        var select = document.getElementById('filter-city')

        var cityOption = document.createElement('option')
        cityOption.textContent = cityName
        select.appendChild(cityOption)

        console.log("select: ", select) 
    
}

var updateFilter = document.getElementById('filter-update-button')
updateFilter.addEventListener('click', filter)

function filter() {
    var filterText = document.getElementById('filter-text').value
    var filterCity = document.getElementById('filter-city').value
    var priceMin = document.getElementById('filter-min-price').value
    var priceMax = document.getElementById('filter-max-price').value
    var condition = document.querySelector('input[name = "filter-condition"]:checked')
    var posts = document.getElementsByClassName('post')
    var titles = document.getElementsByClassName('post-title')

    console.log("inside filterText")
    for (var i = 0; i < posts.length; i++) { 
        

        if(filterText == titles[i].textContent && filterText != '' && filterCity == '' && priceMin == '' && priceMax == '' && condition == null) // && filterCity == posts[i].dataset.city)
        { 
            posts[i].style.display = "inline-block"
        }  

        else if (filterCity == posts[i].dataset.city && filterCity != '' && filterText == '' && priceMin == '' && priceMax == '' && condition == null) {
            posts[i].style.display = "inline-block"
        }  

        else if (Number(priceMin) <= Number(posts[i].dataset.price) && priceMin != '' && filterText == '' && filterCity == '' && priceMax == '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if (Number(priceMax) >= Number(posts[i].dataset.price) && priceMax != '' && filterText == '' && filterCity == '' && priceMin == '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if (Number(priceMax) >= Number(posts[i].dataset.price) && priceMax != '' && filterText == titles[i].textContent && filterText != '' && filterCity == '' && priceMin == '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if (Number(priceMax) >= Number(posts[i].dataset.price) && priceMax != '' && filterText == '' && filterCity == posts[i].dataset.city && filterCity != '' && priceMin == '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if (Number(priceMin) <= Number(posts[i].dataset.price) && priceMin != '' && filterText == titles[i].textContent && filterText != '' && filterCity == '' && priceMax == '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if (Number(priceMin) <= Number(posts[i].dataset.price) && priceMin != '' && filterText == '' && filterCity == posts[i].dataset.city && filterCity != '' && priceMax == '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if ((Number(priceMin) <= Number(posts[i].dataset.price)) && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin != '' && priceMax != '' && filterCity == '' && filterText == '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if ((Number(priceMin) <= Number(posts[i].dataset.price)) && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin != '' && priceMax != '' && filterCity == posts[i].dataset.city && filterCity != '' && filterText == '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if ((Number(priceMin) <= Number(posts[i].dataset.price)) && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin != '' && priceMax != '' && filterText == titles[i].textContent && filterCity == '' && filterText != '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if ((Number(priceMin) <= Number(posts[i].dataset.price)) && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin != '' && priceMax != '' && filterText == titles[i].textContent && filterCity == posts[i].dataset.city && filterCity != '' && filterText != '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if (filterText == titles[i].textContent && filterText != '' && filterCity == posts[i].dataset.city && filterCity != '' && priceMin == '' && priceMax == '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && filterText == '' && filterCity == '' && priceMin == '' && priceMax == '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && filterText == titles[i].textContent && filterText != '' && filterCity == '' && priceMin == '' && priceMax == '') { 
            posts[i].style.display = "inline-block"
        }
        
        else if (condition != null && condition.value == posts[i].dataset.condition && filterCity == posts[i].dataset.city && filterCity != '' && filterText == '' && priceMin == '' && priceMax == '') { 
            posts[i].style.display = "inline-block"
        } 

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMin) <= Number(posts[i].dataset.price)) && priceMin != '' && priceMax == '' && filterCity == '' && filterText == '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin == '' && priceMax != '' && filterCity == '' && filterText == '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin == '' && priceMax != '' && filterCity == posts[i].dataset.city && filterCity != '' && filterText == '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin == '' && priceMax != '' && filterCity == '' && filterText == titles[i].textContent && filterText != '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMin) <= Number(posts[i].dataset.price)) && priceMin != '' && priceMax == '' && filterCity == posts[i].dataset.city && filterCity != '' && filterText == '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMin) <= Number(posts[i].dataset.price)) && priceMin != '' && priceMax == '' && filterCity == '' && filterText == titles[i].textContent && filterText != '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin == '' && priceMax != '' && filterCity == posts[i].dataset.city && filterCity != '' && filterText == titles[i].textContent && filterText != '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMin) <= Number(posts[i].dataset.price)) && priceMin != '' && priceMax == '' && filterCity == posts[i].dataset.city && filterCity != '' && filterText == titles[i].textContent && filterText != '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMax) >= Number(posts[i].dataset.price)) && (Number(priceMin) <= Number(posts[i].dataset.price)) && priceMin != '' && priceMax != '' && filterCity == '' && filterText == '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && Number(priceMax) >= Number(posts[i].dataset.price) && priceMax != '' && filterText == titles[i].textContent && filterText != '' && filterCity == '' && priceMin == '') { 
            posts[i].style.display = "inline-block"
        }
        else if (condition != null && condition.value == posts[i].dataset.condition && Number(priceMax) >= Number(posts[i].dataset.price) && priceMax != '' && filterCity == posts[i].dataset.city && filterText == '' && filterCity != '' && priceMin == '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && Number(priceMin) <= Number(posts[i].dataset.price) && priceMax == '' && filterCity == posts[i].dataset.city && filterText == '' && filterCity != '' && priceMin != '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && Number(priceMin) <= Number(posts[i].dataset.price) && priceMax == '' && filterText == titles[i].textContent && filterText != '' && filterCity == '' && priceMin != '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMin) <= Number(posts[i].dataset.price)) && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin != '' && priceMax != '' && filterCity == posts[i].dataset.city && filterCity != '' && filterText == '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMin) <= Number(posts[i].dataset.price)) && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin != '' && priceMax != '' && filterText == titles[i].textContent && filterCity == '' && filterText != '') { 
            posts[i].style.display = "inline-block"
        }

        else if (condition != null && condition.value == posts[i].dataset.condition && (Number(priceMin) <= Number(posts[i].dataset.price)) && (Number(priceMax) >= Number(posts[i].dataset.price)) && priceMin != '' && priceMax != '' && filterText == titles[i].textContent && filterCity == posts[i].dataset.city && filterCity != '' && filterText != '') { 
            posts[i].style.display = "inline-block"
        }
        
        else if (filterText == '' && filterCity == '' && priceMin == '' && priceMax == '' && condition == null) { 
            posts[i].style.display = "inline-block"
        }   

        else { posts[i].style.display = "none"}
    }
}


