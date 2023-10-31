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

  const onImageChange = (event) => {
    event.preventDefault()
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      let newImg = URL.createObjectURL(img)
      setAllImages([...allImages, newImg])
    }
  }

  return (

    <>
      <section className="max-w-7xl mx-auto my-10">
        <h1 className="border-b-4 border-black pb-2 mb-5 text-4xl font-bold">Gallery</h1>
        <div>
          <div className="">
            <div className="grid grid-cols-5 gap-5">
              {
                allImages.map((img, index) =>
                  <div
                    key={index}
                    className={`relative hover:brightness-50  hover:cursor-pointer  hover:bg-gray-400 ${index == 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}`}
                  >
                    <img
                      className="border-2 border-gray-400 rounded-xl w-full h-full object-cover"
                      src={img} alt="" />

                    <input className="absolute w-5 h-5 top-3 left-3" type="checkbox" name="" id="" />
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
