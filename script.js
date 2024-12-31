import Cropper from 'cropperjs';
import Alpine from 'alpinejs';
import moment from 'moment';

window.Alpine = Alpine;
const dd = console.log;

Alpine.data('cropperData', () => ({
    // icons
    removeIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z"></path></svg>`,
    spinnerIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 0c-4.355 0-7.898 3.481-7.998 7.812 0.092-3.779 2.966-6.812 6.498-6.812 3.59 0 6.5 3.134 6.5 7 0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-4.418-3.582-8-8-8zM8 16c4.355 0 7.898-3.481 7.998-7.812-0.092 3.779-2.966 6.812-6.498 6.812-3.59 0-6.5-3.134-6.5-7 0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5c0 4.418 3.582 8 8 8z"></path></svg>`,
    boundingBoxIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2H5zm6 1v2h2v6h-2v2H5v-2H3V5h2V3h6zm1-2h3v3h-3V1zm3 11v3h-3v-3h3zM4 15H1v-3h3v3zM1 4V1h3v3H1z"></path></svg>`,
    computerIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 16H20V5H4V16ZM13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"></path></svg>`,
    linkIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"></path><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"></path></svg>`,
    trashIcon: `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" stroke-width="0" fill="currentColor"></path><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" stroke-width="0" fill="currentColor"></path></svg>`,
    uploadIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M222,152v56a14,14,0,0,1-14,14H48a14,14,0,0,1-14-14V152a6,6,0,0,1,12,0v56a2,2,0,0,0,2,2H208a2,2,0,0,0,2-2V152a6,6,0,0,1,12,0ZM92.24,84.24,122,54.49V152a6,6,0,0,0,12,0V54.49l29.76,29.75a6,6,0,0,0,8.48-8.48l-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,8.48,8.48Z"></path></svg>`,
    questionIcon:`<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"></path></svg>`,
    cropIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M144 48v272a48 48 0 0048 48h272"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 304V192a48 48 0 00-48-48H208m160 224v96M144 144H48"></path></svg>`,
    moonIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path></svg>`,
    sunIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path></svg>`,
    externalLinkIcon: `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`,
    codeIcon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"></path></svg>`,



    cropper: null,
    _hasImage: false,
    _inputImage: {
        status: 'idle',
        error: null,
        id: null,
    },
    detectObjects: {
        status: 'loading',
        objectsList: [],
        show: false,
    },
    workerModel: new Worker(new URL('./workerModel.js', import.meta.url), { type: 'module' }),
    workerIndexedDB: new Worker(new URL('./workerIndexedDB.js', import.meta.url), { type: 'module' }),
    _resizeTimer: null,
    uploadInfo: {
        status: 'idle',
        imgur: null,
        errorMessage: null,
    },
    recentImages: {
        status: 'loading',
        imagesList: [],
    },

    croppedData: {
        status: 'idle',
        modal: 'hidden',
        size: {width: 0, height: 0},
        croppedBlob: null,
    },
    theme: 'light',
    technologies: {
        show: false,
        activeIndex:null,
        header: {
            title: 'Technologies',
        },
        list: [{
            type: "header",
            title: "Technologies",
        },{
            name: 'Tensorflow',
            image: 'tensorflow.svg',
            url: 'https://www.tensorflow.org/',
            usedFor: 'has been used for object detection.',
        },{
            name: 'CropperJS',
            image: 'cropperjs.svg',
            url: 'https://fengyuanchen.github.io/cropperjs/',
            usedFor: 'has been used for cropping images.',
        },{
            name: 'Vite',
            image: 'vitejs.svg',
            url: 'https://vitejs.dev/',
            usedFor: 'has been used for bundling the app.',
        },{
            name: 'AlpineJS',
            image: 'alpinejs.svg',
            url: 'https://alpinejs.dev/',
            usedFor: 'has been used for the UI and logic of the app.',
        },{
            name: 'TailwindCSS',
            image: 'tailwindcss.svg',
            url: 'https://tailwindcss.com/',
            usedFor: 'has been used for styling the app.',
        },{
            name: 'Web Workers',
            image: 'webworker.svg',
            url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API',
            usedFor: 'has been used for running the object detection model in a separate thread.',
        },{
            name: 'IndexedDB',
            image: 'indexeddb.svg',
            url: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
            usedFor: 'has been used for storing the images in the browser locally.',
        }
    ]},
    init: function () {
        this.defaultUploadInfo = Object.assign({}, this.uploadInfo);

        this.workerIndexedDB.onmessage = this.handleWorkerIndexedDB.bind(this);
        // this.workerIndexedDB.postMessage({type:'ping'});
        this.workerIndexedDB.postMessage({
            type: 'getImages', offset: 0, limit: 500
        });

        this.workerModel.onmessage = this.handleWorkerModel.bind(this);
        // this.workerModel.postMessage({type:'ping'});
        this.$watch('_hasImage', (value) => {
            value && this.initCropper();
        });


        // start line dark mode and light mode
        this.$watch('theme', (newThemeValue) => {
            switch(newThemeValue) {
                case 'dark':
                    document.documentElement.classList.add('dark');
                    break;
                case 'light':
                    document.documentElement.classList.remove('dark');
                    break;
            }
            window.localStorage.setItem('theme', newThemeValue);
        });
        this.theme = window.localStorage.getItem('theme') ?? 'light';
        // end line dark mode and light mode


        let id = window.location.hash.match(/#id=(\d+)/)?.[1];
        if (id) {
            this.loadImageFromId(id);
        }

        window.addEventListener('popstate', (event) => {
            let id = window.location.hash.match(/#id=(\d+)/)?.[1];
            if (id) {
                this.removeImage();
                this.workerIndexedDB.postMessage({
                    type: 'getImage',
                    id: id,
                });
            } else {
                this.removeImage();
            }
        });

        document.addEventListener('paste',(e)=>{
            let file = e.clipboardData.files[0];
            if(file) {
                this.setImage(URL.createObjectURL(file));
            }
        });

        document.addEventListener('drop', (event) => {
            event.preventDefault();
            let files = event.dataTransfer.files;
            if (!files.length) return;
            this.setImage(URL.createObjectURL(files[0]));
        });

        document.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        // Add touch event listeners for mobile interactions
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), false);

        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && this.croppedData.modal === 'show') {
                this.croppedData.modal = 'hidden';
                return;
            }
            if (e.key === 'Escape' && this._hasImage === true) {
                this.removeImage(true);
                return;
            }
            if (e.key === 'Enter' && this._hasImage === true) {
                this.handleCropButton();
                return;
            }
        });


    },
    loadImageFromId: function (id) {
        this.workerIndexedDB.postMessage({
            type: 'getImage',
            id: id,
        });
    },
    onFileChange: function (event) {
        let files = event.target.files || event.dataTransfer.files;
        if (!files.length) return;
        this.setImage(URL.createObjectURL(files[0]));
        event.target.value = null;
    },
    handleRemoveImage: function (id) {
        this.workerIndexedDB.postMessage({
            type: 'removeImage',
            id: id,
        });
    },

    setImage: function (url, shouldUseProxy = false) {
        if (shouldUseProxy) {
            url = `https://corsnova.vercel.app/?url=${encodeURIComponent(url)}`;
        }
        this.$refs.imageRef.setAttribute('src', url);
        this.$refs.imageRef.onload = this.handleImageLoaded.bind(this);
        this.$refs.imageRef.onerror = this.handleImageError.bind(this);
        this._inputImage.status = 'loading';
        this._inputImage.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    },
    fetchImageFromPasteButton: function () {
        navigator.clipboard.readText().then((text) => {
            this.setImage(text, true);
        });
    },
    removeImage: function (pushHistory = false, options = {}) {
        if (pushHistory) {
            let url = new URL(window.location.href);
            url.hash = ``;
            window.history.pushState({}, '', url);
        }
        this.$refs.imageRef.removeAttribute('src');

        !options?.hasImageReset && (this._hasImage = false);

        this.detectObjects.status = 'loading';
        this.detectObjects.objectsList = [];
        this.uploadInfo.status = 'idle';
        this.uploadInfo.imgur = null;
        this.$refs.inputUrl.value = '';
        this._inputImage.status = 'idle';
        this._inputImage.id = null;

        this.workerIndexedDB.postMessage({
            type: 'getImages', offset: 0, limit: 500
        });

    },
    initCropper: async function () {

        await new Promise((resolve, reject) => {
            this.$refs.imageRef.onload = ()=>{
                setTimeout(()=>{
                    resolve();
                }, 100);
            };
            this.$refs.imageRef.onerror = ()=>{
                setTimeout(()=>{
                    reject();
                }, 100);
            }
        });
        
        if (this.cropper) {
            this.cropper.replace(this.$refs.imageRef.src);
            return;
        }
        this.cropper = new Cropper(this.$refs.imageRef, {
            zoomable: false,
            autoCropArea: 1,
            guides: false,
            center: true,
            minContainerWidth: this.$refs.imageRef.offsetWidth || window.innerWidth,
            minContainerHeight: document.getElementById('container-image-cropper')?.getBoundingClientRect()?.height,
            ready: () => {
                this.workerModel.postMessage({
                    type: 'detectObjects',
                    image: this.getImageData(),
                    imageId: this._inputImage.id,
                });
            }
        });
        window.addEventListener('resize', () => {
            clearTimeout(this._resizeTimer);
            this._resizeTimer = setTimeout(() => {
                this.cropper.reset();
            }, 1000);
        });
    },
    handleRemoveAllImages: function () {
        this.workerIndexedDB.postMessage({
            type: 'removeAllImages',
        });
        this.workerIndexedDB.postMessage({
            type: 'getImages', offset: 0, limit: 500
        });
    },
    handleImageError: function () {
        this._inputImage.status = 'error';
        this._inputImage.error = 'Image failed to load, please try again.';
    },
    handleImageLoaded: function () {
        if (this.$refs.imageRef.naturalWidth > 0) {
            this._hasImage = true;
            this._inputImage.status = 'idle';
        }
    },
    setSelectedBox: function (index) {
        let [x, y, width, height] = this.detectObjects.objectsList[index].bbox;
        this.cropper.setData({
            x: x,
            y: y,
            width: width,
            height: height
        });
    },

    handleCropButton: function () {
        this.croppedData.status = 'loading';
        this.cropper.getCroppedCanvas().toBlob((blob) => {
            this.croppedData.status = 'idle';
            this.$refs.croppedImage.setAttribute('src', URL.createObjectURL(blob));
            this.$refs.croppedImage.onload = () => {
                this.croppedData.modal = 'show';
                this.croppedData.size = {
                    width: this.$refs.croppedImage.naturalWidth,
                    height: this.$refs.croppedImage.naturalHeight,
                };
                this.croppedData.croppedBlob = blob;
            };
        });
    },
    handleCloseCropModal: function () {
        this.croppedData.modal = 'hidden';
        this.uploadInfo = Object.assign({}, this.defaultUploadInfo);
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
            if (!id) {
                // generate thumbnail blob
                let thumbnailCanvas = document.createElement('canvas');
                let thumbnailCtx = thumbnailCanvas.getContext('2d');
                let thumbnailSize = 100;
                let thumbnailScale = Math.min(thumbnailSize / canvas.width, thumbnailSize / canvas.height);
                thumbnailCanvas.width = canvas.width * thumbnailScale;
                thumbnailCanvas.height = canvas.height * thumbnailScale;
                thumbnailCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
                let thumbnailBlob = await new Promise(resolve => thumbnailCanvas.toBlob(resolve, 'image/jpeg', 0.8));
                this.workerIndexedDB.postMessage({
                    type: 'addImage',
                    dataBlob: blob,
                    dataBlobThumbnail: thumbnailBlob,
                    generatedID: await generateHashBlob(blob),
                });
            }
            canvas.remove();
        }, 'image/jpeg', 1);
        return imageData;
    },

    uploadImageImgur: function () {
        this.uploadInfo.status = 'loading';
        this.uploadInfo.imgur = '';
        
        const formData = new FormData();
        
        let newBlob = null;
        if(this.croppedData.croppedBlob.size > 1024 * 1024 * 5) {
            newBlob = new Blob([this.croppedData.croppedBlob], {type: 'image/gif'});
        }else{
            newBlob = this.croppedData.croppedBlob
        }
        console.log('newBlob', newBlob);
        console.log('newBlob size:', (newBlob.size / (1024 * 1024)).toFixed(2) + ' MB');
        formData.append('image', newBlob);
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
                this.uploadInfo.errorMessage = error.message;
            });
       
    },

    downloadCroppedImage: function () {
        const currentDate = new Date().toISOString().slice(0, 10);
        const currentTime = new Date().toLocaleTimeString().replace(/:/g, '-');
        const url = URL.createObjectURL(this.croppedData.croppedBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cropped-image-${currentDate} ${currentTime}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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
    },


    handleWorkerModel: function (e) {
        const { type } = e.data;
        switch (type) {
            case 'ping':
                console.log('---[!!  Worker MODEL Alive   !!]---', e.data);
                break;
            case 'detectObjects':
                if(this._inputImage.id !== e.data.imageId) {
                    console.log('ignore old detectObjects result');
                    break;
                }
                let { status } = e.data;
                this.detectObjects.status = status;
                this.detectObjects.objectsList = e?.data?.predictions ?? [];
                break;
            default:
                console.log('Unknown message type', type);
        }
    },


    handleWorkerIndexedDB: function (e) {
        const { type } = e.data;
        switch (type) {
            case 'ping':
                console.log('---[!!  Worker INDEXDB Alive   !!]---', e.data);
                break;
            case 'removedAllImages':
                // nothing 
                break;
            case 'addedImage':
                {
                    let url = new URL(window.location.href);
                    url.hash = `#id=${e.data.result}`;
                    window.history.pushState({}, '', url);
                }
                break;
            case 'removedImage':
                {
                    this.workerIndexedDB.postMessage({
                        type: 'getImages', offset: 0, limit: 500
                    });
                }
                break;
            case 'getImage':
                {
                    let url = new URL(window.location.href);
                    url.hash = `#id=${e.data.result.id}`;
                    window.history.pushState({}, '', url);
                }
                if (e.data.result) {
                    let { dataBlob } = e.data.result;
                    let url = URL.createObjectURL(dataBlob);
                    this.setImage(url, false);
                }
                break;
            case 'gotImages':
                this.recentImages.status = 'idle';
                let result = e?.data?.result ?? [];
                result.forEach((item) => {
                    item['create_at_moment'] = moment(new Date(item.created_at)).fromNow()
                });
                this.recentImages.imagesList = result;
                break;
            default:
                console.log('Unknown message type', type);
        }
    },

    // Add touch event handlers
    handleTouchStart: function (event) {
        // Handle touch start event
        if (event.touches.length === 1) {
            this.touchStartX = event.touches[0].clientX;
            this.touchStartY = event.touches[0].clientY;
        }
    },
    handleTouchMove: function (event) {
        // Handle touch move event
        if (event.touches.length === 1) {
            this.touchMoveX = event.touches[0].clientX;
            this.touchMoveY = event.touches[0].clientY;
        }
    },
    handleTouchEnd: function (event) {
        // Handle touch end event
        if (this.touchStartX && this.touchMoveX && this.touchStartY && this.touchMoveY) {
            const deltaX = this.touchMoveX - this.touchStartX;
            const deltaY = this.touchMoveY - this.touchStartY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    // Swipe right
                    this.navigateRecentImages('right');
                } else {
                    // Swipe left
                    this.navigateRecentImages('left');
                }
            } else {
                if (deltaY > 0) {
                    // Swipe down
                    this.adjustCropArea('down');
                } else {
                    // Swipe up
                    this.adjustCropArea('up');
                }
            }

            // Reset touch coordinates
            this.touchStartX = null;
            this.touchMoveX = null;
            this.touchStartY = null;
            this.touchMoveY = null;
        }
    },

    navigateRecentImages: function (direction) {
        const currentIndex = this.recentImages.imagesList.findIndex(image => image.id === this._inputImage.id);
        if (direction === 'right' && currentIndex < this.recentImages.imagesList.length - 1) {
            this.loadImageFromId(this.recentImages.imagesList[currentIndex + 1].id);
        } else if (direction === 'left' && currentIndex > 0) {
            this.loadImageFromId(this.recentImages.imagesList[currentIndex - 1].id);
        }
    },

    adjustCropArea: function (direction) {
        const cropBoxData = this.cropper.getCropBoxData();
        const step = 10; // Adjust the step value as needed

        if (direction === 'up') {
            cropBoxData.height -= step;
        } else if (direction === 'down') {
            cropBoxData.height += step;
        }

        this.cropper.setCropBoxData(cropBoxData);
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
