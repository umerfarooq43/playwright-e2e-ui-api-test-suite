import { test, expect, request } from '@playwright/test';
import testData from '../../fixtures/testData.json'
import { PostsRoutes } from '../../api/postsEndpoints';

test.describe('API Tests for the /posts routes', () => {
    let postsEndpoints: PostsRoutes;

    test.beforeAll(async () => {
        const reqContext = await request.newContext();
        postsEndpoints = new PostsRoutes(reqContext);
    });

    test('GET /posts should return 100 posts', async () => {
        const response = await postsEndpoints.getAllPosts();
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBe(100)
        postsEndpoints.assertResponseKeys(data)
    });

      test('GET /posts/{id} will return the single post', async () => {
        const response = await postsEndpoints.getPosts(1);
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(data.id).toBe(1);
        // Assert it is an object
        expect(typeof data).toBe('object');
        expect(data).not.toBeNull();
        // Assert it has exactly the required keys
        expect(Object.keys(data).sort()).toEqual(['body', 'id', 'title', 'userId'].sort());;
      });

      test('GET /posts/{id} with invalid/wrong id will return the 404 response', async () => {
        const response = await postsEndpoints.getPosts(1.50);
        expect(response.status()).toBe(404);
        // Parse JSON
        const data = await response.json();
        // Assert that response is an empty object
        expect(data).toEqual({});
      });
    
      test('POST /posts create a new post', async () => {
        const response = await postsEndpoints.createPosts(testData.newPost);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.title).toBe(testData.newPost.title);
        expect(body.body).toBe(testData.newPost.body);
        expect(body.userId).toBe(testData.newPost.userId);
      });
    
      test('PUT /posts update post', async () => {
        const response = await postsEndpoints.updatePosts(1, testData.updatedPost);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.title).toBe(testData.updatedPost.title);
        expect(body.body).toBe(testData.updatedPost.body);
      });

      test('PUT /posts update post with not exist id', async () => {
        const response = await postsEndpoints.updatePosts(1.50, testData.updatedPost);
        if(response.status() === 200){
            expect(response.status()).toBe(404)
            const body = await response.json();
            expect(body).toEqual({});
        }else {
            expect(response.status() === 500)
        }
        
      });
    
      test('PATCH update post partially', async () => {
        const response = await postsEndpoints.patchPosts(1, { title: "patched title" });
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.title).toBe("patched title");
      });
    
      test('DELETE a /posts', async () => {
        const response = await postsEndpoints.deletePosts(1);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body).toEqual({});
      });
});