import { Request, Response } from "express";
import { PhotoOrchestrator } from "./photo.orchestrator";
import { HeaderNormalizer } from "../../header.normalizer";
import { Photo } from "../../data/photo/photo";

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

export let savePhotoUser = (req: Request, res: Response) => {
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };

    const photo = new Photo();
    photo.userImage = req.file.filename;
    photo.partyId = requestingPartyId;

    orchestrator.savePhoto(photo)
        .subscribe(photo => {
            res.status(201);
            res.send(JSON.stringify(photo));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let savePhotoOrganization = (req: Request, res: Response) => {
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };

    const photo = new Photo();
    photo.organizationImage = req.file.filename;
    photo.partyId = requestingPartyId;

    orchestrator.savePhoto(photo)
        .subscribe(photo => {
            res.status(201);
            res.send(JSON.stringify(photo));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let updatePhotoUser = (req: Request, res: Response) => {
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };

    const photo = new Photo();
    photo.userImage = req.file.filename;

    orchestrator
        .updatePhoto(photo, req.params.photoId)
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

export let updatePhotoOrganization = (req: Request, res: Response) => {
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };

    const photo = new Photo();
    photo.organizationImage = req.file.filename;


    orchestrator
        .updatePhoto(photo, req.params.photoId)
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
