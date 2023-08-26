
import Cropper from 'cropperjs';
import Alpine from 'alpinejs';
window.Alpine = Alpine

Alpine.data('cropperData', () => ({
    // icons
    removeIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z"></path></svg>`,
    spinnerIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 0c-4.355 0-7.898 3.481-7.998 7.812 0.092-3.779 2.966-6.812 6.498-6.812 3.59 0 6.5 3.134 6.5 7 0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-4.418-3.582-8-8-8zM8 16c4.355 0 7.898-3.481 7.998-7.812-0.092 3.779-2.966 6.812-6.498 6.812-3.59 0-6.5-3.134-6.5-7 0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5c0 4.418 3.582 8 8 8z"></path></svg>`,
    boundingBoxIcon : `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2H5zm6 1v2h2v6h-2v2H5v-2H3V5h2V3h6zm1-2h3v3h-3V1zm3 11v3h-3v-3h3zM4 15H1v-3h3v3zM1 4V1h3v3H1z"></path></svg>`,
    computerIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 16H20V5H4V16ZM13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"></path></svg>`,
    linkIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"></path><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"></path></svg>`,

    cropper: null,
    _hasImage: false,
    _inputImage: {
        status: 'idle',
        error: null,
    },
    detectObjects: {
        status: 'loading',
        objectsList: [],
        show: false,
    },
    workerModel: new Worker(new URL('./workerModel.js', import.meta.url), {type: 'module'}),
    workerIndexedDB: new Worker(new URL('./workerIndexedDB.js', import.meta.url), {type: 'module'}),
    _resizeTimer: null,
    uploadInfo: {
        status: 'idle',
        imgur: null
    },
    init: function () {
        this.workerIndexedDB.onmessage = (e) => {
            const {type} = e.data;
            switch(type){
                case 'ping':
                    console.log('---[!!  Worker INDEXDB Alive   !!]---',e.data);
                break;
                case 'addedImage':
                    window.history.pushState({}, '', `#id=${e.data.result}`);
                break;
                case 'getImage':
                    if(e.data.result){
                        let {dataBlob} = e.data.result;
                        let url = URL.createObjectURL(dataBlob);
                        this.setImage(url,false);
                        this.$refs.imageRef.setAttribute('data-cached','true');
                    }
                break;
                default:
                    console.log('Unknown message type', type);
            }
        };
        // this.workerIndexedDB.postMessage({type:'ping'});

        this.workerModel.onmessage = (e) => {
            const {type} = e.data;
            switch(type){
                case 'ping':
                    console.log('---[!!  Worker MODEL Alive   !!]---',e.data);
                break;
                case 'detectObjects':
                    let {status} = e.data;
                    this.detectObjects.status = status;
                    this.detectObjects.objectsList = e?.data?.predictions ?? [];
                    this.detectObjects.show = true;
                break;
                default:
                    console.log('Unknown message type', type);
            }
        };
        // this.workerModel.postMessage({type:'ping'});
        this.$watch('_hasImage', (value) => {
            if (value) {
                this.initCropper();
            }
        });

        let id = window.location.hash.match(/#id=(\d+)/)?.[1];
        if(id){
            this.workerIndexedDB.postMessage({
                type: 'getImage',
                id: id,
            });
        }

        window.addEventListener('popstate', (event) => {
            let id = window.location.hash.match(/#id=(\d+)/)?.[1];
            if(id){
                this.removeImage();
                this.workerIndexedDB.postMessage({
                    type: 'getImage',
                    id: id,
                });
            }else{
                this.removeImage();
            }
        });
    },
    onFileChange: function (event) {
        let files = event.target.files || event.dataTransfer.files;
        if (!files.length) return;
        this.setImage(URL.createObjectURL(files[0]));
        event.target.value = null;
    },
    setImage: function (url,proxy = false) {
        if(proxy){
            url = `https://corsnova.vercel.app/?url=${encodeURIComponent(url)}`;
        }
        this.$refs.imageRef.setAttribute('src',url);
        this.$refs.imageRef.onload = this.handleImageLoaded.bind(this);
        this.$refs.imageRef.onerror = this.handleImageError.bind(this);
        this._inputImage.status = 'loading';
    },
    removeImage: function (pushHistory = false,options = {}) {
        pushHistory && window.history.pushState({}, '', `/`);
        this.$refs.imageRef.removeAttribute('src');
        
        
        !options?.hasImageReset && (this._hasImage = false);


        this.detectObjects.status = null;
        this.detectObjects.objectsList = [];
        this.uploadInfo.status = 'idle';
        this.uploadInfo.imgur = null;
        this.$refs.inputUrl.value = '';
        this._inputImage.status = 'idle';
    },
    initCropper: function () {
        if(this.cropper){
            this.cropper.replace(this.$refs.imageRef.src);
            return;
        }
        this.cropper = new Cropper(this.$refs.imageRef, {
            zoomable: false,
            autoCropArea: 1,
            guides: false,
            center: true,
            ready: () => {
                this.workerModel.postMessage({
                    type: 'detectObjects',
                    image: this.getImageData(),
                });
            }
        });
        window.addEventListener('resize',()=>{
            clearTimeout(this._resizeTimer);
            this._resizeTimer = setTimeout(() => {
                this.cropper.reset();
            }, 500);
        });
    },
    handleImageError: function (){
        this._inputImage.status = 'error';
        this._inputImage.error = 'Image failed to load, please try again.';
    },
    handleImageLoaded: function () {
        if(this.$refs.imageRef.naturalWidth > 0){
            this._hasImage = true;
            this._inputImage.status = 'idle';
        }
    },
    setSelectedBox: function (index) {
        let [x,y,width,height] = this.detectObjects.objectsList[index].bbox;
        this.cropper.setData({
            x: x,
            y: y,
            width: width,
            height: height
        });
    },
   
    handleCropButton: function (){
        
        this.cropper.getCroppedCanvas().toBlob((blob) => {
            this.removeImage();
            this.setImage(URL.createObjectURL(blob));
        });
    },
    getImageData: function () {
        let img = this.$refs.imageRef;
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
            // check if window.location.hash has id
            let id = window.location.hash.match(/#id=(\d+)/)?.[1];
            if(!id){
                this.workerIndexedDB.postMessage({
                    type: 'addImage',
                    dataBlob: blob,
                    generatedID: await generateHashBlob(blob),
                });
            }
            canvas.remove();
        }, 'image/jpeg', 1);
        return imageData;
    },
   
    uploadImageImgur:  function(){
        this.uploadInfo.status = 'loading';
        this.uploadInfo.imgur = '';
        this.cropper.getCroppedCanvas().toBlob((blob) => {
            const formData = new FormData();
            formData.append('image', blob, 'image.jpg');
            fetch('https://corsnova.vercel.app/?url=https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    'x-Authorization': `Client-ID 33f9077a32a9ea9`,
                },
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Image uploaded to Imgur:', data);
                this.uploadInfo.imgur = data.data.link;
                this.uploadInfo.status = 'idle';
            })
            .catch((error) => {
                console.error('Error uploading image to Imgur:', error);
                this.uploadInfo.status = 'idle';
                this.uploadInfo.imgur = '';
            });
        });
    },

    copyToClipboard: function (event) {
        if (event.ctrlKey) {
            window.open(event.target.innerHTML, '_blank');
            return;
        }

        navigator.clipboard.writeText(event.target.innerHTML);
        event.target.classList.add('data-copied');
        setTimeout(() => {
            event.target.classList.remove('data-copied');
        }, 3000);
    }

}))



async function generateHashBlob(blob) {
    const buffer = await blob.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}




Alpine.start();
