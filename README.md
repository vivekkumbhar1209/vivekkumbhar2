After cloning change directory to ./HMS

Backend Setup:-

1. cd ./hmsBackend - change directory to backend directory
2. composer install - install all the backend dependencies
3. cp .env.example .env - generate an .env file
4. In .env file uncomment the database lines.
5. php artisan key:generate - generate application key
6. php artisan migrate - migrate all the table into mysql
7. php artisan db:seed UsersTableSeeder - run this to insert demo users of the system in the user table.
8. php artisan serve - start the development server

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
