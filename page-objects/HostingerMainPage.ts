import { expect, Locator, Page } from '@playwright/test';
type period = '1 month' | '12 months' | '24 months' | '48 months';

export class HostingerMainPage {
    private readonly addToCartBusiness: Locator = this.page.getByTestId('hgr-homepage-pricing_table-add_to_cart-hosting_hostinger_business');
    private readonly periodSelector: Locator = this.page.locator('div#hcart-cart-period-selector');
    private readonly createEmailInput: Locator = this.page.locator('div#create-account').getByRole('textbox');
    private readonly createEmailParent: Locator = this.page.locator('.h-input')
    private readonly userEmail: Locator = this.page.locator('div#cart-user-wrapper')
    private readonly paymentForm: Locator = this.page.locator('form#payment-form');
    private readonly paymentCardName: Locator = this.paymentForm.locator('div').filter({ has: this.page.locator('input#cardholdername') });
    private readonly paymentCardNumber: Locator = this.paymentForm.locator('div').filter({ has: this.page.locator('[data-processout-input=cc-number]') });
    private readonly paymentCardExpirity: Locator = this.paymentForm.locator('div').filter({ has: this.page.locator('[data-processout-input=cc-exp]') });
    private readonly paymentCardCvc: Locator = this.paymentForm.locator('div').filter({ has: this.page.locator('[data-processout-input=cc-cvc]') });
    private readonly submitPayment: Locator = this.page.locator('button#hcart-submit-payment');
    private readonly loadingCircle: Locator = this.page.locator('.h-circular').first();


    constructor(private readonly page: Page) { }

    clickAddToCartButton = async () => {
        await this.addToCartBusiness.click();
    };

    selectHostingPeriod = async (query: period) => {
        const periodSelectorFiltered = this.periodSelector.filter({ hasText: query });

        await periodSelectorFiltered.waitFor({ state: 'visible' });
        await periodSelectorFiltered.click();
        await periodSelectorFiltered.filter({ has: this.page.locator('div.radio--active') }).waitFor({ state: 'visible' });
    };

    createAccountEnterEmail = async (email: string) => {
        await this.createEmailInput.type(email);
        console.info(email);
    };

    clickSubmitPayment = async () => {
        await this.submitPayment.click();
        await this.loadingCircle.waitFor({ state: 'hidden' });
    };

    expectEmailMandatory = async () => {
        const errorMessage = await this.createEmailParent.filter({ has: this.page.locator('p.h-input__error') });

        await expect(errorMessage).toBeVisible();
        await expect(await errorMessage.getByRole('paragraph').textContent()).toEqual('Enter your email to complete the purchase');
    };

    expectUserToBeRegistered = async (email: string) => {
        await expect(this.userEmail.getByText(email)).toBeVisible();
    };

    expectCardDetailsMandatory = async () => {
        const cardNameErrorMessage = await this.paymentCardName.locator('div.error-message').textContent();
        const cardNumberErrorMessage = await this.paymentCardNumber.locator('div.error-message').textContent();
        const cardExpirityErrorMessage = await this.paymentCardExpirity.locator('div.error-message').textContent();
        const cardCVCErrorMessage = await this.paymentCardCvc.locator('div.error-message').textContent();

        await expect(cardNameErrorMessage).toEqual('Name on card field is required');
        await expect(cardNumberErrorMessage).toEqual('The card number is invalid.');
        await expect(cardExpirityErrorMessage).toEqual('The card expiry month is invalid.');
        await expect(cardCVCErrorMessage).toEqual('The card CVC is required.');
    };

    fillCardDetails = async () => {
        const cardNameInput = await this.paymentCardName.getByRole('textbox');
        const cardNumberInput = await this.paymentCardNumber.frameLocator('iframe').locator('input');
        const cardExpirityInput = await this.paymentCardExpirity.frameLocator('iframe').locator('input');
        const cardCVCInput = await this.paymentCardCvc.frameLocator('iframe').locator('input');

        await cardNameInput.type('Micky Ribeiro');
        await cardNumberInput.type('4255383481785669');
        await cardExpirityInput.type('0227');
        await cardCVCInput.type('887');
    };
}
