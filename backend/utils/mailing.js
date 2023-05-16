const transporter = require("../config/mailing");

const sendDemandToDriver = async (ride) => {
    const messageInfo = await transporter.sendMail({
        from: "COVOIT",
        to: ride.driverEmail,
        subject: "Demande de trajet",
        html: `
            <p><strong>${ride.requestAuthorName}</strong> souhaite participer au voyage de <strong>${ride.departure}</strong> à <strong>${ride.destination}</strong> le ${ride.formatedDate}.</p>
            <p>Pour accepter ou rejeter cette demande, rendez-vous dans la rubrique "Demandes de réservation" de <strong>votre espace personnel</strong> sur Covoit.fr.
        `,
    });

    return messageInfo;
};

module.exports = { sendDemandToDriver };
