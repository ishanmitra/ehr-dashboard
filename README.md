# EHR Integration Dashboard Assignment

## Objective

To build a secure Next.js application that integrates an Electronic Health Records (EHR) system with a dashboard to perform CRUD operations. The implementation should demonstrate a thorough understanding of the API documentation and create a practical dashboard.

## Links

Live Dashboard: https://ehr.ishanmitra.com/  
API Server is a self-hosted JSON server that mimics DrChrono EHR API  
Postman Collection: https://postman.co/workspace/My-Workspace~de970e4c-5b22-4605-8521-1f6f49e88499/request/887928-8d516f9d-ee56-49c6-92b7-98733680f4eb?action=share&creator=887928  

## API Discovery

Among the two provided Sandbox APIs, DrChrono was more promising with a relatively straightforward approach to developing the API endpoints. Unfortunately, Epic on FHIR was non-responsive to the API calls, returning 404 for the simplest request. Shifting to the DrChrono sandbox was unsuccessful. Along with the Client ID and Secret, a user login credential was required to access the sandbox fully. DrChrono was well-documented, and I found a Mockoon for DrChrono, which helped in developing the Postman Collection.

Due to the limited nature of the mock API requests, the primary focus was solely on enabling a CRUD-based dashboard SaaS. There is no OAuth 2.0, scope check or HIPAA compliance due to this restriction.

### Patient Management

- Patients: `/api/patients`
- Allergies: `/api/allergies`
- Problems: `/api/problems`
- Medications: `/api/medications`
- Vaccine Records: `/api/patient_vaccine_records`
- Implantable Devices: `/api/implantable_devices`

### Appointment Scheduling

- Appointments: `/api/appointments/`
- Appointment Profiles: `/api/appointment_profiles/`
- Appointment Templates: `/api/appointment_templates/`

### Clinical Operations

- Clinical Notes: `/api/clinical_notes`
- Clinical Note Field Values: `/api/clinical_note_field_values`
- Custom Vitals: `/api/custom_vitals`
- Lab Documents: `/api/lab_documents`
- Lab Results: `/api/lab_results`
- Lab Tests: `/api/lab_tests`
- Lab Orders: `/api/lab_orders`
- Procedures: `/api/procedures`

### Billing & Administrative

- Eligibility Checks: `/api/eligibility_checks`
- Patient Payments: `/api/patient_payments`
- Patient Payment Logs: `/api/patient_payment_log`
- Fee Schedules: `/api/fee_schedules`
- Lab Orders Summary: `/api/lab_orders_summary`

This list is also present in the Postman Collection. However, it highlights the full scale of the API requests that the Postman Collection covers and documents.

## Mock Server API Endpoints

As the Sandbox for DrChrono was inaccessible, the documentation provided schemas that aided in the development of a few of the possible endpoints, against which mock data was created.  

`https://0.0.0.0:3000/patients`  
`https://0.0.0.0:3000/allergies`  
`https://0.0.0.0:3000/problems`  
`https://0.0.0.0:3000/medications`  
`https://0.0.0.0:3000/patient_vaccine_records`  
`https://0.0.0.0:3000/appointments`  
`https://0.0.0.0:3000/appointment_profiles`  
`https://0.0.0.0:3000/appointment_templates`  
`https://0.0.0.0:3000/lab_results`  
`https://0.0.0.0:3000/lab_orders`  
`https://0.0.0.0:3000/patient_payments`  

## Dashboard UI

The website has been designed using Shadcn components and is hosted on Vercel. The sitemap of the website consists of the following routes:
`https://ehr.ishanmitra.com/`  
`https://ehr.ishanmitra.com/patients`  
`https://ehr.ishanmitra.com/appointments`  
`https://ehr.ishanmitra.com/payments`  

It consists of a side navbar, a table view for viewing a collection of data, a collapsible detail pane on the right, a modal for creating new data, and toast notification popups for CRUD operations. All the CRUD operations account for error handling and mandatory field values through the toasters.
