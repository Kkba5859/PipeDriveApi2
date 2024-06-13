class PipedriveIntegration {
    constructor() {
        window.addEventListener('message', this.handleMessage.bind(this));
        this.createJobBtn = document.getElementById('createJobBtn');
        this.createJobBtn.addEventListener('click', this.createJob.bind(this));
        this.saveInfoBtn = document.getElementById('saveInfoBtn');
        this.saveInfoBtn.addEventListener('click', this.saveInfo.bind(this));
    }

    handleMessage(event) {
        const { clientData, jobData, serviceLocationData, scheduledData } = event.data;

        // Create an object with data to be sent to your backend
        const pipedriveData = {
            clientData,
            jobData,
            serviceLocationData,
            scheduledData
        };

        // Send a request to your backend API
        fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pipedriveData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Deal created:', data);
            // Additional actions after successful deal creation
        })
        .catch(error => {
            console.error('Error creating deal:', error);
            // Error handling
        });
    }

    createJob() {
        // Implement the logic to create a job (deal) in Pipedrive
        // Upon successful creation, update the button's text and style
        this.createJobBtn.textContent = 'Request is sent';
        this.createJobBtn.classList.add('sent');
    }

    saveInfo() {
        // Trigger the saveData function in the iframe
        const iframe = document.querySelector('iframe');
        iframe.contentWindow.saveData();
    }
}

const pipedriveIntegration = new PipedriveIntegration();
