import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

function TestData() {

    const post = [
        {
            p : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium commodi perferendis sequi tempore delectus quasi, error beatae, ea quia officia, inventore tenetur facilis autem ex. Nobis consectetur vel sint odit?"
        },
        {
            p : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium commodi perferendis sequi tempore delectus quasi, error beatae, ea quia officia, inventore tenetur facilis autem ex. Nobis consectetur vel sint odit?"
        },
        {
            p : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium commodi perferendis sequi tempore delectus quasi, error beatae, ea quia officia, inventore tenetur facilis autem ex. Nobis consectetur vel sint odit?"
        },
        {
            p : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium commodi perferendis sequi tempore delectus quasi, error beatae, ea quia officia, inventore tenetur facilis autem ex. Nobis consectetur vel sint odit?"
        },
        {
            p : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium commodi perferendis sequi tempore delectus quasi, error beatae, ea quia officia, inventore tenetur facilis autem ex. Nobis consectetur vel sint odit?"
        }
    ]

    // const page = async (page) => {
    //     await new Promise((resolve) => setTimeout(resolve, 100)) 
    //         return post.slice((page -1) * 2, page * 2)
    // }   

    

    // useEffect(() => {
    //     const test = async () => {
    //         const responsee = await page(1)
    //         console.log(responsee)
    //     }
    //     console.log(test())
    // }, [])

    const page = () => {

        const { } = useInfiniteQuery()


    }

  return (
    <div className='h-screen flex items-center justify-center'>
        sdf
    </div>
  )
}

export default TestData