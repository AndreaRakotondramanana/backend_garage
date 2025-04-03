const Detail_rendez_vous = require("../models/Detail_rendez_vous");
const Mecanicien_Travail = require("../models/Mecanicien_Travail");

exports.assignerTravail = async (req, res) => {
    try {
        const { mecanicienId, detail_rendez_vousId, date_heure } = req.body;

        // Vérifier si le mécanicien et le détail du rendez-vous existent
        const mecanicien = await Mecanicien.findById(mecanicienId);
        const detailRV = await Detail_rendez_vous.findById(detail_rendez_vousId);

        if (!mecanicien || !detailRV) {
            return res.status(404).json({ message: "Mécanicien ou Détail du rendez-vous introuvable" });
        }

        // Créer une nouvelle assignation
        const travail = new Mecanicien_Travail({
            mecanicienId,
            detail_rendez_vousId,
            date_heure,
            status: 'En attente' // Par défaut
        });

        await travail.save();

        res.status(201).json({ message: "Travail assigné avec succès", travail });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

