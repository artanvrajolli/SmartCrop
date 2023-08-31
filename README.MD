# SmartCrop

SmartCrop is a web application that uses Mobilenet to detect images and help users to crop images. It is built with Vite, Mobilenet, Tailwind CSS, Cropperjs and Alpine.js.



### Plans for the future ###
- [ ] Use IndexedDB to store mobileNet data
- [x] Use IndexedDB to store the crop data for each image
- [x] Use web workers to offload the heavy computation of image detection to a separate thread
- [x] Use a CORS proxy to fetch images from external websites
- [x] Add recent images section
- [x] Add thumbnails for recent images smaller size and faster loading
- [x] Add a button to clear recent images
- [x] Add a button to clear recent image for a specific image


## Demo
- [Website](https://artanvrajolli.github.io/SmartCrop/)

## Installation

To install SmartCrop, you need to have Node.js and npm installed on your machine. Then, run the following command:  
```npm install```

## Usage

To run SmartCrop, run the following command:  
```npm run dev```

## Build
To build SmartCrop, run the following command:  
```npm run build```  
```npm run preview```


This will create a `dist` folder with the production-ready files.

## Workers
SmartCrop uses web workers to offload the heavy computation of image detection to a separate thread. This improves the performance of the application and prevents it from freezing or becoming unresponsive.
## IndexedDB
SmartCrop uses IndexedDB to store the crop data for each image. This allows the user to come back to the application later and continue working on their images without losing their progress.

## Cors Proxy
SmartCrop uses a CORS proxy to fetch images from external websites. This is necessary because of the CORS policy that prevents websites from accessing resources on other domains. The CORS proxy can be found [Github](https://github.com/artanvrajolli/CorsNova) and it is hosted on vercel [Website](https://corsnova.vercel.app/).

## Credits

SmartCrop was created by Artan Vrajolli. It uses the following open-source libraries:
- [Vite](https://vitejs.dev/)
- [Mobilenet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)
- [Tailwind CSS](https://tailwindcss.com/)
- [Alpine.js](https://alpinejs.dev/)
- [Cropperjs](https://fengyuanchen.github.io/cropperjs/)

## License

SmartCrop is licensed under the [MIT License](LICENSE).



