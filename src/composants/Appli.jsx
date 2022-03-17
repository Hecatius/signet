import './Appli.scss';
import Accueil from './Accueil';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { observerEtatConnexion } from '../code/utilisateur-modele';

export default function Appli() {
  // État 'uttilisateur'
  const [utilisateur, setUtilisateur] = useState(null);

  //Surveiller l'état de la connexion Firebase Auth
  useEffect(() => observerEtatConnexion(setUtilisateur),[]);
  

  return (
      utilisateur ?
        <div className="Appli">
            <Entete utilisateur={utilisateur}/>
            <section className="contenu-principal">
              <ListeDossiers />
              <Fab size="large" className="ajoutRessource" color="primary" aria-label="Ajouter dossier">
                <AddIcon />
              </Fab>
            </section>
        </div>
    :
    <Accueil/>
  );
}
