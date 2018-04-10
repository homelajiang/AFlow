module.exports = {
    base_url: 'http://localhost:8000/',
    image_hosting: {
        port: 5201,
        db_connection: "mongodb://localhost:27017/aflow"
    },
    blog: {
        port: 5202,
        db_connection: "mongodb://localhost:27017/aflow"
    },
    spider: {
        port: 5203,
        db_connection: "mongodb://localhost:27017/aflow"
    },
};