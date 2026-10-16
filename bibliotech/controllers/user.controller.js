
import User from "../models/user.js";

export const getUsers = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 10, 50);

        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await User.countDocuments();

        res.json({
            ok: true,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data: users
        });
    } catch (error) {
        next(error);
    }
};

export const updateUserRole = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { returnDocument: "after", runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                ok: false, msg: "Usuario no encontrado"
            });
        }

        res.json({ ok: true, data: user });
    } catch (error) {
        next(error);
    }
};
