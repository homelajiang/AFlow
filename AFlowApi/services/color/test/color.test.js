const Seneca = require('seneca');


/*const Lab = require('lab');//the lab unit testing framework from the hapi project
const lab = exports.lab = Lab.script();
const { describe, it } = lab;
// Testing shortcuts
const { expect, fail } = require('code');*/

require('should');


describe('color', () => {
    it('to-hex', function (fin) {
        const seneca = test_seneca(fin);

        seneca.act({
            role: 'color',
            to: 'hex',
            color: 'red'
        }, function (ignore, result) {
            // expect(result.hex).to.equal('FF0000');
            result.hex.should.equal('FF0000');
            fin();
        })
    })
});


function test_seneca(fin) {
    return Seneca({log: 'test'})

    // activate unit test mode. Errors provide additional stack tracing context.
    // The fin callback is called when an error occurs anywhere.
    //     .test(fin, 'print')
        .test(fin)

        // Load the microservice business logic
        .use(require('../plugin/color'))
}
