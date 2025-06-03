import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutomateService } from '../service/automate';
import Swal from 'sweetalert2';
 

@Component({
  selector: 'app-automate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './automate.html',
  styleUrls: ['./automate.scss']
})
export class Automate implements OnInit  {

  donnee = {
    nom: '',
    adresse: '',
    channel: 'Channel2',
    device: 'Device1',
    valeur: '',
  };

  donnees: any[] = [];
  

  constructor(private service: AutomateService ) { }


  ngOnInit(): void {
    // Chargement initial des tags
    this.service.getAllTags().subscribe({
      next: (tags) => {
        this.donnees = tags.map(tag => ({
          nom: tag['common.ALLTYPES_NAME'] || '-',
          adresse: tag['servermain.TAG_ADDRESS'] || '-',
          channel: 'Channel2',
          device: 'Device1',
          valeur: ''   
        }));

        this.service.readTags(this.donnees).subscribe({
          next: (resultat) => {
            resultat.readResults.forEach(res => {
              const nom = res.id.split('.').pop()!;
              const item = this.donnees.find(d => d.nom === nom);
              if (item) {
                item.valeur = res.v;
              }
            });
          },
          error: (err) => {
            console.error('Erreur lecture tags:', err);
          }
        });
      },
      error: (err) => {
        console.error('Erreur chargement tags:', err);
        this.donnees = [];
      }
    });

   
  }

  

  ajouterDonnee(): void {
    const valeurNumeric = parseFloat(this.donnee.valeur);

    const body = [
      {
        id: `${this.donnee.channel}.${this.donnee.device}.${this.donnee.nom}`,
        v: valeurNumeric
      }
    ];

    this.service.writeTags([this.donnee]).subscribe({
      next: (response) => {
        response.writeResults.forEach((res: { id: string; s: boolean; r: string }) => {
          console.log(`Tag ${res.id}: succès = ${res.s}, réponse = ${res.r}`);
          Swal.fire({
            icon: 'success',
            title: 'Mise à jour réussie',
            text: `La variable ${this.donnee.nom} a été mise à jour avec succès !`,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'La mise à jour a échoué.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Fermer'
        });
      }
    });
  }

}
