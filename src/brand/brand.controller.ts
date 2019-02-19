import {Request, Response} from "express";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";
import {BrandOrchestrator} from "./brand.orchestrator";

const brandOrchestrator: BrandOrchestrator = new BrandOrchestrator();

export let findBrands = (req: Request, res: Response) => {
    const searchStr: string = req.query.q;
    const pageSize: number = req.query.pageSize;

    brandOrchestrator.findBrands(searchStr, pageSize)
        .subscribe(brands => {
            res.status(200);
            res.send(JSON.stringify(brands));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getBrands = (req: Request, res: Response) => {
    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");

    brandOrchestrator.getBrands(number, size, field, direction)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getBrandById = (req: Request, res: Response) => {
    brandOrchestrator.getBrandById(req.params.brandId)
        .subscribe(brands => {
            if (brands) {
                const body = JSON.stringify(brands);
                res.status(200);
                res.send(body);
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.brandId}));
            }
        }, error => {
            res.status(500);
            res.send(error);
            console.log(error);
        });
};

export let saveBrand = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Brand must exist."
        });
    }
    brandOrchestrator.saveBrand(req.body)
        .subscribe(brands => {
            res.status(201);
            res.send(JSON.stringify(brands));
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let updateBrand = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Brand content can not be empty"
        });
    }
    brandOrchestrator.updateBrand(req.params.brandId, req.body)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.brandId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let deleteBrand = (req: Request, res: Response) => {
    brandOrchestrator.deleteBrand(req.params.brandId)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.brandId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};
