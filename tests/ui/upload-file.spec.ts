import { test, expect } from '@playwright/test';
import urls from '../../fixtures/urls.json'; // <-- import URLs here
import testData from '../../fixtures/testData.json'
import { UploadPage } from '../../pages/uploadPage';

test.describe('File Upload Page Tests', () => {
    let uploadPage: UploadPage
    let status: number
    test.beforeEach(async ({ page }) => {
        uploadPage = new UploadPage(page)
        await uploadPage.navigate(urls.uploadPageUrl)
    })

    Object.values(testData.files).forEach((filePath) => {
        test(`Verify that users can upload a file: ${filePath}`, async ({ page }) => {
            page.on('response', async (response) => {
                status = response.status();
            })
            await uploadPage.uploadFile(filePath)
            // Remove 'resources/' part
            const strippedFileName = filePath.replace('resources/', '');
            await uploadPage.assertFileUpload(strippedFileName, status)
        })
    })

    test('Verify the drag and drop functionality', async ({ page }) => {
        page.on('response', async (response) => {
            status = response.status();
        })
        const fileName = testData.files.PNG
        const strippedFileName = fileName.replace('resources/', '');
        await uploadPage.dragAndDropFile(fileName)
        await uploadPage.clickOnUploadButton()
        await uploadPage.assertFileUpload(strippedFileName, status)
    });

})
