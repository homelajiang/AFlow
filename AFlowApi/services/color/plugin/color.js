module.exports = function color(options) {

    const hexmap = {
        red: 'FF0000',
        green: '00FF00',
        blue: '0000FF',
        black: '000000'
    };

    this.add('role:color,to:hex', function (msg, reply) {
        const hex = hexmap[msg.color] || hexmap.black;
        reply(null, {hex: hex})
    })
};
