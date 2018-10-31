import { Request, Response } from "express";
import { PhotoOrchestrator } from "./photo.orchestrator";

const orchestrator: PhotoOrchestrator = new PhotoOrchestrator();

export let getPhotos = (req: Request, res: Response) => {
    const type: string = req.params.type;
    const partyId: string = res.locals.partyId;
    res.setHeader("content-type", "application/json");
    orchestrator.getPhotos(partyId, type)
    .subscribe(photo => {
        if (photo && photo.partyId) {
            res.status(200);
            res.send(JSON.stringify(photo));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Images Found For" + partyId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let savePhoto = (req: Request, res: Response) => {
    const type: string = req.params.type;
    const image: File = req.body.image;
    const partyId: string = res.locals.partyId;
    res.setHeader("content-type", "application/json");
    if (!image) {
        return res.status(400).send({
            message: "Image must exist."
        });
    }
    orchestrator.savePhoto(type, image, partyId)
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
    const type: string = req.params.type;
    const image: File = req.body;
    const partyId: string = res.locals.partyId;
    res.setHeader("content-type", "image/*");
    if (!image) {
        return res.status(400).send({
            message: "Image must exist."
        });
    }
    console.log(req.body);
    console.log(image);
    orchestrator
        .updatePhoto(partyId, type, image)
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

