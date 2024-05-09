// Import the createClient function from the Supabase JS library
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuration for Supabase API
const SUPABASE_URL = 'https://your-supabase-project-url.supabase.co';
const SUPABASE_KEY = 'your-supabase-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to handle people search
export async function searchPeople(event) {
    event.preventDefault();
    const nameOrLicense = document.getElementById('name').value.trim();
    if (!nameOrLicense) {
        document.getElementById('message').innerText = 'Please enter a name or license number.';
        return;
    }

    const { data, error } = await supabase
        .from('people')
        .select('*')
        .or(`name.ilike.%${nameOrLicense}%,license_number.ilike.%${nameOrLicense}%`);

    if (error) {
        document.getElementById('message').innerText = 'Failed to fetch data.';
        console.error('Error:', error);
    } else {
        displayResults(data, 'people');
    }
}

// Function to handle vehicle search
export async function searchVehicle(event) {
    event.preventDefault();
    const rego = document.getElementById('rego').value.trim();
    if (!rego) {
        document.getElementById('message').innerText = 'Please enter a registration number.';
        return;
    }

    const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('registration_number', rego);

    if (error) {
        document.getElementById('message').innerText = 'Failed to fetch data.';
        console.error('Error:', error);
    } else {
        displayResults(data, 'vehicle');
    }
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

    const { data, error } = await supabase
        .from('vehicles')
        .insert([{ registration_number: rego, make, model, colour, owner }]);

    if (error) {
        document.getElementById('message').innerText = 'Failed to add vehicle.';
        console.error('Error:', error);
    } else {
        document.getElementById('message').innerText = 'Vehicle added successfully.';
    }
}

// Function to display results
export function displayResults(data, type) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (!data || data.length === 0) {
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
