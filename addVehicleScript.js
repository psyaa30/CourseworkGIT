import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://mfhrllsznlxvbhnxcvll.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4');

document.getElementById('submitBtn').addEventListener('click', async () => 
{
    const addPlate = document.getElementById('addPlate').value.trim().toUpperCase();
    const addMake = document.getElementById('addMake').value.trim();
    const addModel = document.getElementById('addModel').value.trim();
    const addColour = document.getElementById('addColour').value.trim();
    const addID = document.getElementById('addID').value.trim();

    const resultDiv = document.querySelector('main > div.result');

    // Check if any field is empty
    if (!addPlate || !addMake || !addModel || !addColour || !addID) 
    {
        resultDiv.innerText = 'Please fill in all of the boxs.';
        return;
    }

    // Construct the data object to be inserted into the database
    const vehicleData = 
    {
        VehicleID: addPlate,
        Make: addMake,
        Model: addModel,
        Colour: addColour,
        OwnerID: addID
    };
/////
    try 
    {
        // Insert the data into the database
        const { data, error } = await supabase.from('vehicles').insert([vehicleData]);
        

        if (error) 
        {
            resultDiv.innerText = 'Error';
            console.error(error);
        } 
        else 
        {
            resultDiv.innerText = 'Vehicle added successfully!';
            // Clear the input fields after successful addition
            document.getElementById('addPlate').value = '';
            document.getElementById('addMake').value = '';
            document.getElementById('addModel').value = '';
            document.getElementById('addColour').value = '';
            document.getElementById('addID').value = '';
        }
    } 
    catch (error) 
    {
        console.error('Error adding vehicle:', error.message);
    }
});