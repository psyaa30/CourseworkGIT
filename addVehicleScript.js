// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// const supabase = createClient('https://mfhrllsznlxvbhnxcvll.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4');

// document.getElementById('submitVehicleBtn').addEventListener('click', async () => {
//     const rego = document.getElementById('rego').value.trim().toUpperCase();
//     const make = document.getElementById('make').value.trim();
//     const model = document.getElementById('model').value.trim();
//     const colour = document.getElementById('colour').value.trim();
//     const owner = document.getElementById('owner').value.trim();

//     const resultsDiv = document.querySelector('main > div.results');
//     const messageDiv = document.getElementById('message'); 

//     // Check if any field is empty
//     if (!rego || !make || !model || !colour || !owner) {
//         resultsDiv.innerText = 'Please fill in all of the boxs.';
//         return;
//     }

//     // Construct the data object to be inserted into the database
//     const vehicleData = {
//         VehicleID: rego,
//         Make: make,
//         Model: model,
//         Colour: colour,
//         OwnerID: owner
//     };

//     try {
//         // Insert the data into the database
//         const { data, error } = await supabase.from('vehicles').insert([vehicleData]);

//         if (error) {
//             resultsDiv.innerText = 'Error';
//             console.error(error);
//         }
//         else {
//             resultsDiv.innerText = 'Vehicle added successfully';
//             messageDiv.innerText = "Vehicle added successfully";
//             document.getElementById('rego').value = '';
//             document.getElementById('make').value = '';
//             document.getElementById('model').value = '';
//             document.getElementById('colour').value = '';
//             document.getElementById('owner').value = '';
//         }
//     }
//     catch (error) {
//         console.error('Error adding vehicle:', error.message);
//     }
// });



import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize the Supabase client
const supabase = createClient('https://mfhrllsznlxvbhnxcvll.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4');

document.getElementById('submitVehicleBtn').addEventListener('click', async () => {
    const ownerName = document.getElementById('owner').value.trim();
    const ownerExists = await checkOwnerExists(ownerName);

    if (!ownerExists) {
        // If owner does not exist, show the owner form
        document.getElementById('ownerForm').style.display = 'block';
        document.getElementById('message').innerText = 'Owner does not exist, please add owner details.';
    } else {
        // If owner exists, proceed to submit vehicle
        await submitVehicle();
    }
});

document.getElementById('submitOwnerBtn').addEventListener('click', async () => {
    await submitOwner();
});

async function checkOwnerExists(ownerName) {
    const { data, error } = await supabase.from('people').select('*').eq('Name', ownerName);
    return data.length > 0; // Returns true if owner exists, otherwise false
}

async function submitVehicle() {
    const rego = document.getElementById('rego').value.trim().toUpperCase();
    const make = document.getElementById('make').value.trim();
    const model = document.getElementById('model').value.trim();
    const colour = document.getElementById('colour').value.trim();
    const owner = document.getElementById('owner').value.trim();

    if (!rego || !make || !model || !colour || !owner) {
        document.getElementById('message').innerText = 'Please fill in all vehicle fields.';
        return;
    }

    const { info, err } = await supabase.from('people').select('*').eq('Name', owner);

    const vehicleData = { VehicleID: rego, Make: make, Model: model, Colour: colour, OwnerID: info.PersonID };
    const { data, error } = await supabase.from('vehicles').insert([vehicleData]);

    if (error) {
        console.error('Error inserting vehicle:', error);
        document.getElementById('message').innerText = 'Error adding vehicle.';
    } else {
        document.getElementById('message').innerText = 'Vehicle added successfully';
        // Optionally clear the form or take other actions
    }
}

async function submitOwner() {
    const personid = document.getElementById('personid').value.trim();
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const dob = document.getElementById('dob').value;
    const license = document.getElementById('license').value.trim();
    const expire = document.getElementById('expire').value;

    if (!personid || !name || !address || !dob || !license || !expire) {
        document.getElementById('message').innerText = 'Please fill in all owner fields.';
        return;
    }

    const ownerData = {
        PersonID: personid,
        Name: name,
        Address: address,
        DOB: dob,
        LicenseNumber: license,
        ExpiryDate: expire
    };
    const { data, error } = await supabase.from('people').insert([ownerData]);

    if (error) {
        console.error('Error inserting owner:', error);
        document.getElementById('message').innerText = 'Error adding owner.';
    } else {
        document.getElementById('message').innerText = 'Owner added successfully.';
        await submitVehicle(); // Submit vehicle after owner is added
    }
}
