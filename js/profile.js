async function loadData() {
    const url = '/api/profile/profile.php'; // mit korrekter API-URL ersetzen
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const data = await loadData();
console.log(data); // gibt die Daten der API oder false in der Konsole aus

const domfirstName = document.querySelector('#firstname');
const domlastName = document.querySelector('#lastname');

domfirstName.innerHTML = data.user.firstname;
domlastName.innerHTML = data.user.lastname;

//__________________________________________________________
// Adding Vorname und Nachname to the Database
//__________________________________________________________


const inputfirstname = document.querySelector('#inputfirstname');
const inputlastname = document.querySelector('#inputlastname');
const savebutton = document.querySelector('#saveButton');

savebutton.addEventListener('click', async (e) => {
    let firstname = inputfirstname.value;
    let lastname = inputlastname.value;
    const url = '/api/profile/createprofile.php';
    const data = {
        firstname: firstname,
        lastname: lastname
    };
    const dataAdded = await addData(url, data);
    console.log(dataAdded);

});

//I want to post the data to the API and then reload the page (Copilot eingabe) 
async function addData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return false

    }
}
