# Hostinger QA practical task solutions

To run solutions of **Task 2**  you must have a working Node.js environment (at least version 18.16.0).

After cloning the repo please install project dependencies:
```
npm ci
```

Before running solution file, please install the Playwright browsers by running following command:
```
npx playwright install
```

## Task 1



## Task 2. Test scenario for automation:
* Visit our website hostinger.com 

* Initiate the purchase of any plan for 24 months.

* Ensure the proper validations are added.

### Solution
To run **Task 2** solution, execute this command:
```
npm run test:headed
```
You can run ```npm run test:ui```  to open Playwright in debug mode for further inspection and verification.

