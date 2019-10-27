const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');
const app = new Koa();

let transactions = [
  {
    id: 1,
    name: 'first transaction',
    orientation: 'IN',
    amount: 485,
    currency: 'CZK',
    time: '14:56',
    date: '11.03.2018'
  },
  {
    id: 2,
    name: 'second transaction',
    orientation: 'OUT',
    amount: 48,
    currency: 'EUR',
    time: '09:06',
    date: '15.03.2018'
  },
  {
    id: 3,
    name: 'third transaction',
    orientation: 'IN',
    amount: 7900679897,
    currency: 'GB',
    time: '20:34',
    date: '16.03.2018'
  }
];

const router = new Router();
router.get('/transactions', async ctx => {
  ctx.body = transactions;
});
router.put('/transactions/:id', KoaBody(), async ctx => {
  const id = +ctx.params.id;
  const updatedItem = ctx.request.body;
  const index = transactions.findIndex(i => i.id === id);
  if (index === -1) {
    ctx.status = 404;
  } else {
    transactions[index] = updatedItem;
    ctx.body = updatedItem;
  }
});
router.post('/transactions', KoaBody(), async ctx => {
  const newItem = ctx.request.body;
  newItem.id = Math.round(Math.random() * 10000 + 1);
  transactions.push(newItem);
  ctx.body = newItem;
  ctx.status = 201;
});
router.delete('/transactions/:id', async ctx => {
  const id = +ctx.params.id;
  transactions = [...transactions.filter(i => i.id !== id)];
  ctx.status = 202;
  ctx.body = {};
});

app.use(router.routes());

app.listen(4000);
