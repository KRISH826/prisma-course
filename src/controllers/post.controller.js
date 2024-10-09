import prisma from "../DB/db.config.js";

export const getPosts = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    if (page < 0) {
        page = 1
    }
    if (limit < 0 || limit > 100) {
        limit = 10
    }
    try {
        const posts = await prisma.post.findMany({
            skip: skip,
            take: limit,
            orderBy: {
                id: "asc"
            },
            where: {
                // title: {
                //     // startsWith: "Test"
                //     // endsWith: "2"
                //     equals: "Test 2"
                // }
                OR: [
                    {
                        title: {
                            startsWith: "Test"
                        }
                    },
                    {
                        title: {
                            endsWith: "Handbook"
                        }
                    }
                ]
            }
        });

        const totalposts = await prisma.post.count();
        const totalPages = Math.ceil(totalposts / limit);

        return res.json({ status: 200, data: posts, message: "Success", meta: {
            totalPages, currentPage: page, limit: limit,
        } });
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

export const searchPost = async (req, res) => {
    const query = req.query.q;

    const post = await prisma.post.findMany({
        where: {
            description: {
                search: query,
            }
        }
    })

    return res.json({ status: 200, data: post })
}
