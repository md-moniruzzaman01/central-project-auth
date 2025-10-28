import request from 'supertest';
import app from '../src/app';

describe('POST API CRUD', () => {
  let createdPostId: number;

  // Create
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ title: 'First Post', content: 'This is my first post' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('First Post');

    createdPostId = res.body.id;
  });

  // List
  it('should return a list of posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  // Get single post
  it('should return a single post by ID', async () => {
    const res = await request(app).get(`/posts/${createdPostId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdPostId);
  });

  // Update
  it('should update an existing post', async () => {
    const res = await request(app)
      .put(`/posts/${createdPostId}`)
      .send({ title: 'Updated Post', content: 'Updated content' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Post');
  });

  // Delete
  it('should delete a post by ID', async () => {
    const res = await request(app).delete(`/posts/${createdPostId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdPostId);

    // Verify it’s gone
    const check = await request(app).get(`/posts/${createdPostId}`);
    expect(check.statusCode).toBe(404);
  });
});
