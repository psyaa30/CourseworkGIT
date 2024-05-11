// // Import the createClient function from the Supabase JS library
// //import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// // Configuration for Supabase API
// const SUPABASE_URL = 'https://mfhrllsznlxvbhnxcvll.supabase.co';
// const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4';
// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// // Function to handle people search
// export async function searchPeople(event) {
//     event.preventDefault();
//     const nameOrLicense = document.getElementById('name').value.trim();
//     console.log("Searching for:", nameOrLicense);  // Debug input

//     if (!nameOrLicense) {
//         document.getElementById('message').innerText = 'Please enter a name or license number.';
//         return;
//     }

//     try {
//         const queryString = `name.ilike.%25${nameOrLicense}%25,license_number.ilike.%25${nameOrLicense}%25`;
//         console.log("Query String:", queryString);

//         const { data: people, error } = await supabase
//             .from('people')
//             .select('*')
//             .or(queryString);
// //
//         console.log("Received data:", people); // Debug output
//         console.log("API Error:", error);  // Debug errors

//         if (error) throw error;
//         if (people.length === 0) {
//             document.getElementById('message').innerText = 'No results found.';
//             return;
//         }

//         displayResults(people, 'people');
//     } catch (error) {
//         document.getElementById('message').innerText = 'Failed to fetch data.';
//         console.error('Error:', error);
//     }
// }




// // Function to handle vehicle search
// export async function searchVehicle(event) {
//     event.preventDefault();
//     const rego = document.getElementById('rego').value.trim();
//     if (!rego) {
//         document.getElementById('message').innerText = 'Please enter a registration number.';
//         return;
//     }

//     const { data, error } = await supabase
//         .from('vehicles')
//         .select('*')
//         .eq('registration_number', rego);

//     if (error) {
//         document.getElementById('message').innerText = 'Failed to fetch data.';
//         console.error('Error:', error);
//     } else {
//         displayResults(data, 'vehicle');
//     }
// }

// // Function to add a new vehicle
// export async function addVehicle(event) {
//     event.preventDefault();
//     const rego = document.getElementById('rego').value.trim();
//     const make = document.getElementById('make').value.trim();
//     const model = document.getElementById('model').value.trim();
//     const colour = document.getElementById('colour').value.trim();
//     const owner = document.getElementById('owner').value.trim();

//     if (!rego || !make || !model || !colour || !owner) {
//         document.getElementById('message').innerText = 'All fields must be filled out.';
//         return;
//     }

//     const { data, error } = await supabase
//         .from('vehicles')
//         .insert([{ registration_number: rego, make, model, colour, owner }]);

//     if (error) {
//         document.getElementById('message').innerText = 'Failed to add vehicle.';
//         console.error('Error:', error);
//     } else {
//         document.getElementById('message').innerText = 'Vehicle added successfully.';
//     }
// }

// // Function to display results
// export function displayResults(data, type) {
//     const resultsDiv = document.getElementById('results');
//     resultsDiv.innerHTML = '';
//     if (!data || data.length === 0) {
//         document.getElementById('message').innerText = 'No results found.';
//         return;
//     }
//     data.forEach(item => {
//         const div = document.createElement('div');
//         if (type === 'people') {
//             div.innerText = `Name: ${item.name}, License: ${item.license_number}`;
//         } else if (type === 'vehicle') {
//             div.innerText = `Registration: ${item.registration_number}, Make: ${item.make}, Model: ${item.model}, Colour: ${item.colour}, Owner: ${item.owner}`;
//         }
//         resultsDiv.appendChild(div);
//     });
//     document.getElementById('message').innerText = '';
// }

// // Event listeners for forms
// document.getElementById('searchForm')?.addEventListener('submit', searchPeople);
// document.getElementById('vehicleSearchForm')?.addEventListener('submit', searchVehicle);
// document.getElementById('addVehicleForm')?.addEventListener('submit', addVehicle);
////
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://mfhrllsznlxvbhnxcvll.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4');

document.getElementById('submitBtn').addEventListener('click', async () => {
    const searchName = document.getElementById('searchName').value.trim().toLowerCase(); 
    const searchLicense = document.getElementById('searchLicense').value.trim().toUpperCase();

    let query = supabase.from('people').select('*');
    if (searchName !== '') {
        query = query.or(`Name.ilike.*${searchName}*`);
    }
    if (searchLicense !== '') {
        query = query.or(`LicenseNumber.eq.${searchLicense}`);
    }

    const { data, error } = await query;

    const resultDiv = document.querySelector('main > div.result'); // Select the result container using the class
    if (error) {
        resultDiv.innerText = 'Error';
        console.error(error);
    }
    else {
        if (data.length === 0) {
            resultDiv.innerText = 'No results';
        }
        else {
            let resultHTML = '';
            data.forEach(person => {
                resultHTML += `
                    <div class="person-info">
                        <p>Name: ${person.name}</p>
                        <p>Address: ${person.address}</p>
                        <p>Date of Birth: ${person.dob}</p>
                        <p>License Number: ${person.license_number}</p>
                        <p>Expiry Date: ${person.expirydate}</p>
                    </div>
                `;
            });
            resultDiv.innerHTML = resultHTML; // Set the concatenated string as innerHTML
        }
    }
});