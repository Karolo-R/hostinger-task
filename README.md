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
Try to **find** and prioritise 5 or more **bugs** (Desktop or Mobile versions);

**Report bugs** properly (choose the way of reporting by yourself);

---
## **BUG1**: Trying to manage website from old hosting page redirects to website builder

**Severity:** Low

**Prerequisites:**
User has created a website with website builder

**Steps to reproduce:**

1. Login to HPanel
2. Open Hosting page, if `https://hpanel.hostinger.com/hosting-v2` page is opened, click **Switch to previous page version** button
3. In the old hosting page click **Manage** button for your website

**Actual result:** Manage button navigates user to website builder `https://builder.hostinger.com/$(id)` instead of dashboard `https://hpanel.hostinger.com/websites/$(domain)/dashboard`

**Expected result:**
Clicking on Manage button should navigate you to websites dashboard `https://hpanel.hostinger.com/websites/$(domain)/dashboard`

---
## **BUG2**: Cookie banner is misaligned in preview mode

**Severity:** Low

**Prerequisites:**
User has created a website with website builder

**Steps to reproduce:**

1. Login to HPanel
2. Open website builder
3. Navigate to **Website Settings > General settings**
4. Open Cookie banner section and toggle **Enable cookie banner** to on
5. Open Preview (desktop) mode

**Actual result:** Cookie banner is almost invisible until you scroll to the very bottom of the page and `data-qa="builder-header-preview"` component hides.

**Expected result:**
Cookie banner should be fully visible even in preview mode

**Tested on:** MacOS Version 12.6.3 + Google Chrome Version 111.0.5563.146

---

## **BUG3**: Intercom help image is shown in invoice print mode

**Severity:** Medium

**Prerequisites:**
User has unpaid invoice

**Steps to reproduce:**

1. Login to HPanel, navigate to Billing page
2. Click on unpaid invoices and click on Print Invoice button

**Actual result:** Invoice is opened and print window is opened, even though the invoice easily fits in one page, there is second page with [help image](https://hpanel-main.hostinger.com/assets/img/intercom.2ac50c60.svg)

This bug is not reproducible every time, it depends on invoice page rendering, if it renders fully renders before print window opens, then the help button is in the first page, if it renders slowly, then it is in the second page.

**Expected result:**
My suggestion would be to remove help button completely from `/billing/view-invoice/$(id)` page, as it does not add any value here and introduces unwanted image in printed invoice

**Tested on:** MacOS Version 12.6.3 + Google Chrome Version 111.0.5563.146

---

## **BUG4**: Auto renewal is not working if payment method is changed

**Severity:** High

**Prerequisites:**
User has bought any plan and and auto renewal is on

**Steps to reproduce:**

Lets asume that credid card which was used to buy the plan is expired, and user adds new one

1. User navigates Billing -> Payment Method 
2. User adds new credit card as his payment method
3. Change existing plan expirity date to this moment in the database
4. Wait for backend to initiate auto renewal

**Actual result:** Payments system does not charge newly added credit card for auto renewal of expired plan, instead it tries to charge only old credit card which is expired

**Expected result:**
Payments system should try to charge firstly credit card which was used to buy the plan, if it receives error that card is expired, then try to charge another credit card from payment methods

--- 
## **BUG5**: Wordpress minor version update deletes data

**Severity:** Critical

**Prerequisites:**
User has deployed WordPress page and new minor update is out

**Steps to reproduce:**

1. Navigate to Hosting -> Website -> WordPress
2. Click Update wordpress
3. Wait for update to complete
4. Visit your updated WordPress website

**Actual result:** Website data is deleted

**Expected result:**
The data should not be wiped on minor wordpress updates



---
### **Identify** the 3 most critical **user flows** in product, write your insights and send the description.
1. New user registers and buys web hosting plan -> creates a new website -> uses website builder to edit a website -> publishes website to public
2. User Logs in -> Selects website to edit -> edits website -> publishes it
3. User buys Wordpress hosting plan -> installs wordpress -> edits its content and plugins -> publishes website

---

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

