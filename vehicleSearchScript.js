import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://mfhrllsznlxvbhnxcvll.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4');

document.getElementById('submitBtn').addEventListener('click', async () => {
    const rego = document.getElementById('rego').value.trim().toUpperCase();
    const make = document.getElementById('make').value.trim().toLowerCase();

    let query = supabase.from('vehicles').select('*');
    if (rego !== '') {
        query = query.or(`VehicleID.eq.${rego}`);
    }
    if (make !== '') {
        query = query.or(`Make.ilike.*${make}*`);
    }

    const { data, error } = await query;

    const resultsDiv = document.querySelector('main > div.results');
    const messageDiv = document.getElementById('message');

    if (error || rego == "") {
        resultsDiv.innerText = 'Error';
        messageDiv.innerText = "Error";
    }
    else {
        if (data.length === 0) {
            resultsDiv.innerText = 'No result found';
            messageDiv.innerText = 'No result found';
        }
        else {
            let resultsHTML = '';
            data.forEach(vehicle => {
                resultsHTML += `
                    <div class="person-data">
                        <p>Rego: ${vehicle.VehicleID}</p>
                        <p>Make: ${vehicle.Make}</p>
                        <p>Model: ${vehicle.Model}</p>
                        <p>Colour: ${vehicle.Colour}</p>
                        <p>Owner ID: ${vehicle.OwnerID}</p>
                    </div>
                `;
            });
            resultsDiv.innerHTML = resultsHTML;
            messageDiv.innerText = 'Search successful';
        }
    }
});
