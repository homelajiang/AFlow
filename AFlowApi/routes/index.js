module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            request.yar.set('example', { key: 'value' });
            console.log(request.yar.id);
            return request.yar.get('example').key;
        }
    }
];
