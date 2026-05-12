export const CheckUser = (req, res, next) => {
    const role = req.user?.role || req.user?.Role;

    if (!role) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (role !== "user") {
        return res.status(403).json({ message: "Forbidden" });
    }

    next();
}