
const validation = (values) => {
    let errors={};


    //========================== constat =========================================

    if (!values.A_imma ||!values.A_imma || !values.A_imma  ){
        errors.Car="selectionner une voiture!";
    }

    if (!values.B_adresse){
        errors.adresseAd="l'adresse est obligatoire";
    }


    if (!values.B_nom){
        errors.nomeAd="le nom est obligatoire";
    }else if(!/^[A-Za-z]+$/.test(values.B_nom)){
        errors.nomeAd="nom invalide";
    }

    if (!values.B_prenom){
        errors.prenomAd="le prenom est obligatoire";
    }else if(!/^[A-Za-z]+$/.test(values.B_prenom)){
        errors.prenomAd="prenom invalide";
    }

    if (!values.B_CarTyp){
        errors.CarTyp="le type de voiture est obligatoire";
    }


    if (!values.B_Carimma){
        errors.Carimma="le numero d'immatriculation de voiture est obligatoire";
    }
    // else if(values.Carimma.length < 3){
    //     errors.Carimma="name must be more than 3 caracters.";
    // }else if(!/^[A-Za-z]+$/.test(values.Carimma)){
    //     errors.Carimma="nom invalide";
    // }


    if (!values.B_CarMarqu){
        errors.CarMarqu="la marque de voiture est obligatoire";
    }



    if (!values.A_assure){
        errors.assure="ce champ est obligatoire";
    }


    if (!values.A_assurAgen){
        errors.assurAgen="ce champ est obligatoire";
    }else if(values.A_assurAgen.length < 3){
        errors.assurAgen="une agence valide SVP!";
    }

    if (!values.B_assure){
        errors.Adassure="ce champ est obligatoire";
    }


    if (!values.B_assurAgen){
        errors.AdassurAgen="ce champ est obligatoire";
    }else if(values.B_assurAgen.length < 3){
        errors.AdassurAgen="une agence valide SVP!";
    }



    //============================== LOgin + Signup ==============================================

    if (!values.adresse){
        errors.adresse="l'adresse est obligatoire";
    }

    if (!values.agence){
        errors.agence="ce champ est obligatoire";
    }else if(values.agence.length < 3){
        errors.agence="une agence valide SVP!";
    }


    if (!values.prenom){
        errors.prenom="prénom is required";
    }else if(values.prenom.length < 3){
        errors.prenom="prénom must be more than 3 caracters.";
    }else if(!/^[A-Za-z]+$/.test(values.prenom)){
        errors.prénom="prénom invalide";
    }


    
    if (!values.nom){
        errors.nom="prénom is required";
    }else if(values.nom.length < 3){
        errors.nom="prénom must be more than 3 caracters.";
    }else if(!/^[A-Za-z]+$/.test(values.nom)){
        errors.prénom="prénom invalide";
    }



    if (!values.email){
        errors.email="email is required";
    }else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="email is invalid.";
    }


    if (!values.password){
        errors.password="password is required";
    }else if (values.password.length < 8){
        errors.password="password must be more than 8 caracters.";
    }else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/.test(values.password))
    {
        errors.password="Password should  include at least 1 letter, 1 number and 1 special character(!@#$%^&*)"
    }

    
    if (!values.password2) {
        errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
        errors.password2 = 'Passwords do not match';
    }



    return errors;
};
export default validation;
    









