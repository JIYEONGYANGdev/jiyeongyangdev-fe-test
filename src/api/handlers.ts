// 이 파일은 수정하지 마세요.

import { rest } from 'msw';

import { parseQueryString } from '../utilities';
import products from './data/products.json';

const API_HOST = 'https://api.sixshop.com';

const USER = {
  id: 'sixshop_001',
  name: '김식스'
};

export const handlers = [
  rest.post(`${API_HOST}/login`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoic2l4c2hvcF8wMDEifX0.2Tm3R1A8dcIZdg3bfVxgHN9f36Ubolb6k1CKxAiL3QE',
          user: USER,
        }
      }),
    );
  }),

  rest.get(`${API_HOST}/users/:userId`, (req, res, ctx) => {
    const { userId } = req.params;

    if (userId === USER.id) {
      return res(
        ctx.json({
          data: {
            user: USER,
          }
        }),
      )
    }

    return res(
      ctx.status(404),
      ctx.json({
        error: {
          message: 'User not found',
        }
      }),
    )
  }),

  rest.get(`${API_HOST}/products`, (req, res, ctx) => {
    const { page = 1, size = 10 } = parseQueryString(req.url.search);

    const start = (Number(page) - 1) * Number(size);
    const end = Number(page) * Number(size);
    const filteredProducts = products.slice(start, end);

    if (filteredProducts.length) {
      return res(
        ctx.json({
          data: {
            products: filteredProducts,
            totalCount: products.length,
          }
        }),
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        error: {
          message: 'Products not found',
        }
      }),
    );
  }),

  rest.get(`${API_HOST}/products/:id`, (req, res, ctx) => {
    const { id } = req.params;

    const index = Number(id) - 1;
    const product = products[index];

    if (product) {
      return res(
        ctx.json({
          data: {
            product: products[index],
          }
        }),
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        error: {
          message: 'Product not found',
        }
      }),
    );
  })
];
