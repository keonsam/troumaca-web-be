import {Request, Response} from "express";
import {PhotoOrchestrator} from "./photo.orchestrator";
import {Photo} from "./photo";

let orchestrator:PhotoOrchestrator = new PhotoOrchestrator();

export let getPhotoById = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let type: string = req.params.type;
  orchestrator
    .getPhotoById(partyId, type)
    .subscribe(photo => {
      let imageStr:string = photo ? photo.imageStr : "";
      let body = JSON.stringify(imageStr);
      res.send(body);
    });
};

export let savePhoto = (req: Request, res: Response) => {
  let partyId:string = req.params.partyId;
  let type: string = req.params.type;
  let photo:Photo = new Photo(partyId,req.body.imageStr);
  orchestrator.savePhoto(partyId, type, photo)
    .subscribe(photo => {
      // TODO: can change the front-end to receive the photo class
      let response: boolean = photo.imageStr ? true: false;
      res.send(JSON.stringify(response));
    }, error => {
      res.send(error);
      console.log(error);
    });
};

export let updatePhoto = (req: Request, res: Response) => {
  let partyId:string = req.params.partyId;
  let type: string = req.params.type;
  let photo:Photo = new Photo(partyId, req.body.imageStr);
  orchestrator
    .updatePhoto(partyId, type, photo)
    .subscribe(photo => {
      res.send(JSON.stringify(photo));
    });

};

// export let deletePhoto = (req: Request, res: Response) => {
//   let partyId = req.params.partyId;
//   orchestrator
//     .deletePhoto(partyId)
//     .subscribe(numRemoved => {
//       res.send(JSON.stringify(numRemoved));
//     });
// };

