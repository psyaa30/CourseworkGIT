import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://mfhrllsznlxvbhnxcvll.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4');

document.getElementById('submitVehicleBtn').addEventListener('click', async () => {
    const ownerName = document.getElementById('owner').value.trim();
    const ownerExists = await checkOwnerExists(ownerName);

    if (!ownerExists) {
        document.getElementById('ownerForm').style.display = 'block';
        document.getElementById('message').innerText = 'Owner does not exist, please add owner details.';
    } else {
        await submitVehicle();
    }
});

document.getElementById('submitOwnerBtn').addEventListener('click', async () => {
    await submitOwner();
});

async function checkOwnerExists(ownerName) {
    const { data, error } = await supabase.from('people').select('*').eq('Name', ownerName);
    return data.length > 0;
}

async function submitVehicle() {
    const rego = document.getElementById('rego').value.trim().toUpperCase();
    const make = document.getElementById('make').value.trim();
    const model = document.getElementById('model').value.trim();
    const colour = document.getElementById('colour').value.trim();
    const owner = document.getElementById('owner').value.trim();

    if (!rego || !make || !model || !colour || !owner) {
        document.getElementById('message').innerText = 'Error';
        return;
    }

    const { data, error } = await supabase.from('people').select('*').or(`Name.ilike.*${owner}*`);
    let ownerPLHL = "";
    data.forEach(p => {
        ownerPLHL += `${p.PersonID}`
    });

    const vehicleData = { VehicleID: rego, Make: make, Model: model, Colour: colour, OwnerID: parseInt(ownerPLHL) };
    const { x, y } = await supabase.from('vehicles').insert([vehicleData]);

    if (error) {
        console.error('Error inserting vehicle:', error);
        document.getElementById('message').innerText = 'Error';
    } else {
        document.getElementById('message').innerText = 'Vehicle added successfully';
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
        document.getElementById('message').innerText = 'Error';
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
        document.getElementById('message').innerText = 'Error';
    } else {
        document.getElementById('message').innerText = 'Owner added successfully.';
        await submitVehicle();
    }
}
