import Router from 'koa-router'
import indexCtrl from '../controllers';

const router = Router()

router.get('/', indexCtrl);

export default router;