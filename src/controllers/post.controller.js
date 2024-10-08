import prisma from "../DB/db.config.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    },
                    orderBy: {
                        id: "asc"
                    },
                }
            }
        });
        return res.json({ status: 200, data: posts, message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Server Error" });
    }
};


export const createPost = async (req, res) => {
    try {
        const { user_id, title, description } = req.body;
        if (!user_id || !title || !description) {
            return res.json({
                status: 404,
                message: "All Fields Are Required"
            })
        }
        const newPost = await prisma.post.create({
            data: {
                user_id,
                title,
                description,
            }
        })

        return res.json({
            status: 200,
            data: newPost,
            message: "Posts created successfully"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Server Error" });
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, description } = req.body;
    await prisma.post.update({
        where: {
            id: Number(postId),
        },
        data: {
            title,
            description
        }
    })

    return res.json({ status: 200, message: "user updated successfully" })
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const deletedPost = await prisma.post.delete({
        where: {
            id: Number(postId),
        }
    })

    return res.json({ status: 200, data: deletedPost, message: 'User deleted successfully' });
}
