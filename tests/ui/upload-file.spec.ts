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

    test('Verify that File Uploader page is rendered successfully', async ({ page }) => {
        await uploadPage.assertFileUploaderPage();
    })

    test('Verify that choose file selection is enabled', async ({ page }) => {
        await expect(page.locator('#file-upload')).toBeEnabled()
    })

    test('Verify that upload button is enabled', async ({ page }) => {
        await expect(page.locator('#file-submit')).toBeEnabled()
    })

    test('Verify that drag and drop area is enabled', async ({ page }) => {
        await expect(page.locator('#drag-drop-upload')).toBeEnabled()
    })

    test('Verify that error message displays when no file selected and upload button clicked', async ({ page }) => {
        page.on('response', async (response) => {
            status = response.status();
        })
        await uploadPage.clickOnUploadButton();
        await uploadPage.assertFileUpload('fileName', status) 
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
