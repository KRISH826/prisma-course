import prisma from "../DB/db.config.js";

export const getComments = async (req, res) => {
    try {
        const posts = await prisma.comment.findMany({
            include: {
                post: {
                    include: {
                        user: true
                    },
                }
            },
        });
        return res.json({ status: 200, data: posts, message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Server Error" });
    }
};

export const createComment = async (req, res) => {
    try {
        const { user_id, post_id, comment } = req.body;
        if (!user_id || !post_id || !comment) {
            return res.json({
                status: 404,
                message: "All Fields Are Required"
            })
        }
        // increase the comment
        await prisma.post.update({
            where: {
                id: Number(post_id),
            },
            data: {
                comment_count: {
                    increment: 1
                }
            }
        })
        const newComment = await prisma.comment.create({
            data: {
                user_id: Number(user_id),
                post_id: Number(post_id),
                comment,
            }
        })

        return res.json({
            status: 200,
            data: newComment,
            message: "Comment created successfully"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Server Error" });
    }
}

export const updateComment = async (req, res) => {
    const postId = req.params.id;
    const { comment } = req.body;
    await prisma.comment.update({
        where: {
            id: Number(postId),
        },
        data: {
            comment
        }
    })

    return res.json({ status: 200, message: "Comment updated successfully" })
}

export const deleteComment = async (req, res) => {
    const postId = req.params.id;
    await prisma.post.update({
        where: {
            id: Number(postId),
        },
        data: {
            comment_count: {
                decrement: 1
            }
        }
    })
    const deletedComment = await prisma.comment.delete({
        where: {
            id: Number(postId),
        }
    })

    return res.json({ status: 200, data: deletedComment, message: 'Comment deleted successfully' });
}