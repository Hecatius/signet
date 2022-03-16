import './Appli.scss';
import Accueil from './Accueil';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';

export default function Appli() {
  // État 'uttilisateur'
  const [utilisateur, setUtilisateur] = useState(null);

  return (
      utilisateur ?
        <div className="Appli">
            <Entete />
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
