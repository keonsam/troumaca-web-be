import { Request, Response } from "express";
import { PhotoOrchestrator } from "./photo.orchestrator";

const orchestrator: PhotoOrchestrator = new PhotoOrchestrator();

export let getPhotos = (req: Request, res: Response) => {
    const type: string = "user";
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
    // Pay not too much attention to how this works
    // it might be better to separate user and organization image
    // take the best possible way for the service
    // I can change this around later
    console.log(req.file);
    console.log(req.files);
    console.log(req);
    console.log("working");
    const type: string = "user";
    // const image: string = req.file.path;
    const partyId: string = res.locals.partyId;
    res.setHeader("content-type", "multipart/form-data");
    res.send();
    // if (!image) {
    //     return res.status(400).send({
    //         message: "Image was not saved, please try again."
    //     });
    // }
    // orchestrator.savePhoto("user", undefined, partyId)
    //     .subscribe(photo => {
    //         res.status(201);
    //         res.send(JSON.stringify(photo));
    //     }, error => {
    //         res.status(500);
    //         res.send(JSON.stringify({message: "Error Occurred"}));
    //         console.log(error);
    //     });
};

export let updatePhoto = (req: Request, res: Response) => {
    // Pay not too much attention to how this works
    // it might be better to separate user and organization image
    // take the best possible way for the service
    // I can change this around later
    const type: string = "user";
    const image: string = req.file.path;
    const partyId: string = res.locals.partyId;
    res.setHeader("content-type", "multipart/form-data");
    if (!image) {
        return res.status(400).send({
            message: "Image was not updated, please try again."
        });
    }
    orchestrator
        .updatePhoto(partyId, type, image)
        .subscribe( photo => {
            if (photo) {
                res.status(200);
                res.send(JSON.stringify(photo));
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

