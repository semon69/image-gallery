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
import img11 from "/images/image-10.jpeg"

function App() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11]

  return (
    <>
      <div className="grid grid-cols-5">
        {
          images.map(img => 
            <div key={img}>
              <img className="w-52" src={img} alt="" />
            </div>
            )
        }
      </div>
    </>
  )
}

export default App
