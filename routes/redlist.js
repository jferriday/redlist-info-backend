require('dotenv').config();
const router = require('express').Router();

const TOKEN = process.env.REDLIST_TOKEN;

router.get('/:species', (req, res, next) => {
    
})