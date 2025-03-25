
   A. The following are setup instructions - LOCAL MACHINE

1. Clone the code using  - git clone <repository>

2.  List the folders in the directory using ls command
     For Example  - ls then press Enter
     N.B You should be able to see /backend, /frontend , README.txt, example.env and docker-compose.yml
 i. Navigate to backend directory using command  cd /backend  and perform following
       a. npm install to install all the required packages  *Ensure your Node Version is 18+*
       b. Once this is complete, run the command npm run dev.
       c. If Step b is success, you should see the following
           Server running on port 3001
           Good Job Champion....Database connected
       d. The Backend API service is up and running

   ii.  Navigate to frontend directory using command  cd /fronted  and perform following
       a. npm install to install all the required packages  *Ensure your Node Version is 18+*
       b. npm start, If success then frontend web is up and running and you should be able to see the following
             Compiled successfully!
              You can now view frontend in the browser.
              Local:            http://localhost:3000


  B. The setup and deployment on docker is as follows

   a. Ensure you clone the project  using the following
      - git clone <repository>
   b. Navigate to each directory as instructed above i.e backend and frontend.
   c. Ensure in each of the directores, dockerfile is present.
   d.At the root, check to see docker-compose file is present too. If not, reclone afresh
   e. At the root, create a new file .env if it doesn't exist  and copy contents of example.env to .env
   f. Ensure the docker engine is running if not, start it. (This will depend on the OS and Installation of the docker)
   g. If up, run this command at the root
        docker-compose up
        This will create the images - frontend, backend and pull the postgres db image
        It will also create the containers based on the above images and ensure docker network is created

    h. On a separate tab, run the command below to ensure all the 3 containers are created and running as expected
         docker ps
    i. If the containers are not running, type the followng command for those tha are not running to check logs
        docker logs -f --tail <Some Number(Replace this)> <Container ID>
        for example
        docker logs -f --tail 400 trply_db

  C. TESTING

TESTING IF EVERYTHING WORKS - Local
//replace http and localhost with your secure protocol(if any) and Server IP(if any)

Backend - http://localhost:3001/api-docs/
Frontend - http://localhost:3001/

TESTING IF EVERYTHING WORKS - Docker Setup
//replace http and localhost with your secure protocol(if any) and Server IP(if any)

The containers created will be as follows
 1. trply_db
 2. trply_frontend
 3. trply_backend

Backend - http://IP:3001/api-docs/
Frontend - http://IP:3001/

   - You can use the frontend web interface to test registration, login, book for tours, make payment, view bookings
   - You can as well test on the swagger UI --> http://IP:3001/api-docs/ and ensure you pass the bearer token for the protected routes



NOTE - Deployment on AWS procedure and instruction shared on ./AWS Deployment PDF

Based on the Requirements, I have achieved the following
1. Stripe Integration
Stripe is integrated for payment processing. Here's how it works:
a. Stripe Checkout
     Endpoint: /api/payments/create-session
b. Stripe Webhooks
     Endpoint  /api/payments/webhook

2. OAuth2 Authentication - JWT-based OAuth2 authentication:
a. User Registration
      Endpoint /api/auth/register
b. User Login
     Endpoint: /api/auth/login

c. Authentication Middleware

3. Security Measures
a. SQL Injection Protection
    Sequelize ORM -  By using Sequelize, we automatically protect against SQL injection through parameterized queries
b. XSS (Cross-Site Scripting) Protection
    Express validator

c. CSRF (Cross-Site Request Forgery) Protection
   CSRF Tokens
d. Helmet for Security Headers -  sets various HTTP headers to protect against common vulnerabilities.
e. Rate Limiting


I have also added few more features
1. Email Notifications - setup almost complete
2. Multi-Currency Support to expand user base by allowing international users to pay in their local currency.
3. Rate Limiting against DDOS, Bruteforce


D. SCREENSHOTS - Of the working system shared in the ./screenshots folder


