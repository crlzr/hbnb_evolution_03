// I'm doing things the old-fashioned way.
// Let's start by creating a JS 'object' that will hold all the 'attributes' and 'methods' we need.
// Note that this is not Object Oriented Programming. It's just the way people used to code JS 10+ years ago.
// The JS 'object' is nothing more than an associative array (the proper name for a dictionary in Python)

hbnb = {
    amenitiesInit: function() {
        // set up the onclick events for the Amenities radios + button
        let amenRadios = document.querySelectorAll("#menu >.contents >.amenities >.choice input[type='radio']");
        for (let elem of amenRadios) {
            elem.addEventListener("change", function(e) {
            let specificSelectedText = document.querySelector("#menu >.contents >.amenities >.title .selected")

                let radioValue = e.target.value
                if (radioValue == 'specific') {
                    hbnb.showSpecificAmenitiesSubmenu();
                    hbnb.updateSpecificAmenitiesCount();
                    specificSelectedText.setAttribute('state', 'show');
                } else {
                    // all amenities - empty string
                    hbnb.hideSpecificAmenitiesSubmenu()
                    specificSelectedText.setAttribute('state', 'hide')
                }
            });
        }

        let amenSpecificSelectBtn = document.getElementById("btn-specific-amenities-select");
        amenSpecificSelectBtn.addEventListener('click', function() {
            hbnb.showSpecificAmenitiesSubmenu()

            // NOTE: simply clicking the Please Select button won't cause the radio to change
            // The button eats up the click event so the label tag + radio won't receive it.
            // We'll select the radio if it isn't already selected
            if (!amenRadios[1].checked) {
                amenRadios[1].click();
            }
        });

        // For the checkboxes in the submenu, let's add events that will update the counter
        let selectedAmenitiesCheckboxes = document.querySelectorAll("#amenities-submenu >.items input[type='checkbox']");
        for (let c of selectedAmenitiesCheckboxes) {
            c.addEventListener('click', function() {
                hbnb.updateSpecificAmenitiesCount();
            })
        }

        // Last but not least! Now let's add an event to the OK button in the submenu
        // Note that we are just hiding the menu and doing anything anything special
        let amenSpecificConfirmBtn = document.getElementById("btn-specific-amenities-ok");
        amenSpecificConfirmBtn.addEventListener('click', function(){
            hbnb.hideSpecificAmenitiesSubmenu();
        })

    },
    showSpecificAmenitiesSubmenu: function() {
        // I have set up the CSS in a certain way so that the submenu is shown / hidden
        // depending on the 'state' parameter's value in #amenities-submenu
        let submenu = document.querySelector("#amenities-submenu")
        submenu.setAttribute("state", 'show')
    },
    hideSpecificAmenitiesSubmenu: function() {
        let submenu = document.querySelector("#amenities-submenu")
        submenu.setAttribute("state", 'hide')
    },
    updateSpecificAmenitiesCount: function() {
        let specificCount = document.querySelector("#menu >.contents >.amenities >.title .count")
        let selectedAmenitiesCheckboxes = document.querySelectorAll("#amenities-submenu >.items input[type='checkbox']");

        let checkedCount = 0
        for (let c of selectedAmenitiesCheckboxes) {
            if (c.checked) {
                checkedCount++
            }
        }

        specificCount.innerHTML = checkedCount

    },
    priceSliderInit: function() {
        let minPrice = document.getElementById("min-price")
        let maxPrice = document.getElementById("max-price")
        let priceValue = document.getElementById("price-value") // id
        minPrice.addEventListener("input", () => {
            priceValue.innerHTML = "$" + minPrice.value + ".00 - $" + maxPrice.value + ".00"
        })
        maxPrice.addEventListener("input", () => {
            priceValue.innerHTML = "$" + minPrice.value + ".00 - $" + maxPrice.value + ".00"
        })
    },
    ratingSliderInit: function() {
        let rating = document.getElementById("rating")
        let ratingValue = document.getElementById("rating-value") // id
        rating.addEventListener("input", () => {
            //console.log(rating.value)
            ratingValue.innerHTML = rating.value
        })
    },

    revealHiddenElement: function() {
        let place = document.getElementsByClassName("place")

        let allPlaces = function() {
            this.className = (this.className == 'place') ? 'place_open' : 'place'
        };

        for (let i = 0; i < place.length; i++) {
            place[i].addEventListener('click', allPlaces, false);
        }
    },

    uncheckCheckbox: function() {

        let groupCheck = Array.from(document.getElementsByName('amenity-checkbox-group'))
        let anyCheck = document.getElementById('any')
        let allCheck = document.getElementById('all')


        groupCheck.forEach(element => {
            element.onchange = () => {
                anyCheck.checked = false;
                allCheck.checked = false;
            }
        })

        anyCheck.onchange = () => {
            if (anyCheck.checked) {
                groupCheck.forEach(element => {
                    element.checked = false;
                })
            }
        }

        allCheck.onchange = () => {
            if (allCheck.checked) {
                groupCheck.forEach(element => {
                    element.checked = true;
                })
            }
        }
    },


    init: function() {
      //  hbnb.amenitiesInit();
        hbnb.priceSliderInit();
        hbnb.ratingSliderInit();
        hbnb.revealHiddenElement();
        hbnb.uncheckCheckbox();
    }

}

window.onload = function() {
    // We add something to the web site to indicate that JS is active
    // otherwise a big scary message will appear
    let body = document.getElementsByTagName("body")[0];
    body.setAttribute("js", "ok");
    document.body.style.visibility = 'visible';

    hbnb.init();

}

// So I'm pretty sure that you've all noticed that the code above is difficult to maintain.
// Just to access the radio inputs for Amenities, I had to use some crazy long selector string like:
// let amenRadios = document.querySelectorAll("#menu >.contents >.amenities >.choice input[type='radio']");
// What if someone changes the structure of the HTML? Updating the code would be terrifying!
// Think about what you all could do to make the code less annoying to update. Remind me to discuss this.