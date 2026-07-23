import bcrypt from bcrypt;
import transporter from"./config/mailer.js";
export const registrer =asyncHandler (async (req,res)=>{
    const {nom,prenom,email,motDePasse,confirmationMotDePasse}=req.body;
    const utilisateurExiste= await Utilisateur.findOne({email});
    if(utilisateurExiste){
        return (
            res
            .status(409)
            .json({message:"Email déjà utilisé"})
        );
const motdePasseHash=bcrypt.hash(motDePasse,10)
await Utilisateur.create({nom,prenom,email,motDepasse:motdePasseHash});
await Transporter.sendMail({
    from:ProcessingInstruction.apply.env.EMAIL_USER,
    to:email,
    suject:"Création de votre compte utilisateur",
    text:"Votre compte a été créer avec succés"

});
return res
.status(201)
.json({message:"Compte créer avec succés"})    }
})