import { Page, Locator, expect } from '@playwright/test';
import urls from '../fixtures/urls.json';

export class UploadPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly dragDropArea: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit');
    this.dragDropArea = page.locator('#drag-drop-upload');
  }

  async navigate(url: string) {
    try {
      await this.page.goto(url);
    } catch (error) {
      console.error(`Failed to navigate to URL: ${url}`);
      console.error(error);
      throw error; // Important: fail test
    }
  }

  async assertFileUploaderPage () {
    await Promise.all([
      expect(this.page.locator('h3')).toHaveText('File Uploader'),
      expect(this.page.getByText('Choose a file on your system and then click upload. Or, drag and drop a file into the area below.')).toBeVisible(),
      expect(this.page.getByText('Powered by Elemental Selenium')).toBeVisible()
    ])
  }

  async uploadFile(filePath: string) {
    try {
      await this.fileInput.setInputFiles(filePath);
      await this.uploadButton.click();
    } catch (error) {
      console.error(`Failed to upload a file: ${filePath}`);
      console.error(error);
      throw error; // Important: fail test
    }
  }

  async assertFileUpload(fileName: string, status: number) {
    try {
      if (status === 200) {
        await Promise.all([
          expect(this.page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible(),
          expect(this.page.getByText(fileName)).toBeVisible()
        ])
      } else {
        await expect(this.page.getByText('Internal Server Error')).toBeVisible()
      }
    } catch (error) {
      console.error(`Failed to assert the uploaded file: ${fileName} and status: ${status}`);
      console.error(error);
      throw error; // Important: fail test
    }
  }

  async dragAndDropFile(filePath: string) {
    const dataTransfer = await this.page.evaluateHandle(() => new DataTransfer());
    // Set the file to DataTransfer object
    await this.page.locator('input[type="file"]').nth(1).setInputFiles(filePath);

    // Drag and drop manually by dispatching events
    await this.page.dispatchEvent('div#drag-drop-upload', 'dragenter', { dataTransfer });
    await this.page.dispatchEvent('div#drag-drop-upload', 'dragover', { dataTransfer });
    await this.page.dispatchEvent('div#drag-drop-upload', 'drop', { dataTransfer });
  }

  async clickOnUploadButton() {
    await this.uploadButton.click();
  }

}