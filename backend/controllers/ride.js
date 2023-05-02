const Ride = require("../models/Ride");

export const createRide = (req, res) => {
    const data = req.body;

    Ride.create(data)
        .then(() => res.status(201).json({ message: "Trajet créé." }))
        .catch((error) => {
            console.error(error);
            return res
                .status(400)
                .json({ message: "Impossible de créer le trajet." });
        });
};
