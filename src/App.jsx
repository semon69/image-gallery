import img1 from "/images/image-1.webp"
import img2 from "/images/image-2.webp"
import img3 from "/images/image-3.webp"
import img4 from "/images/image-4.webp"
import img5 from "/images/image-5.webp"
import img6 from "/images/image-6.webp"
import img7 from "/images/image-7.webp"
import img8 from "/images/image-8.webp"
import img9 from "/images/image-9.webp"
import img10 from "/images/image-10.jpeg"
import img11 from "/images/image-11.jpeg"
import { FcGallery } from 'react-icons/fc';
import "./App.css"
import { useRef, useState } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';
// ..
AOS.init();

function App() {

  const images = [img11, img2, img3, img4, img5, img6, img7, img8, img9, img10, img1]

  const [allImages, setAllImages] = useState(images)

  const imageRef = useRef()

  const [selectedImages, setSelectedImages] = useState([]);

  // The onImageChange function collect a single image in the form of URL that is selected and store it into existing array.
  const onImageChange = (event) => {
    event.preventDefault()
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      let newImg = URL.createObjectURL(img)
      setAllImages([...allImages, newImg])
    }
  }
  // The toggleImageSelection function carries all selected image in a state using their index.
  const toggleImageSelection = (index) => {
    const updatedSelectedImages = [...selectedImages];
    const currentIndex = updatedSelectedImages.indexOf(index);

    if (currentIndex === -1) {
      updatedSelectedImages.push(index);
    } else {
      updatedSelectedImages.splice(currentIndex, 1);
    }

    setSelectedImages(updatedSelectedImages);
  };

  // The deleteSelectedImages function filters out the selected images from the allImages array and updates the state with the filtered array.
  const deleteSelectedImages = () => {
    const updatedImages = allImages.filter((_, index) => !selectedImages.includes(index));
    setAllImages(updatedImages);
    setSelectedImages([]);
  };

  // Start dragging image and store the index of the image that is being dragged
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  // This function is triggered when a draggable element is being dragged over a valid drop target. This function is defined to call e.preventDefault() to allow the image to be dropped.
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // This function is triggered when a draggable element is dropped on a drop target. Set orders of images after drag and drop
  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const updatedImages = [...allImages];
    const [draggedImage] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(newIndex, 0, draggedImage);
    setAllImages(updatedImages);
  };

  return (

    <>
      <section className="p-5 mx-auto my-10 rounded shadow-2xl max-w-7xl bg-zinc-50">
        <h1 className="pb-3 mb-5 text-4xl font-bold border-b-4 border-black">Gallery</h1>

        {/* Show number of selected images and give an option to delete them */}
        <div className="flex justify-between my-3">
          {
            selectedImages.length ?
              <p className="text-xl font-bold"><input checked={true} className="w-5 h-5" type="checkbox" name="" id="" /> <span>{selectedImages.length}</span> Selected Photos</p>
              :
              ''
          }

          {
            selectedImages.length > 0 ?
              <p onClick={deleteSelectedImages} className="text-xl font-bold text-red-500 cursor-pointer">Delete Files</p>
              :
              ''
          }
        </div>

        <div>
          <div className="">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
              {
                allImages.map((img, index) =>

                  <div
                    key={index}
                    onClick={() => toggleImageSelection(index)}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    draggable
                    className={`relative showCheckbox ${index == 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
                    data-aos="fade-up"
                  >
                    {/* Implement a design for showing selected image */}
                    {
                      selectedImages.includes(index) &&
                      <div className="absolute inset-0 w-full h-full bg-blue-300 opacity-50 rounded-xl"> </div>
                    }

                    {/* Show images but for the first image, fixed width and height is now working */}
                    <img
                      className={`${index == 0 ? "" : "image"}  border-2 border-gray-400 rounded-xl w-full h-full object-cover hover:brightness-50 hover:bg-gray-300 hover:cursor-pointer transition-all`}
                      src={img} alt="" />

                    {/* Implement checkbox with multiple condition */}
                    <input
                      checked={selectedImages.includes(index)}
                      onChange={() => toggleImageSelection(index)}
                      className={`overlay absolute top-3 left-3 w-5 h-5 ${selectedImages.includes(index) ? "block" : 'hidden'}`}
                      type="checkbox" name="" id="" />




                  </div>

                )
              }

              {/* Image upload box that collect image using useRef */}
              <div
                data-aos="fade-up"
                onClick={() => imageRef.current.click()}
                className="flex flex-col items-center justify-center border-2 border-gray-400 rounded-xl uploadBox hover:cursor-pointer">
                <FcGallery className="text-4xl" />
                <p className="text-xl font-bold">Upload Image</p>
              </div>
            </div>

            {/* Image upload input file but it is hidden and value passes through useRef */}
            <div className='hidden'>
              <input type="file" name="myImage" id="" ref={imageRef} onChange={onImageChange} />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default App
