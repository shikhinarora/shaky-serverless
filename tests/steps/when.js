'use strict';

const APP_ROOT = '../../';

const _ = require('lodash');

let we_invoke_get_index = function() {
    console.log('when' + '-----' + 'we invoke get index start');
    let handler = require(`${APP_ROOT}/functions/get-index`).handler;

    console.log('handler' + '-----' + handler);

    return new Promise((resolve, reject) => {
        console.log('when' + '-----' + 'new promise');
        let context = {};
        let callback = function(err, response) {
            console.log('callback' + '-----' + 'start');
            if (err) {
                console.log('promise' + '-----' + 'error');
                reject(err);
            } else {
                console.log('promise' + '-----' + 'response received');
                let contentType = _.get(response, 'headers.content-type', 'application/json');
                if (response.body && contentType === 'application/json') {
                    response.body = JSON.parse(response.data);
                }

                resolve(response);
                done()
            }
        };

        console.log('callback' + '-----' + callback);

        console.log('promise' + '-----' + 'before handler');

        handler({}, context, callback);

        console.log('promise' + '-----' + 'after handler');
    });
};

module.exports = {
    we_invoke_get_index
}