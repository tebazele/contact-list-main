let contacts = []

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()
  var randNumber = generateId();
  let form = event.target

  let contactName = form.name.value
  //console.log(contactName)

  let contactPhone = form.phoneNumber.value
  //console.log(contactPhone)

  let emergContactButton = document.getElementById("emergContact")
  let trueOrFalse = emergContactButton.checked
  //console.log(trueOrFalse)
  contacts.push({name: contactName, phoneNumber: contactPhone, emergencyContact: trueOrFalse, contactId: randNumber})

  //console.log(contacts)

  form.reset()
  toggleAddContactBack()
  drawContacts()
  saveContacts()
  
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
    window.localStorage.setItem("contacts", JSON.stringify(contacts))
    //console.log(contacts)
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  //console.log(contacts)
  let contactsData = JSON.parse(window.localStorage.getItem("contacts"))

  if(contactsData){
    contacts = contactsData;
}

  //console.log(contacts)

}


/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let contactTemplate = ""

  contacts.forEach(contact => {
    if(contact.emergencyContact == true){
      let contactId = contact.contactId
      contactTemplate += `
      <div class="card mt-1 mb-1 emergency-contact">
          <h3 class="mt-1 mb-1">${contact.name}</h3>
          <div class="d-flex space-between">
            <p>
              <i class="fa fa-fw fa-phone"></i>
              <span>${contact.phoneNumber}</span>
            </p>
            <div><span>${contact.contactId}</span></div>
            <i contactId=${contact.contactId} onclick="removeContactByElement(this)" class="action fa fa-trash text-danger"></i>
          </div>
        </div>
      `
    } else {
      let contactId = (contact.contactId)
      
      contactTemplate += `
      <div class="card mt-1 mb-1">
          <h3 class="mt-1 mb-1">${contact.name}</h3>
          <div class="d-flex space-between">
            <p>
              <i class="fa fa-fw fa-phone"></i>
              <span>${contact.phoneNumber}</span>
            </p>
            <div><span>${contact.contactId}</span></div>
            <i contactId=${contact.contactId} onclick="removeContactByElement(this)" class="action fa fa-trash text-danger"></i>
          </div>
        </div>
      `
    }
    
  })
  
  document.getElementById("contact-list").innerHTML = contactTemplate
  
}
function removeContactByElement(element) {
  let contactId = element.getAttribute("contactId")
  removeContact(contactId)
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  
  let i = contacts.findIndex(contact => {
    return contact.contactId == contactId
  })
  console.log(i)
  contacts.splice(i, 1)
  console.log(contacts)
  saveContacts()
  loadContacts()
  drawContacts()
  
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  document.getElementById("new-contact-form").classList.remove("hidden")
  document.getElementById("create-contact").classList.add("hidden")
}

function toggleAddContactBack(){
  document.getElementById("new-contact-form").classList.add("hidden")
  document.getElementById("create-contact").classList.remove("hidden")
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


//console.log(contacts)
loadContacts()
drawContacts()
//console.log(contacts)