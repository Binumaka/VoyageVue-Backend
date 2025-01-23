const BucketList = require('../model/bucket-listModel'); 

const getBucketlist = async (req, res) => {
    try {
        const bucketList = await BucketList.find();
        res.status(200).json(bucketList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch BucketList' });
    }
};

const getBucketListById = async (req, res) => {
    try {
        const { id } = req.params;
        const bucketList = await BucketList.findById(id);
        if (!bucketList) {
            return res.status(404).json({ error: 'BucketList not found' });
        }
        res.status(200).json(bucketList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the BucketList' });
    }
};

const createBucketList = async (req, res) => {
    try {
        const newBucketList = new BucketList(req.body);
        const savedBucketList = await newBucketList.save();
        res.status(201).json(savedBucketList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the BucketList' });
    }
};

const deleteBucketList = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBucketList = await BucketList.findByIdAndDelete(id);
        if (!deletedBucketList) {
            return res.status(404).json({ error: 'BucketList not found' });
        }
        res.status(200).json({ message: 'BucketList deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the BucketList' });
    }
};

module.exports = {
    getBucketlist,
    getBucketListById,
    createBucketList,
    deleteBucketList
};