const Boom = require('Boom');

require('seneca')()
    .client(9586)
    // .act("role:error,cmd:one", (err, res) => {
    //
    // })
    // .act("role:error,cmd:two", (err, res) => {
    //
    // })
    // .act("role:error,cmd:three", (err, res) => {
    //
    // })
    // .act("role:error,cmd:four", (err, res) => {
    //         console.log(Boom.isBoom(err))
    // })
    .act("role:error,cmd:five", (err, res) => {
        if (res.error) {
            const boom = Boom.boomify(new Error(res.message), {statusCode: res.code});
            console.log(boom);
        } else {

        }
    });
