import prisma from "../DB/db.config.js";

export const getUser = async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            posts: {
                select: {
                    title: true,
                    comment_count: true
                }
            }
        }
    });

    return res.json({ status: 200, data: users, message: "All users found" })
}

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const findUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    if (findUser) {
        return res.json({
            status: 400,
            message: "user already exists`"
        })
    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
    return res.json({ status: 200, data: newUser, message: 'User created', })
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { email, name, password } = req.body;
    await prisma.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            name,
            email,
            password
        }
    })

    return res.json({ status: 200, message: "user updated successfully" })
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(userId),
        }
    })

    return res.json({ status: 200, data: deletedUser, message: 'User deleted successfully' });
}