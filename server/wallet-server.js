const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');
const uuid = require('uuidv4').default;
const app = new Koa();

let transactions = [
  {
    id: uuid(),
    name: 'first transaction',
    orientation: 'IN',
    amount: 485,
    currency: 'CZK',
    time: '14:56',
    date: new Date('2019-03-05').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'second transaction',
    orientation: 'OUT',
    amount: 48,
    currency: 'EUR',
    time: '09:06',
    date: new Date('2019-03-09').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'third transaction',
    orientation: 'IN',
    amount: 1345,
    currency: 'GBP',
    time: '20:34',
    date: new Date('2019-03-12').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'computer',
    orientation: 'OUT',
    amount: 66000,
    currency: 'CZK',
    time: '17:06',
    date: new Date('2019-04-09').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'FTE salary',
    orientation: 'IN',
    amount: 19000,
    currency: 'CZK',
    time: '09:55',
    date: new Date('2019-04-11').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'project abroad',
    orientation: 'IN',
    amount: 1200,
    currency: 'EUR',
    time: '23:33',
    date: new Date('2019-04-22').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'fish',
    orientation: 'OUT',
    amount: 450,
    currency: 'CZK',
    time: '09:06',
    date: new Date('2019-05-01').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'FTE salary',
    orientation: 'IN',
    amount: 19000,
    currency: 'CZK',
    time: '09:23',
    date: new Date('2019-05-11').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'project abroad',
    orientation: 'IN',
    amount: 1200,
    currency: 'EUR',
    time: '22:16',
    date: new Date('2019-05-22').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'rohlik',
    orientation: 'OUT',
    amount: 1239,
    currency: 'CZK',
    time: '12:06',
    date: new Date('2019-05-19').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'vecere',
    orientation: 'OUT',
    amount: 700,
    currency: 'CZK',
    time: '20:34',
    date: new Date('2019-05-28').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'FTE salary',
    orientation: 'IN',
    amount: 19000,
    currency: 'CZK',
    time: '09:48',
    date: new Date('2019-06-11').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'project abroad',
    orientation: 'IN',
    amount: 1200,
    currency: 'EUR',
    time: '22:10',
    date: new Date('2019-06-22').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'trip',
    orientation: 'OUT',
    amount: 350,
    currency: 'GB',
    time: '17:23',
    date: new Date('2019-06-25').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'fish and chips',
    orientation: 'OUT',
    amount: 23,
    currency: 'GB',
    time: '12:15',
    date: new Date('2019-06-26').toISOString().substr(0, 10)
  }
];

const router = new Router();
router.get('/transactions', async ctx => {
  ctx.body = transactions;
});
router.put('/transactions/:id', KoaBody(), async ctx => {
  const id = ctx.params.id;
  const updatedItem = JSON.parse(ctx.request.body);
  const index = transactions.findIndex(i => i.id === id);
  if (index === -1) {
    ctx.status = 404;
  } else {
    transactions[index] = updatedItem;
    ctx.body = updatedItem;
  }
});
router.post('/transactions', KoaBody(), async ctx => {
  const newItem = JSON.parse(ctx.request.body);
  newItem.id = uuid();
  transactions.push(newItem);
  ctx.body = newItem;
  ctx.status = 201;
});
router.delete('/transactions/:id', async ctx => {
  const id = ctx.params.id;
  transactions = [...transactions.filter(i => i.id !== id)];
  ctx.status = 202;
  ctx.body = {};
});

app.use(router.routes());

app.listen(4000);
