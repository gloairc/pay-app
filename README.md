# mobile-wallet-app
A HTTP-based mobile wallet service where users can: 
1.	Check their balance
2.	Transfer money to another user
3.	Retrieve a summary of their transactions

### Tech used
1. MERN Stack: MongoDB, Express, ReactJS, Node.js
2. Bootstrap
3. react-bootstrap
4. axios
5. react-router-dom
6. JSON Web Token

### Assumptions & Design Consideration
- Designed with mobile interface in mind, has a @media query for smaller screens. In the browser, width is around 50%
- Each mobile phone only can have one account, hence mobile number has to be unique upon registration. I've made it a requirement for username to be unique since its easier for people to type in username compared to mobile number. But if it was a mobile app, design the app to have access into phone book, so can search by contact book name (e.g how PayNow works).
  - During sign up, axios call is sent (on blur) to check if username or mobile number already exist in the database and inform user if they are. 
- In order for users to not lose their filtered date range for the transaction history they chose after they navigate to see a specific transaction record, i stored the date range in the session storage. This date range is clear if user navigate back to home page or log out.
- Default date range for transaction history is one month from the current date. This minimize hassle for the user to have to input date range before they can see recent transaction.

### Steps to run application (locally without docker)
1. Open your computer's terminal. The following steps will be run on your terminal.
2. cd into the repository folder, ```npm install```
3. cd into the react-folder, ```npm install```
5. After both dependencies have been installed, at the main repository folder ```npm run start```
6. cd into the react-folder, ```npm run start```
7. A browser should pop up with the app running.

### Future Developments
1. Handle errors
2. Navbar, shift log out to the right
3. Filter function (send or receive)
4. Have a spinner while waiting for axios response to come back