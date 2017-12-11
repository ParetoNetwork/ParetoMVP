'use strict';

const fetch = require('node-fetch');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const s3 = new AWS.S3();
module.exports.create = (event, context, callback) => {
    fetch(process.env.BLOCK_HEIGHT_URI)
        .then((response) => {
            if (response.ok) {
                return response;
            }
            return Promise.reject(new Error(
                `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
        })
        .then(response => response.buffer())
        .then(function(buffer) {
            var resp = JSON.parse(buffer.toString("utf-8"));
            resp.result = parseInt(resp.result);
            new Promise(function(resolve, reject) {
                s3.putObject({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: process.env.AWS_S3_CONFIG_FILE,
                    Body: JSON.stringify(resp),
                }, function(err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        })
        .then(v => callback(null, v), callback);
};