import { test } from '@playwright/test';
import { HostingerMainPage } from '../page-objects/HostingerMainPage';
import { cryptoRandomStringAsync } from 'crypto-random-string';


test.describe('Hostinger testing', () => {
    let hostingerPage: HostingerMainPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.hostinger.com/');
        hostingerPage = new HostingerMainPage(page);
    });

    test('Should initiate 24months plan purchace', async ({ page }) => {
        const uid = await cryptoRandomStringAsync({ length: 10 })
        const email = `Karolo-${uid}@mail.com`;
        await hostingerPage.clickAddToCartButton();
        await hostingerPage.selectHostingPeriod('24 months');
        await hostingerPage.clickSubmitPayment();
        await hostingerPage.expectEmailMandatory();
        await hostingerPage.createAccountEnterEmail(email);
        await hostingerPage.clickSubmitPayment();
        await hostingerPage.expectUserToBeRegistered(email);
        await hostingerPage.expectCardDetailsMandatory();
        await hostingerPage.fillCardDetails();
        await hostingerPage.clickSubmitPayment();
        await page.pause();
    });
});
