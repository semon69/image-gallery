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
import { useRef, useState } from "react"

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

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
      <section className="max-w-7xl mx-auto my-10 p-2">
        <h1 className="border-b-4 border-black pb-3 mb-5 text-4xl font-bold">Gallery</h1>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {
                allImages.map((img, index) =>
                  <div
                    key={index}
                    onClick={() => toggleImageSelection(index)}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    draggable
                    className={`relative hover:brightness-50  hover:bg-gray-400 ${index == 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
                  >
                    <img
                      className="border-2 border-gray-400 rounded-xl w-full h-full object-cover hover:cursor-pointer"
                      src={img} alt="" />

                    {
                      selectedImages.includes(index) &&
                      <input
                        checked={selectedImages.includes(index)}
                        onChange={() => toggleImageSelection(index)}
                        className="absolute w-5 h-5 top-3 left-3"
                        type="checkbox" name="" id="" />
                    }


                  </div>

                )
              }
              <div
                onClick={() => imageRef.current.click()}
                className="border-2 border-gray-400 rounded-xl flex flex-col justify-center items-center  hover:cursor-pointer">
                <FcGallery className="text-4xl" />
                <p className="font-bold text-xl">Upload Image</p>
              </div>
            </div>
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
