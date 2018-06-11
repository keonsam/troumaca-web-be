import {Request, Response} from "express";
import {PhotoOrchestrator} from "./photo.orchestrator";

let orchestrator:PhotoOrchestrator = new PhotoOrchestrator();

export let getPhotoById = (req: Request, res: Response) => {
  orchestrator
    .getPhotoById(req.params.partyId, req.params.type)
    .subscribe(photo => {
      // let imageStr:string = photo ? photo.imageStr : "";
        if(photo) {
            res.status(200);
            res.send(JSON.stringify(photo));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let savePhoto = (req: Request, res: Response) => {
  orchestrator.savePhoto(req.params.partyId, req.params.type, req.body)
    .subscribe(photo => {
        if(photo) {
            res.status(201);
            res.send(JSON.stringify(photo));
        }else {
            res.status(204);
            res.send(JSON.stringify({message: 'Not Saved'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let updatePhoto = (req: Request, res: Response) => {
  orchestrator
    .updatePhoto(req.params.partyId, req.params.type, req.body)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'Not Updated'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
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

