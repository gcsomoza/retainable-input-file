function RetainableInputFile(querySelector = '', options = {}) {
    const defaultOptions = {
        displayImage: true,
        defaultImage: '',
    };
    const self = this;

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[0],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {
            type: mime
        });
    }

    function initialize() {
        options = {...defaultOptions, ...options};

        window.addEventListener('load', function(e) {
            if (!querySelector) return;

            const retianableInputFiles = document.querySelectorAll(querySelector);
            for (let index = 0; index < retianableInputFiles.length; index++) {
                const retainableInputFile = retianableInputFiles[index];
                self.loadStoredFile(retainableInputFile);
            }
        });
    }
    
    self.clearStorage = function() {
        for (const key in localStorage) {
            if (Object.hasOwnProperty.call(localStorage, key)) {
                if (key.includes('_filename') || key.includes('_fileurl')) {
                    localStorage.removeItem(key);
                }
            }
        }
    }

    self.clearStoredFiles = function() {
        if (!querySelector) return;

        const retianableInputFiles = document.querySelectorAll(querySelector);
        for (let index = 0; index < retianableInputFiles.length; index++) {
            const retainableInputFile = retianableInputFiles[index];
            self.clearStoredFile(retainableInputFile);
        }
    }

    self.clearStoredFile = function(retainableInputFile) {
        if (retainableInputFile.getAttribute('type') !== 'file') return;

        const id = retainableInputFile.getAttribute('id');
        if (!id) return;

        window.localStorage.removeItem(`${id}_fileurl`);
        window.localStorage.removeItem(`${id}_filename`);
    }

    self.loadStoredFile = function(retainableInputFile) {
        if (retainableInputFile.getAttribute('type') !== 'file') return;

        const id = retainableInputFile.getAttribute('id');
        if (!id) return;

        self.displayDefaultImage(retainableInputFile);

        const filename = localStorage.getItem(`${id}_filename`);
        const fileurl = localStorage.getItem(`${id}_fileurl`);
        if (!filename || !fileurl) return;

        let file = dataURLtoFile(fileurl, filename)
        let list = new DataTransfer();
        list.items.add(file);
        retainableInputFile.files = list.files;

        if (options.displayImage) {
            self.displayImage(retainableInputFile);
        }
    }

    self.storeChangedFile = function(retainableInputFile) {
        if (retainableInputFile.getAttribute('type') !== 'file') return;

        if (retainableInputFile.files.length == 0) {
            self.clearStoredFile(retainableInputFile);
        }

        if (window.File && window.FileList && window.FileReader) {
            const reader = new FileReader();
    
            const id = retainableInputFile.getAttribute('id');
            if (id && retainableInputFile.files.length > 0) {
                const file = retainableInputFile.files[0];
                reader.readAsDataURL(file);
                reader.onload = function() {
                    window.localStorage.setItem(`${id}_fileurl`, reader.result);
                    window.localStorage.setItem(`${id}_filename`, file.name);
                };
            }
        }

        if (options.displayImage) {
            self.displayImage(retainableInputFile);
        }
    }

    self.displayImage = function(retainableInputFile) {
        if (retainableInputFile.getAttribute('type') !== 'file') return;

        if (!retainableInputFile.hasAttribute('data-target-img')) return;

        const image = document.querySelector(retainableInputFile.getAttribute('data-target-img'));
        if (!image) return;

        if (retainableInputFile.files.length > 0) {
            image.src = URL.createObjectURL(retainableInputFile.files[0]);
        }
    }

    self.displayDefaultImage = function(retainableInputFile) {
        try {
            if (retainableInputFile.getAttribute('type') !== 'file') return;

            if (!retainableInputFile.hasAttribute('data-target-img')) return;

            const image = document.querySelector(retainableInputFile.getAttribute('data-target-img'));
            if (!image) return;

            image.src = options.defaultImage;
        } catch (error) {
            console.error(error);
        }
    }

    initialize();
}