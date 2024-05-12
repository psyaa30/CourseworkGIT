import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://mfhrllsznlxvbhnxcvll.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4');

document.getElementById('submitBtn').addEventListener('click', async () => 
{
    const searchLicense = document.getElementById('searchLicense').value.trim().toUpperCase(); 
    const searchMake = document.getElementById('searchMake').value.trim().toLowerCase(); 

    let query = supabase.from('vehicles').select('*');
    if (searchLicense !== '') 
    {
        query = query.or(`VehicleID.eq.${searchLicense}`);
    }
    if (searchMake !== '') 
    {
        query = query.or(`Make.ilike.*${searchMake}*`);
    }

    const { data, error } = await query;

    const resultDiv = document.querySelector('main > div.results');
    if (error) 
    {
        resultDiv.innerText = 'Error';
        console.error(error);
    } 
    else 
    {
        if (data.length === 0) 
        {
            resultDiv.innerText = 'No results';
        } 
        else 
        {
            let resultHTML = '';
            data.forEach(vehicle => 
                {
                resultHTML += `
                    <div class="person-data">
                        <p>License Plate: ${vehicle.VehicleID}</p>
                        <p>Make: ${vehicle.Make}</p>
                        <p>Model: ${vehicle.Model}</p>
                        <p>Colour: ${vehicle.Colour}</p>
                        <p>Owner ID: ${vehicle.OwnerID}</p>
                    </div>
                `;
            });
            resultDiv.innerHTML = resultHTML;
        }
    }
});
