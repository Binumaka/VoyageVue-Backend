const express = require('express');
const {
    getBucketlist,
    getBucketListById,
    createBucketList,
    deleteBucketList
} = require('../controller/bucket-listController');

const router = express.Router();

router.get('/', getBucketlist);
router.get('/:id', getBucketListById);
router.post('/', createBucketList);
router.delete('/:id', deleteBucketList);

module.exports = router;