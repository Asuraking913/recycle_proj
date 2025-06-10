import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import uploader from '../../utils/uploader'
import handlePicture from '../../utils/pitureUploader'
import { handleSubmit } from '../../utils/pitureUploader'
import { useInterval, useTimeout } from 'react-use'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FaCheckCircle } from "react-icons/fa";

function Upload() {

    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("20")
    const [error, setError] = useState("")
    const [category, setCategory] = useState("")
    const [img, setImg] = useState("")
    const [imageData, setImageData] = useState("")
    const [descrip, setDescript] = useState("")
    const [weight, setWeight] = useState(0)
    const [success, setSuccess] = useState(false)
    const user_id = localStorage.getItem('user_id')
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
        weight : weight,
        descrip : descrip,
        onImage: setImg,
        onImageData: setImageData,
        onError : setError, 
        onLoading : setLoading, 
        success: success,
        onSuccess : setSuccess,
        nameRef : nameRef, 
        priceRef: priceRef, 
        stockRef : stockRef, 
        catRef : catRef, 
        id_ : user_id
    }


    useInterval(() => {
        setError("")
        setSuccess("")
    }, 5000, [error, success])

  return (
    <section className='w-full h-[300px] mt-[1em] flex sm:flex-row flex-col  gap-[1em]'>

        {

            error 

            &&


            <p className='fixed bg-[--nav] poppins flex items-center gap-[10px] text-[--black] top-0 right-0 m-[40px] p-[20px] rounded-[10px]'>
                
                <span className=''>
                    {error}
                </span>

                <FontAwesomeIcon icon={faTimesCircle} className='text-red-500 text-xl'/>
            </p>
        }

        {

            success

            &&


            <p className='fixed bg-[--nav] poppins flex items-center gap-[10px] text-[--black] top-0 right-0 m-[40px] p-[20px] rounded-[10px]'>
                
                <span className=''>
                    {success}
                </span>

                <FaCheckCircle className='text-green-500 text-xl' />
            </p>
        }


        {img == "" ? <form >
            <div onClick={(e) => handlePicture(e, fileInput)} className='w-[400px] h-[300px] rounded-[5px] cursor-pointer border-dashed border-[--nav] border-[1.5px] flex items-center justify-center flex-col'>

                <input className='hidden' onChange={(e) => uploader(e, setImg, setImageData)} ref={fileInput} type="file" name="image" id="image" />
                <h2 className='poppins sm:text-xl text-[--nav]'>Upload Image file</h2>
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
                            <label className=' text-[0.85rem]' htmlFor="stock">Weight<span className='text-red-600'>*</span></label>
                            <input ref={stockRef} onChange={(e) => setWeight(e.target.value)} className='block w-full p-[4px] bg-transparent outline-none focus:pt-[10px] duration-[0.5s]' type="number" required min={1} name="stock" id="stock" />
                        </p>
                    </li>
                    <li>
                        <p className='w-full poppins p-[1.5px] bg-[--nav] pl-[10px]  border-b-[1.5px] border-[--black]'>
                            <label className=' text-[0.85rem]' htmlFor="stock">Description<span className='text-red-600'>*</span></label>
                            <textarea ref={stockRef} onChange={(e) => setDescript(e.target.value)} className='block resize-none w-full p-[4px] bg-transparent outline-none focus:pt-[10px] duration-[0.5s]' type="number" required min={1} name="stock" id="stock" />
                        </p>
                    </li>
                      
                </ul>
                <button type="submit" className='hover:opacity-90 duration-[0.2s] text-[--nav] linear-grad shadow-sm shadow-white rounded-[5px] w-full p-[8px] poppins sm:text-xl'>{loading ? <FontAwesomeIcon className='sm:text-xl animate-spin' icon={faSpinner}/> : "Upload Product"}</button>
            </div>
        </form>
    </section>
  )
}

export default Upload