class storeIndexedDB{
    db = null;
    queueJobs = [];
    constructor(){
        this.init();
    }

    init(){
        let request = indexedDB.open('indexStorage', 2);
        request.onupgradeneeded = (event)=> {
            this.initIndexedDB('upgrade',event);
        };
        request.onsuccess = (event)=> {
            this.initIndexedDB('success',event);
        };
    }

    initIndexedDB(type,event){
        if(!['upgrade','success'].includes(type)){
            throw new Error('Invalid type',type);
        }
        if(type === 'upgrade'){
            this.db = event.target.result;
            if (this.db.objectStoreNames.contains('images')) {
                this.db.deleteObjectStore('images');
            }
            this.db.createObjectStore('images', { 
                keyPath: 'id', 
                autoIncrement: true,
            });
            // this.db.createIndex('generatedID', 'generatedID', { unique: true });
        }
        if(type === 'success'){
            this.db = event.target.result;
        }


        // console.log('this.db:',this.db);
     
        setTimeout(()=>{
            this._runQueueJobs();
        });
    }

    _runQueueJobs(){
        if(this.queueJobs.length > 0){
            const {type,args} = this.queueJobs.shift();
            this[type](...args);
            this._runQueueJobs();
        }
    }


    addImage(dataBlob,generatedID,dataBlobThumbnail,callback = ()=>{}){
        if(!this.db){
            // push this function and dataBlob to queueJobs
            this.queueJobs.push({
                type: 'addImage',
                args: [dataBlob,generatedID,dataBlobThumbnail,callback]
            });
            return;
        }

        let transaction = this.db.transaction(['images'], 'readwrite');
        transaction.oncomplete = function(event) {
            // console.log('transaction complete');
        };

        transaction.onerror = function(event) {
            console.log('transaction error');
            callback(null,'error');
        };
        let objectStore = transaction.objectStore('images');
        var found = false;
        var request = objectStore.openCursor();
        request.onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                if(cursor.generatedID === generatedID){
                    found = true;
                    console.log('found image with generatedID:',generatedID);
                    callback(cursor,'success');
                }
                cursor.continue();          
            }
        };


        if(!found){
            var request = objectStore.add({
                created_at: new Date(),
                dataBlob,
                generatedID,
                dataBlobThumbnail
            });
            request.onsuccess = function(event) {
                let {result} = event.target;
                callback(result,'success');
            }
        }


    }

    getImageId(getID,callback = ()=>{}){
        // console.log('getID:',getID);
        if(!this.db){
            this.queueJobs.push({
                type: 'getImageId',
                args: [getID,callback]
            });
            return;
        }
        let transaction = this.db.transaction(['images'], 'readonly');
        let objectStore = transaction.objectStore('images');
        let request = objectStore.get(parseInt(getID));
        
        request.onerror = function(event) {
          console.log('Error getting data: ' + event.target.errorCode);
        };
        
        request.onsuccess = function(event) {
          let data = event.target.result;
            //   console.log('found image with getID:',getID);
            //   console.log('data:',data);
          callback(data,'success');
        };

    }


    getImages(offset,limit,callback = ()=>{}){
        if(!this.db){
            this.queueJobs.push({
                type: 'getImages',
                args: [offset,limit,callback]
            });
            return;
        }
        let transaction = this.db.transaction(['images'], 'readonly');
        let objectStore = transaction.objectStore('images');
       
        let request = objectStore.openCursor(null, 'prev');
        let results = [];


        request.onerror = function(event) {
          console.log('Error getting data: ' + event.target.errorCode);
        };
        request.onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor && results.length < limit) {
                if (offset > 0) {
                    cursor.advance(offset);
                    offset = 0;
                } else {
                    results.push(cursor.value);
                    cursor.continue();
                }
            } else {
                callback(results,'success');
            }
        };

    }


    removeAllImages(callback = ()=>{}){
        if(!this.db){
            this.queueJobs.push({
                type: 'removeAllImages',
                args: [callback]
            });
            return;
        }
        let transaction = this.db.transaction(['images'], 'readwrite');
        let objectStore = transaction.objectStore('images');
        let request = objectStore.clear();
        request.onerror = function(event) {
          console.log('Error getting data: ' + event.target.errorCode);
        };
        request.onsuccess = function(event) {
          callback(null,'success');
        };
    }

}

const sIDB = new storeIndexedDB();


onmessage = function(event){
    //console.log('message received to workerIndexedDB.js',event);
    const {type}   = event?.data ?? {type:'none'};

    switch(type){
        case 'ping':
            console.log('---[Worker IndexedDB Alive]---');
            sIDB.getImages(0,4,(result,status)=>{
                postMessage({
                    type: 'ping',
                    result,
                    status,
                });
            });
        break;

        case 'removeAllImages':
            sIDB.removeAllImages((result,status)=>{
                postMessage({
                    type: 'removedAllImages',
                    result,
                    status,
                });
            });
        break;
        
        
        case 'getImages':
            const {offset,limit} = event?.data ?? {offset:0,limit:4};
            sIDB.getImages(offset,limit,(result,status)=>{
                postMessage({
                    type: 'gotImages',
                    result,
                    status,
                });
            });
        break;

        case 'addImage':
            const {dataBlob,generatedID,dataBlobThumbnail} = event?.data ?? {dataBlob:null,callback:()=>{}};
            sIDB.addImage(dataBlob,generatedID,dataBlobThumbnail,(result,status)=>{
                postMessage({
                    type: 'addedImage',
                    result,
                    status,
                });
            });
        break;
        case 'getImage':
            const {id} = event?.data ?? {id:null};
            // console.log('getImage id:',id);
            sIDB.getImageId(id,(result,status)=>{
                postMessage({
                    type: 'getImage',
                    result,
                    status,
                });
            });
        break;
        default:
            console.log('Unknown message type', type);
   }
   
}