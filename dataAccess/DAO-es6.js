var MongoClient = require('mongodb').MongoClient;

class DAO{
    open(){
        console.log('CONNECTING');
        console.trace();
        console.log('-------------------------------------')
        let result = MongoClient.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/mongotest');

        //let result = MongoClient.connect();
        //let result = MongoClient.connect('mongodb://adam:rackis_password@olympia.modulusmongo.net:27017/puZ5iqab');
        //let result = MongoClient.connect('mongodb://root:niWina9naj@olympia.modulusmongo.net:27017/puZ5iqab?autoReconnect=true&connectTimeoutMS=60000');

        //handling error like this will keep the resulting promise in error state
        result.catch(err => {
            this.logError('Error connecting ' + err);
        });
        return result;
    }
    confirmSingleResult(res){
        let numInserted = +res.result.n;
        if (!numInserted) {
            throw 'Object not inserted';
        }
        if (numInserted > 1){
            throw 'Expected 1 object to be inserted.  Actual ' + numInserted;
        }
    }
    logError(err){
        console.log(err)
    }
    dispose(db){
        try {
            db.close();
        } catch(err){ } //maybe closed by error or something
    }
}

export default DAO;