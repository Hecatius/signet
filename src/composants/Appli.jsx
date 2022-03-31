import './Appli.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import AjoutDossier from './AjoutDossier';
import Accueil from './Accueil';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { observerEtatConnexion } from '../code/utilisateur-modele';
import * as dossierModele from '../code/dossier-modele';


export default function Appli() {
  // État 'utilisateur'
  const [utilisateur, setUtilisateur] = useState(null);

  // État des 'dossiers' de l'utilisateur connecté
  const [dossiers, setDossiers] = useState([]);

  // État du formulaire d'ajout de sossier
  const [ouvert,setOuvert] = useState(false);

  //Gérer l'ajout d'un dossier
  function gererAjoutDossier(titre,couverture,couleur){
    //Code Firestore..
    dossierModele.creer(utilisateur.uid, {
      titre, //titre:titre
      couverture, //couverture:couverture
      couleur //couleur:couleur

    }).then(
      doc => setDossiers([{id:doc.id, ...doc.data()}, ...dossiers])
    )
  }

  // Surveiller l'état de la connexion Firebase Auth
  useEffect(() => observerEtatConnexion(setUtilisateur),[]);
  return (
      utilisateur ?
        <div className="Appli">
            <Entete utilisateur={utilisateur} />
            <section className="contenu-principal">
              <ListeDossiers utilisateur={utilisateur} dossiers={dossiers} setDossiers={setDossiers}  />
              {/* Ajouter un composant FormDialog de MUI */}
              <AjoutDossier ouvert={ouvert} setOuvert={setOuvert} gererAjoutDossier={gererAjoutDossier}/>
              <Fab onClick={() => setOuvert(true)} size="large" className="ajoutRessource" color="primary" aria-label="Ajouter dossier">
                <AddIcon />
              </Fab>
            </section>
        </div>
      :
        <Accueil />
  
  );
}