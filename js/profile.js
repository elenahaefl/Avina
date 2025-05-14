async function loadData() {
    const url = '/api/profile/readprofile.php'; // mit korrekter API-URL ersetzen
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
const dombirthday = document.querySelector('#userbirthday');
const domuserage = document.querySelector('#userage');
const domuseremail = document.querySelector('#useremail');

domfirstName.innerHTML = data.user.firstname;
domlastName.innerHTML = data.user.lastname;
dombirthday.innerHTML = data.user.birthdate;
domuseremail.innerHTML = data.user.email;

//__________________________________________________________
// Alter berechnen
//__________________________________________________________

// Geburtsdatum in ein Date-Objekt umwandeln
const birthdate = new Date(data.user.birthdate);

// Aktuelles Datum
const today = new Date();

// Alter berechnen
let age = today.getFullYear() - birthdate.getFullYear();
const monthDiff = today.getMonth() - birthdate.getMonth();
const dayDiff = today.getDate() - birthdate.getDate();

// Falls Geburtstag in diesem Jahr noch nicht war, Alter -1
if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
  age--;
}

// Alter anzeigen
domuserage.innerHTML = age;

//__________________________________________________________
// Adding Vorname und Nachname to the Database
//__________________________________________________________


// const inputfirstname = document.querySelector('#inputfirstname');
// const inputlastname = document.querySelector('#inputlastname');
// const savebutton = document.querySelector('#saveadditionalinfo');

// savebutton.addEventListener('click', async (e) => {
//     let firstname = inputfirstname.value;
//     let lastname = inputlastname.value;
//     const url = '/api/profile/createprofile.php';
//     const data = {
//         firstname: firstname,
//         lastname: lastname
//     };
//     const dataAdded = await addData(url, data);
//     console.log(dataAdded);

// });

// //I want to post the data to the API and then reload the page (Copilot eingabe) 
// async function addData(url, data) {
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         return false

//     }
// }

// __________________________________________________________
// Update Vorname und Nachname und Geburtstag
// __________________________________________________________

    // const inputbirthdate = document.querySelector('#inputbirthdate');
    // const savebirthdate = document.querySelector('#updatebirthday');

    // savebirthdate.addEventListener('click', async (e) => {
    //     const updatebirthdate = inputbirthdate.value;
    //     const url = '/api/profile/updateprofile.php';
    //     const data = {
    //         birthdate: updatebirthdate
    //     };
    //     const dataUpdated = await updateData(url, data);
    //     console.log(dataUpdated);
    // });

 //I want to update the data to the API and then reload the page (Copilot eingabe) 
// async function updateData(url, data) {
//     try {
//         const response = await fetch(url, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         return false

//     }
// }

// __________________________________________________________
// Delete Vorname und Nachname und Geburtstag
// __________________________________________________________

