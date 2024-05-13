import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://mfhrllsznlxvbhnxcvll.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHJsbHN6bmx4dmJobnhjdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxMjYyOTQsImV4cCI6MjAzMDcwMjI5NH0.UbF_JOJIntL7oYhbkzr_k1P_1E_B0ulwtBEdEOquyS4');

document.getElementById('submitBtn').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim().toLowerCase(); 
    const license = document.getElementById('license').value.trim().toUpperCase();

    let query = supabase.from('people').select('*');
    if (name !== '') {
        query = query.or(`Name.ilike.*${name}*`);
    }
    if (license !== '') {
        query = query.or(`LicenseNumber.eq.${license}`);
    }

    const { data, error } = await query;

    const resultsDiv = document.querySelector('main > div.results'); 
    const messageDiv = document.getElementById('message'); 

    if (error || (name && license !== '')) {
        resultsDiv.innerText = 'Error';
        messageDiv.innerText = 'Error';
    }
    else {
        if (data.length === 0) {
            resultsDiv.innerText = 'No result found';
            messageDiv.innerText = 'No result found';
        }
        else {
            let resultsHTML = '';
            data.forEach(person => {
                resultsHTML += `
                    <div class="person-data">
                        <p>personid: ${person.PersonID}</p>
                        <p>name: ${person.Name}</p>
                        <p>address: ${person.Address}</p>
                        <p>dob: ${person.DOB}</p>
                        <p>licensenumber: ${person.LicenseNumber}</p>
                        <p>expirydate: ${person.ExpiryDate}</p>
                    </div>
                `;
            });
            resultsDiv.innerHTML = resultsHTML;
            messageDiv.innerText = 'Search successful'; 
        }
    }
});