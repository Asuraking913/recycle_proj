import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import uploader from '../../utils/uploader'
import handlePicture from '../../utils/pitureUploader'
import { handleSubmit } from '../../utils/pitureUploader'
import { useInterval, useTimeout } from 'react-use'

function Upload() {

    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [error, setError] = useState("")
    const [category, setCategory] = useState("")
    const [img, setImg] = useState("")
    const [imageData, setImageData] = useState("")
    const fileInput = useRef(null)

    const nameRef = useRef(null)
    const priceRef = useRef(null)
    const stockRef = useRef(null)
    const catRef = useRef(null)

    let data = {
        name : productName, 
        price : price, 
        stock : stock, 
        category : category, 
        img : imageData, 
        imgString: img,
        onImage: setImg,
        onImageData: setImageData,
        onError : setError, 
        onLoading : setLoading, 
        nameRef : nameRef, 
        priceRef: priceRef, 
        stockRef : stockRef, 
        catRef : catRef
    }


    useInterval(() => {
        setError("")
    }, 3000, [error])

  return (
    <section className='w-full h-[300px] mt-[1em] flex sm:flex-row flex-col  gap-[1em]'>

        {img == "" ? <form >
            <div onClick={(e) => handlePicture(e, fileInput)} className='w-[400px] h-[300px] rounded-[5px] cursor-pointer border-dashed border-[--black] border-[1.5px] flex items-center justify-center flex-col'>

                <input className='hidden' onChange={(e) => uploader(e, setImg, setImageData)} ref={fileInput} type="file" name="image" id="image" />
                <h2 className='poppins sm:text-xl'>Upload Image file</h2>
                <p className='text-[0.8rem] text-red-400 poppins'>Supported images are of type: jpeg, jpg, png</p>
                {error && <p className='poppins text-red-600 animate-pulse'>{error}</p>}

            </div>
        </form>

        :

        <div className='w-[400px] h-[300px] bg-[--] flex gap-[2px]  flex-col'>
            <img src={img} className='h-[240px] w-[400px] object-cover' alt="" />
            <button onClick={() => setImg("")} className='bg-[--black] rounded-[5px] text-[--nav] flex items-center justify-center w-full p-[10px] poppins gap-[1em] hover:scale-105 duration-[0.5s]'>Delete <FontAwesomeIcon icon={faTrash}/></button>
        </div>
        
        }
        <form onSubmit={(e) => handleSubmit(e, data)}  action="" className='w-full'>
            <div className='w-full  border-[1.5px] border-[--black] rounded-[5px]'>
                <ul className='flex flex-col gap-[2px]'>
                    <li>
                        <p className='w-full poppins p-[1.5px] bg-[--nav] pl-[10px] border-b-[1.5px] border-[--black] rounded-t-[4px]'>
                            <label className=' text-[0.85rem]' htmlFor="name">Product Name <span className='text-red-600'>*</span></label>
                            <input ref={nameRef} onChange={(e) => setProductName(e.target.value)} className='block w-full p-[4px] bg-transparent outline-none focus:pt-[10px] duration-[0.5s]' type="text" required maxLength={30} name="name" id="name" />
                        </p>
                    </li>   
                    <li>
                        <p className='w-full poppins p-[1.5px] bg-[--nav] pl-[10px]  border-b-[1.5px] border-[--black]'>
                            <label className=' text-[0.85rem]' htmlFor="price">Price<span className='text-red-600'>*</span></label>
                            <input ref={priceRef} onChange={(e) => setPrice(e.target.value)} className='block w-full p-[4px] bg-transparent outline-none focus:pt-[10px] duration-[0.5s]' type="number" min={0} required name="price" id="price" />
                        </p>
                    </li>
                    <li>
                        <p className='w-full poppins p-[1.5px] bg-[--nav] pl-[10px]  border-b-[1.5px] border-[--black]'>
                            <label className=' text-[0.85rem]' htmlFor="stock">Total stock available<span className='text-red-600'>*</span></label>
                            <input ref={stockRef} onChange={(e) => setStock(e.target.value)} className='block w-full p-[4px] bg-transparent outline-none focus:pt-[10px] duration-[0.5s]' type="number" required min={1} name="stock" id="stock" />
                        </p>
                    </li>
                    <li>
                        <p className='w-full poppins p-[1.5px] bg-[--nav] pl-[10px]  border-b-[1.5px] border-[--black]'>
                            <label className=' text-[0.85rem]' htmlFor="name">Food or Beverage<span className='text-red-600'>*</span></label>
                            {/* <input className='block w-full p-[4px] bg-transparent outline-none' type="text" name="name" id="name" /> */}
                            <select ref={catRef} required onChange={(e) => setCategory(e.target.value)} name="category" id="category" className='block w-full p-[4px] bg-transparent outline-none '>
                                <option value="" className=''>--select category</option>
                                <option value="Food">Food</option>
                                <option value="Beverage">Beverage</option>
                            </select>
                        </p>
                    </li>   
                </ul>
                <button type="submit" className='bg-[--black] hover:opacity-90 duration-[0.2s] text-[--nav] w-full p-[8px] poppins sm:text-xl'>{loading ? <FontAwesomeIcon className='sm:text-xl animate-spin' icon={faSpinner}/> : "Upload Product"}</button>
            </div>
        </form>
    </section>
  )
}

export default Upload