import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// Create a single supabase client for interacting with your database
const supabase = createClient('https://mfhrllsznlxvbhnxcvll.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4')

// async function fetchPeople(name) {
//     const { data, error } = await supabase.from('People').select();
//     displayResults(data);
//     console.log(data)
// }

// Configuration for Supabase API
const SUPABASE_URL = 'https://mfhrllsznlxvbhnxcvll.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4';
const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

// Function to handle people search
export async function searchPeople(event) {
    console.log("Hi")
    event.preventDefault();
    const nameOrLicense = document.getElementById('name').value.trim();
    if (!nameOrLicense) {
        document.getElementById('message').innerText = 'Please enter a name or license number.';
        return;
    }
    const { data, error } = await supabase.from('People').select("Name");
    console.log(data)
    displayResults(data.json(), 'people');
}

// Function to handle vehicle search
export async function searchVehicle(event) {
    event.preventDefault();
    const rego = document.getElementById('rego').value.trim();
    if (!rego) {
        document.getElementById('message').innerText = 'Please enter a registration number.';
        return;
    }
    const { data, error } = await supabase.from('Vehicles').select();
    console.log(data)
    displayResults(data.json(), 'vehicle');
}

// Function to add a new vehicle
export async function addVehicle(event) {
    event.preventDefault();
    const rego = document.getElementById('rego').value.trim();
    const make = document.getElementById('make').value.trim();
    const model = document.getElementById('model').value.trim();
    const colour = document.getElementById('colour').value.trim();
    const owner = document.getElementById('owner').value.trim();

    if (!rego || !make || !model || !colour || !owner) {
        document.getElementById('message').innerText = 'All fields must be filled out.';
        return;
    }

    const payload = { registration_number: rego, make, model, colour, owner };
    const response = await fetch(`${SUPABASE_URL}/rest/v1/vehicles`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        document.getElementById('message').innerText = 'Vehicle added successfully.';
    } else {
        document.getElementById('message').innerText = 'Failed to add vehicle.';
    }
}

// Function to display results
export function displayResults(data, type) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (data.length === 0) {
        document.getElementById('message').innerText = 'No results found.';
        return;
    }
    data.forEach(item => {
        const div = document.createElement('div');
        if (type === 'people') {
            div.innerText = `Name: ${item.name}, License: ${item.license_number}`;
        } else if (type === 'vehicle') {
            div.innerText = `Registration: ${item.registration_number}, Make: ${item.make}, Model: ${item.model}, Colour: ${item.colour}, Owner: ${item.owner}`;
        }
        resultsDiv.appendChild(div);
    });
    document.getElementById('message').innerText = '';
}

// Event listeners for forms
document.getElementById('searchForm')?.addEventListener('submit', searchPeople);
document.getElementById('vehicleSearchForm')?.addEventListener('submit', searchVehicle);
document.getElementById('addVehicleForm')?.addEventListener('submit', addVehicle);
