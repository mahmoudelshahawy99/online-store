## Title : 
* online store management system

## Introduction : 
* This app is agroup of Restful APIS which anyone can register to your system as a trader and upload their products, clients, create orders, send offers, get details reports and manage their store.

## Features :
* Sign up with email verification.
* Sign in for the trader account with email and password.
* Create CRUD operation for the products, also the trader can upload their product data with excel sheet.
* Each trader has a set of clients so you can create crud operations for the clients and also he can upload clients data with excel sheet.
* Trader can create orders from their product (each trader only can access the data added by them).
* Traders can send a scheduled notifications for new offers for their clients, which will be sent to their client at the end of the month.
* Traders can Update their product's quantity by excel sheet.
* Get reports that includes orders made throughout the day and the products with quantity = 0.

## Technologies :
* nodejs v16.17.0
* express v4.18.2
* mysql2 v3.2.0
* sequelize v6.29.3
* xlsx v0.18.5

## Setup:
* Make sure that you have installed NodeJS and you can install from https://nodejs.org/en/download/.
* Make sure that you have installed MySQL Community Server and you can install from https://dev.mysql.com/downloads/mysql/.
* Download or clone the project source code.
* Install all required npm packages by running npm install from the command line in the project root folder.
* Configure SMTP settings for email within the smtpOptions property in the config.json file in the project root folder. For testing you can create a free account at https://ethereal.email/ and copy the options below the title Nodemailer configuration.
* Start the app by running npm start from the command line in the project root folder.
* You can test all APIS from the Online store.postman_collection file just import using postman.
