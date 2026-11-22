import {prisma} from "../lib/prisma.ts"


// create comment

export const createComment = async(req,res)=>{

    const id = req.user.id

    const {message, postId} = req.body 

    const comment = await prisma.comments.create({
        data:{
            message,
            postId,
            authorId: +id      
        }
    })

    res.status(201).json({
        message: "comment created seccufully",
        comment
    })

}




export const updateComment =  async(req,res)=>{

    const userId = req.user.id
    const {id} = req.params
    const {message} = req.body



    const comment =  await prisma.comments.findUnique({
        where:{
            id: +id
        }
    })


       if(userId !== comment.authorId){
        return res.status(403).json({
            message: "for biden you cant update this comment "
        })
    }

    const  updateComment =  await prisma.comments.update({
        where:{
            id: +id
        },

        data:{
            message,
        }
    })


 

    res.status(200).json({
        message: "comment updated",
        updateComment
    })
}


export const deleteComment = async(req,res)=>{
    const userId = req.user.id
    const {id} = req.params

  const comment = await prisma.comments.findUnique({
    where:{
        id: +id
    },
  })

  if(userId !== comment.authorId){
    return res.status(403).json({
        message: "for biden to delete this comment"
    })
  }

  const deletedComment = await prisma.comments.delete({
    where: {
        id: +id
    }
  })

  res.status(200).json({
    message: "comment deleted seccuefully"
  })
}
