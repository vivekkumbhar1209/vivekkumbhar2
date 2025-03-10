After cloning change directory to ./HMS

Backend Setup:-

1. cd ./hmsBackend - change directory to backend directory
2. composer install - install all the backend dependencies
3. cp .env.example .env - generate an .env file
4. In .env file uncomment the database lines.
5. php artisan key:generate - generate application key
6. php artisan migrate - migrate all the table into mysql
7. php artisan db:seed - run this to insert demo data the database.
8. php artisan serve - start the development server

Add the following lines to .env file to configure Pusher for real time notification feature

BROADCAST_DRIVER=pusher
PUSHER_APP_ID=1953989
PUSHER_APP_KEY=4f0d3f536163be9e540c
PUSHER_APP_SECRET=18e37a7cb2804cdc0267
PUSHER_APP_CLUSTER=ap2

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

---

Frontend Setup

1. cd ./hmsFrontend - change directory to frontend directory
2. npm install - run this command to install all react and node dependencies.
3. npm start - run this command to start the react development server

Demo users and password:

1. Admin
   Username - admin@example.com
   Password - admin123

2. Doctor
   Username - doctor@example.com
   Password - password123

3. Receptionist
   Username - receptionist@example.com
   Password - password123
