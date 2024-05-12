import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://mfhrllsznlxvbhnxcvll.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4');

document.getElementById('submitBtn').addEventListener('click', async () => {
    const rego = document.getElementById('rego').value.trim().toUpperCase();
    const make = document.getElementById('make').value.trim();
    const model = document.getElementById('model').value.trim();
    const colour = document.getElementById('colour').value.trim();
    const owner = document.getElementById('owner').value.trim();

    const resultsDiv = document.querySelector('main > div.results');

    // Check if any field is empty
    if (!rego || !make || !model || !colour || !owner) {
        resultsDiv.innerText = 'Please fill in all of the boxs.';
        return;
    }

    // Construct the data object to be inserted into the database
    const vehicleData = {
        VehicleID: rego,
        Make: make,
        Model: model,
        Colour: colour,
        OwnerID: owner
    };

    try {
        // Insert the data into the database
        const { data, error } = await supabase.from('vehicles').insert([vehicleData]);

        if (error) {
            resultsDiv.innerText = 'Error';
            console.error(error);
        }
        else {
            resultsDiv.innerText = 'Vehicle added successfully';
            // Clear the input fields after successful addition
            document.getElementById('rego').value = '';
            document.getElementById('make').value = '';
            document.getElementById('model').value = '';
            document.getElementById('colour').value = '';
            document.getElementById('owner').value = '';
        }
    }
    catch (error) {
        console.error('Error adding vehicle:', error.message);
    }
});