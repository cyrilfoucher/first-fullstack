import transporter from "../config/mailer.js";

export async function envoyerMailConfirmationCommande(email, prenom, commande) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation de commande",
    text: `Bonjour ${prenom}, Merci pour votre commande.

Votre commande a bien été enregistrée.

Numéro de commande : ${commande._id}
Montant total : ${commande.total.toFixed(2)} €

Nous vous informerons dès que votre commande sera expédiée.

L'équipe Autour du Monde`,
    html: `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
<div style="max-width:650px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;">

<div style="background:#92400e;color:#ffffff;padding:25px;text-align:center;">
<h2 style="margin:0;">🌍 Autour du Monde</h2>
</div>

<div style="padding:40px;">

<h1 style="margin-top:0;color:#92400e;text-align:center;">Commande confirmée</h1>

<p style="line-height:1.7;">
Bonjour <strong>${prenom}</strong>,<br><br>
Merci pour votre commande.<br>
Votre paiement a été confirmé avec succès et votre commande est désormais prise en charge par notre équipe.
</p>

<div style="margin-top:35px;border:1px solid #e5e7eb;border-radius:8px;padding:20px;background:#fafafa;">
<h3 style="margin-top:0;color:#92400e;">Récapitulatif de votre commande</h3>

<p><strong>Commande :</strong> ${commande._id}</p>
<p><strong>Date :</strong> ${new Date(commande.createdAt).toLocaleDateString("fr-FR")}</p>
</div>

<h3 style="margin-top:35px;color:#92400e;">Produits commandés</h3>

${commande.produits
  .map(
    (item) => `
<div style="display:flex;align-items:center;border:1px solid #e5e7eb;border-radius:8px;padding:15px;margin-bottom:15px;">
<img src="${item.image}" alt="${item.titre}" style="width:90px;height:90px;object-fit:cover;border-radius:6px;margin-right:20px;">
<div>
<h4 style="margin:0;">${item.titre}</h4>
<p style="margin:8px 0;">Quantité : ${item.quantite}</p>
<p style="margin:8px 0;">Prix unitaire : ${item.prix.toFixed(2)} €</p>
<p style="margin:8px 0 0 0;"><strong>Sous-total :</strong> ${(item.prix * item.quantite).toFixed(2)} €</p>
</div>
</div>
`,
  )
  .join("")}

<div style="background:#92400e;color:#ffffff;padding:18px;border-radius:8px;margin-top:25px;text-align:right;">
<span style="font-size:22px;font-weight:bold;">Total : ${commande.total.toFixed(2)} €</span>
</div>

<div style="text-align:center;margin-top:40px;">
<a href="${process.env.FRONTEND_URL}/mes-commandes" style="display:inline-block;background:#92400e;color:#ffffff;text-decoration:none;padding:16px 34px;border-radius:8px;font-size:17px;font-weight:bold;">Voir mes commandes</a>
</div>

<hr style="margin:40px 0;border:none;border-top:1px solid #e5e7eb;">

<p style="text-align:center;color:#6b7280;font-size:14px;">
Merci de votre confiance.<br><br>
<strong>Autour du Monde</strong><br>
Vos guides de voyage numériques
</p>

</div>

</div>
</body>
</html>`,
  });
}

export async function envoyerMailAnnulationCommande(email, prenom, commande) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation d'annulation de votre commande",
    text: `Bonjour ${prenom},

Votre commande a bien été annulée.

Numéro de commande : ${commande._id}
Montant du remboursement : ${commande.total.toFixed(2)} €

L'équipe Autour du Monde`,
    html: `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
<div style="max-width:650px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;">

<div style="background:#92400e;color:#ffffff;padding:25px;text-align:center;">
<h2 style="margin:0;">🌍 Autour du Monde</h2>
</div>

<div style="padding:40px;">

<h1 style="margin-top:0;color:#92400e;text-align:center;">Commande annulée</h1>

<p style="line-height:1.7;">
Bonjour <strong>${prenom}</strong>,<br><br>
Nous avons bien annulé votre commande.<br>
Votre paiement sera remboursé sur votre moyen de paiement initial,Le remboursement apparaîtra sur votre moyen de paiement selon les délais de traitement de votre banque.
</p>

<div style="margin-top:35px;border:1px solid #e5e7eb;border-radius:8px;padding:20px;background:#fafafa;">
<h3 style="margin-top:0;color:#92400e;">Récapitulatif de votre commande</h3>

<p><strong>Commande :</strong> ${commande._id}</p>
<p><strong>Date :</strong> ${new Date(commande.createdAt).toLocaleDateString("fr-FR")}</p>
</div>

<h3 style="margin-top:35px;color:#92400e;">Produits commandés</h3>

${commande.produits
  .map(
    (item) => `
<div style="display:flex;align-items:center;border:1px solid #e5e7eb;border-radius:8px;padding:15px;margin-bottom:15px;">
<img src="${item.image}" alt="${item.titre}" style="width:90px;height:90px;object-fit:cover;border-radius:6px;margin-right:20px;">
<div>
<h4 style="margin:0;">${item.titre}</h4>
<p style="margin:8px 0;">Quantité : ${item.quantite}</p>
<p style="margin:8px 0;">Prix unitaire : ${item.prix.toFixed(2)} €</p>
<p style="margin:8px 0 0 0;"><strong>Sous-total :</strong> ${(item.prix * item.quantite).toFixed(2)} €</p>
</div>
</div>
`,
  )
  .join("")}

<div style="background:#92400e;color:#ffffff;padding:18px;border-radius:8px;margin-top:25px;text-align:right;">
<span style="font-size:22px;font-weight:bold;">Montant remboursé : ${commande.total.toFixed(2)} €</span>
</div>

<div style="text-align:center;margin-top:40px;">
<a href="${process.env.FRONTEND_URL}/mes-commandes" style="display:inline-block;background:#92400e;color:#ffffff;text-decoration:none;padding:16px 34px;border-radius:8px;font-size:17px;font-weight:bold;">Voir mes commandes</a>
</div>

<hr style="margin:40px 0;border:none;border-top:1px solid #e5e7eb;">

<p style="text-align:center;color:#6b7280;font-size:14px;">
Nous espérons avoir le plaisir de vous accueillir à nouveau prochainement.<br><br>
<strong>Autour du Monde</strong><br>
Vos guides de voyage numériques
</p>

</div>

</div>
</body>
</html>`,
  });
}
