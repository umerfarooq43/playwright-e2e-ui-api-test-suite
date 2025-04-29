import { APIRequestContext, expect } from '@playwright/test';
import urls from '../fixtures/urls.json';

export class PostsRoutes {
    readonly request: APIRequestContext;
    readonly baseUrl: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = urls.apiBaseUrl;
    }

    async getAllPosts() {
        return await this.request.get(`${this.baseUrl}/posts`);
    }

    async getPosts(id: number) {
        return await this.request.get(`${this.baseUrl}/posts/${id}`);
    }

    async createPosts(data: any) {
        return await this.request.post(`${this.baseUrl}/posts`, { data });
    }

    async updatePosts(id: number, data: any) {
        return await this.request.put(`${this.baseUrl}/posts/${id}`, { data });
    }

    async patchPosts(id: number, data: any) {
        return await this.request.patch(`${this.baseUrl}/posts/${id}`, { data });
    }

    async deletePosts(id: number) {
        return await this.request.delete(`${this.baseUrl}/posts/${id}`);
    }

    async assertResponseKeys(data) {
        for (const item of data) {
            expect(item).toHaveProperty('userId');
            expect(typeof item.userId).toBe('number');

            expect(item).toHaveProperty('id');
            expect(typeof item.id).toBe('number');

            expect(item).toHaveProperty('title');
            expect(typeof item.title).toBe('string');

            expect(item).toHaveProperty('body');
            expect(typeof item.body).toBe('string');
        }
    }
}
