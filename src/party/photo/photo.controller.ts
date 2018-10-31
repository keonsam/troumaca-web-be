import {Request, Response} from "express";
import {PhotoOrchestrator} from "./photo.orchestrator";

const orchestrator: PhotoOrchestrator = new PhotoOrchestrator();

export let getPhotos = (req: Request, res: Response) => {
  const sessionId = req.cookies["sessionId"];
  const type: string = req.params.type;
  orchestrator
    .getPhotos(sessionId, type)
    .subscribe(photo => {
      if (photo.partyId) {
        res.status(200);
        res.send(JSON.stringify(photo.toJson()));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.partyId}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let savePhoto = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Photo can not be empty"
    });
  }
  const sessionId = req.cookies["sessionId"];
  orchestrator.savePhoto(req.params.type, req.body, sessionId)
    .subscribe(photo => {
      res.status(201);
      res.send(JSON.stringify(photo));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let updatePhoto = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Photo can not be empty"
    });
  }
  orchestrator
    .updatePhoto(req.params.partyId, req.params.type, req.body)
    .subscribe(affected => {
      if (affected > 0) {
        res.status(200);
        res.send(JSON.stringify(affected));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.partyId}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

