import {prisma} from "../lib/prisma.ts"






// create posts
export const createPosts = async(req,res)=>{
    try {

        const id = req.user.id
        const {title, content, image} = req.body

    if(!title || !content){
        return res.status(400).json({
            message: "please fill all feilds"
        })
    }


    const post = await prisma.posts.create({
           
        data:{
            title,
            content,
            image,
            authorId: +id
        }
    })

    res.status(201).json({
        message: "post created seccufully",
        post
    })


    } catch (error) {
        return res.status(500).json({
            message: "server errror"
        })
    }
}


export const getallposts = async(req,res)=>{
    try {
       
        const posts = await prisma.posts.findMany({
            include:{
                author: true,
                comments: true
            }
        })

        if(!posts){
            return res.status(404).json({
                message: "posts not found"
            })
        }


        res.status(200).json({
            message: "you have getted all post",
            posts
        })
        
    } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "server error"
            }) 
    }
}