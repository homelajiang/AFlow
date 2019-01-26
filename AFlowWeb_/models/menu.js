var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MenuSchema = new Schema({
    id: {type: Number, require: true},
    title: {type: String, require: true},
    description: {type: String},
    icon: {type: String},
    update_date: {type: Date, require: true, default: Date.now()},
    status: {type: Number, require: true, default: 0},//<0 error 0 normal >0 stop
    status_record: [{type: Number, require: true, default: 0}],//0,1,2
    start_up: {type: Boolean, require: true, default: false},
    update_interval: String,
    uuid: {type: String, default: null},
    parent_id: {type: Schema.Types.ObjectId}
}, {
    versionKey: false
});

MenuSchema.virtual('model')
    .get(function () {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            icon: this.icon
        };
    });

MenuSchema.static({
    /**
     * 获取父菜单列表
     * @param cb
     */
    getParentMenus: function (cb) {
        Menu.find({parent_id: {$exists: false}})
            .sort({create_date: -1})
            .exec(cb);
    },
    getChildMenus: function (cb) {
        Menu.find({parent_id: {$exists: true}})
            .sort({create_date: -1})
            .exec(cb);
    }
});

var Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;