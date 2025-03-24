const RendezVous = require('../models/Rendez_vous');
const DetailRendezVous = require('../models/Detail_rendez_vous');
const Client = require('../models/Client');

// client prendre rendez_vous
exports.createRendezVous = async (req, res) => {
    try {
        const { date_rdv, heure_rdv, clientId, garageId, longitude, latitude, message, prestations } = req.body;

        // rendez-voous 
        const rendezVous = new RendezVous({
            date_rdv,
            heure_rdv,
            clientId,
            garageId: garageId || null,
            longitude: garageId ? null : longitude, // si garage choisi, pas besoin de coordonnées
            latitude: garageId ? null : latitude,
            message: message || ''
        });
        await rendezVous.save();

        // les prestations choisies
        for (const prestationId of prestations) {
            const detail = new DetailRendezVous({
                rendez_vousId: rendezVous._id,
                prestationId
            });
            await detail.save();
        }

        return res.status(201).json({ message: 'Rendez-vous créé avec succès', rendezVousId: rendezVous._id });
    } catch (error) {
        console.error('Erreur lors de la création du rendez-vous:', error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};

// client rendez_vous
exports.getMesRendezVous = async (req, res) => {
    try {
        // Récupérer l'utilisateur connecté à partir du token JWT
        const utilisateurId = req.user.id;

        // Trouver l'ID du client associé à cet utilisateur
        const client = await Client.findOne({ utilisateurId });

        if (!client) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }

        // client rendez_vous
        const rendezVous = await RendezVous.find({ clientId: client._id })
            .populate('garageId')
            .populate({
                path: 'detailRendezVous',
                populate: { path: 'prestationId' }
            });

        return res.status(200).json({ rendezVous });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};

// liste des rendez-vous manager
exports.getAllRendezvous = async (req, res) => {
    try {
        const rendezvous = await Rendez_vous.find()
            .populate('clientId', 'nom prenom')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Tous les rendez-vous de l\'entreprise',
            data: rendezvous
        });

    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Validation par le manager
exports.validerRendezVous = async (req, res) => {
    const { rendezVousId, action } = req.body; // action peut être 'valider' ou 'refuser'

    try {
        const rendezVous = await RendezVous.findById(rendezVousId);

        if (!rendezVous) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
        if (rendezVous.status !== 'En attente de validation') {
            return res.status(400).json({ message: 'Le rendez-vous n\'est pas en attente de validation' });
        }

        // (valider ou refuser)
        if (action === 'valider') {
            rendezVous.status = 'Validé';
        } else if (action === 'refuser') {
            rendezVous.status = 'Refusé';
        } else {
            return res.status(400).json({ message: 'Action invalide' });
        }
        await rendezVous.save();

        return res.status(200).json({ message: `Rendez-vous ${rendezVous.status}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};