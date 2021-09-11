class DataCollection {
    constructor(model) {
        this.model = model;
    }

    get(_id) {
        if (_id) return this.model.findOne({ _id })
        return this.model.find({})
    }

    create(data) {
        let newRecord = new this.model(data);
        return newRecord.save();
    }

    update(_id, data) {
        return this.model.findByIdAndUpdate(_id, data);
    }

    delete(_id) {
        return this.model.findByIdAndDelete(_id);
    }

}

module.exports = DataCollection;