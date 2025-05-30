import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tag {
  'common.ALLTYPES_NAME': string;
  'common.ALLTYPES_DESCRIPTION': string;
  'servermain.TAG_ADDRESS': string;
}

@Injectable({
  providedIn: 'root'
})
export class AutomateService {

  private readUrl = '/iotgateway/read';
  private writeUrl = '/iotgateway/write';
  private getAllTagsUrl = '/config/v1/project/channels/Channel2/devices/device1/tags';

  constructor(private http: HttpClient) { }

  readTags(tags: { nom: string; adresse: string; channel: string; device: string }[]): Observable<{ readResults: { id: string; s: boolean; r: string; v: any; t: number }[] }> {
    // Construction des ids sous forme Channel.Device.nom
    const ids = tags.map(tag => `${tag.channel}.${tag.device}.${tag.nom}`);

    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('ids', id);
    });

    return this.http.get<{ readResults: { id: string; s: boolean; r: string; v: any; t: number }[] }>(this.readUrl, { params });
  }




  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.getAllTagsUrl, {
      headers: {
        Authorization: 'Basic ' + btoa('rochdi:123')
      }
    });
  }


  writeTags(tags: { nom: string; channel: string; device: string; valeur: any }[]): Observable<any> {
    const dataToWrite = tags.map(tag => ({
      id: `${tag.channel}.${tag.device}.${tag.nom}`,
      v: tag.valeur
    }));
    // Ajouter les headers avec l’authentification Basic
    const headers = {
      Authorization: 'Basic ' + btoa('rochdi:123'),  // même identifiants que pour getAllTags
      'Content-Type': 'application/json'
    };

    return this.http.post<{ writeResults: { id: string; s: boolean; r: string }[] }>(
      this.writeUrl,
      dataToWrite,
      { headers }
    );
  }
}
