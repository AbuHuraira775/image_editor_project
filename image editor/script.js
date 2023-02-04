const fileInput = document.querySelector('.file-input'),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".slider .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter "),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

let brightness =100, saturation = 100, inversion=0, grayscale=0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilter = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal} , ${flipVertical})`
    previewImg.style.filter = `brightness(${brightness}%)  saturate(${saturation}%)  invert(${inversion}%)  grayscale(${grayscale}%)`
}

const loadImage = () =>{
    let file = fileInput.files[0];//getiing user selected file
    if(!file) return;
    previewImg.src = URL.createObjectURL(file) //passing file as preview img
    previewImg.addEventListener("load",()=>{
        resetFilterBtn.click()
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option =>{
    option.addEventListener("click",()=>{
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add('active')
        filterName.innerText = option.innerText

        if(option.id === 'brightness'){
            filterSlider.max = '200'
            filterSlider.value = brightness
            filterValue.innerText = `${brightness}`
        }
        else if(option.id === 'saturation'){
            filterSlider.max = '200'
            filterSlider.value = saturation
            filterValue.innerText = `${saturation}`
        }
        else if(option.id === 'inversion'){
            filterSlider.max = '100'
            filterSlider.value = inversion
            filterValue.innerText = `${inversion}`
        }
        else {
            filterSlider.max = '100'
            filterSlider.value = grayscale
            filterValue.innerText = `${grayscale}`
        }
    })
})

const updateFilter = () =>{
    filterValue.innerText = `${filterSlider.value}%`
    const selectFilter = document.querySelector('.filter .active')

    if(selectFilter.id === 'brightness'){
        brightness = filterSlider.value
    }
    else if(selectFilter.id === 'saturation'){
        saturation = filterSlider.value
    }
    else if(selectFilter.id === 'inversion'){
        inversion = filterSlider.value
    }
    else if(selectFilter.id === 'grayscale'){
        grayscale = filterSlider.value
    }
    applyFilter()
}

rotateOptions.forEach(option =>{
    option.addEventListener("click",()=>{
        if(option.id === "left"){
            rotate -= 90
        }
        else if(option.id === "right"){
            rotate += 90
        }
        else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1? -1 : 1;
        }
        else {
            flipVertical = flipVertical === 1? -1 : 1;
        }
        applyFilter()
    })
})

const resetFilter =()=>{


     brightness =100; saturation = 100; inversion=0; grayscale=0;
     rotate = 0; flipHorizontal = 1; flipVertical =1;
     filterOptions[0].click()
     applyFilter()
    
}

const saveImage =()=>{
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d") //return drawing context on canva
    canvas.width = previewImg.naturalWidth//set imag width to canva
    canvas.height = previewImg.naturalHeight  //set image heigh to canva

    // applying user filter 
    ctx.filter =  `brightness(${brightness}%)  saturate(${saturation}%)  invert(${inversion}%)  grayscale(${grayscale}%)`
    ctx.translate(canvas.width/2, canvas.height/2) //translating canvas from center
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI /180)
    }
    ctx.scale(flipHorizontal,flipVertical) //flip hori and vertical
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height) 

    const link = document.createElement("a")
    link.download = "image.jpeg"
    link.href = canvas.toDataURL()
    link.click()
}

fileInput.addEventListener("change",loadImage)
filterSlider.addEventListener("input",updateFilter)
chooseImgBtn.addEventListener('click',()=> fileInput.click())
resetFilterBtn.addEventListener("click", resetFilter)
saveImgBtn.addEventListener("click", saveImage)
previewImg.addEventListener('click',()=> fileInput.click())
