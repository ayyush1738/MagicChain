import express from 'express';
import { add_to_deck } from '../controllers/userstorage.controllers.js';
import { user } from '../controllers/userstorage.controllers.js';
import { cards } from '../controllers/userstorage.controllers.js';
import { mycards } from '../controllers/userstorage.controllers.js';
import { get_deck } from '../controllers/userstorage.controllers.js';
import { get_user } from '../controllers/userstorage.controllers.js';
import { update_coins } from '../controllers/userstorage.controllers.js';
import {updateprof} from '../controllers/userstorage.controllers.js'

const router = express.Router();

router.post('/addtodeck', add_to_deck);
router.post('/user', user);
router.post('/cards', cards);
router.post('/mycards', mycards);
router.post('/getdeck', get_deck);
router.post('/getuser', get_user);
router.post('/updatecoins', update_coins);
router.post('/updateprof', updateprof);

export default router;