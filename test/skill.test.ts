import { describe } from 'node:test';

import request from 'supertest';

import app from '../src/app';
import prisma from '../src/prisma';
import Router from '../src/routers/index';
import { responseCode } from '../src/utils/errorCode';

app.use('/api', Router);

/**
 *  新增測試 POST /api/coaches/skill
 */
describe('新增測試 POST /api/coaches/skill', () => {
  beforeAll(async () => {
    // 清空資料庫中的 skill 資料表
    await prisma.skill.deleteMany();
  });
  afterAll(async () => {
    // 關閉 Prisma 連接
    await prisma.$disconnect();
  });
  describe('新增測試 coaches/skill開始', () => {
    const testPackage = {
      name: 'Coding',
    };
    it('POST新增一筆資料', async () => {
      const res = await request(app).post('/api/coaches/skill').send(testPackage);
      console.log(res.statusCode);
      expect(res.statusCode).toBe(responseCode.CREATED);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toBe(testPackage.name);
    });
    it('POST新增一筆重複資料觸發409', async () => {
      const res = await request(app).post('/api/coaches/skill').send(testPackage);
      expect(res.statusCode).toEqual(responseCode.CONFLICT);
    });
  });

  describe('POST新增一筆資料觸發欄位異常400', () => {
    const testCases = [
      {
        payload: {},
        missingField: 'name',
      },
    ];

    test.each(testCases)('當缺少 $missingField 欄位時，回應 400', async ({ payload }) => {
      const res = await request(app).post('/api/coaches/skill').send(payload);
      expect(res.statusCode).toBe(responseCode.BAD_REQUEST);
      expect(res.body.status).toBe('failed');
      expect(res.body.message).toMatch(/.+為必填$/);
    });
  });
});

/**
 * 測試 GET /api/coaches/skill
 */
describe('GET /api/coaches/skill', () => {
  it('GET讀取清單', async () => {
    const res = await request(app).get('/api/coaches/skill');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

/**
 * 測試 GET /api/coaches/skill
 */
describe('DELETE /api/coaches/skill/:skillId', () => {
  it('刪除成功測試', async () => {
    // 假設你先建立一筆資料，或直接使用已存在的 id
    const resGetData = await request(app).get('/api/coaches/skill');
    console.log('resGetData.body', resGetData.body.data[0].id);
    if (resGetData.body.data.length > 0) {
      const skillId = resGetData.body.data[0].id;
      const res = await request(app).delete(`/api/coaches/skill/${skillId}`).expect(200);
      expect(res.body.status).toBe('success');
    }
  });

  it('指定的 credit package ID不存在時，應該回傳 400 與錯誤訊息', async () => {
    const nonExistingId = '00000000-0000-0000-0000-000000000000';
    const res = await request(app).delete(`/api/coaches/skill/${nonExistingId}`).expect(400);
    console.log(res.body);
    expect(res.body.status).toBe('failed');
    expect(res.body.message).toBe('ID錯誤,請輸入正確的格式');
  });
});
