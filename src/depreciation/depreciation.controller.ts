import { Request, Response } from "express";
import { getNumericValueOrDefault } from "../number.util";
import { getStringValueOrDefault } from "../string.util";
import { DepreciationOrchestrator } from "./depreciation.orchestrator";

const orchestrator: DepreciationOrchestrator = new DepreciationOrchestrator();

export const getDepreciableAssets = (req: Request, res: Response) => {
    const searchStr: string =  req.query.q;
    const pageSize: number = req.query.pageSize;
    orchestrator.getDepreciableAssets(searchStr, pageSize)
        .subscribe( assets => {
            res.status(200);
            res.send(JSON.stringify(assets));
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export const getBookDepreciationArr = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator.getBookDepreciationArr(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export const getTaxDepreciationArr = (req: Request, res: Response) => {
    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");

    orchestrator.getTaxDepreciationArr(number, size, field, direction)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export const getDepreciationById = (req: Request, res: Response) => {
  orchestrator.getDepreciationById(req.params.depreciationId, req.params.type)
    .subscribe(depreciation => {
        if (depreciation) {
            res.status(200);
            res.send(JSON.stringify(depreciation));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.depreciationId}));
        }
    }, error => {
        res.status(500);
        res.send(error);
        console.log(error);
    });
};

export const saveDepreciation = (req: Request, res: Response) => {
    const depreciation = req.body.depreciation;
    const type = req.body.type;
    if (!depreciation) {
        return res.status(400).send({
            message: "Depreciation can not be empty"
        });
    }
    orchestrator.saveDepreciation(depreciation, type)
        .subscribe(depreciation => {
            res.status(201);
            res.send(JSON.stringify(depreciation));
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export const updateDepreciation = (req: Request, res: Response) => {
    const depreciation = req.body.depreciation;
    const type = req.body.type;

    if (!depreciation) {
        return res.status(400).send({
            message: "Depreciation content can not be empty"
        });
    }
    orchestrator.updateDepreciation(req.params.depreciationId, depreciation, type)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.depreciationId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export const deleteDepreciation = (req: Request, res: Response) => {
  orchestrator.deleteDepreciation(req.params.depreciationId, req.params.type)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.depreciationId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export const getDepreciationMethod = (req: Request, res: Response) => {
    const type = req.params.type;
    const system = req.params.system;
  orchestrator.getDepreciationMethod(type, system)
      .subscribe( methods => {
          res.status(200);
          res.send(JSON.stringify(methods));
      }, error => {
          res.status(500);
          res.send(JSON.stringify({message: "Error Occurred"}));
          console.log(error);
      });
};

export const getDepreciationSystems = (req: Request, res: Response) => {
    orchestrator.getDepreciationSystems()
        .subscribe( methods => {
            res.status(200);
            res.send(JSON.stringify(methods));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export const getPropertyClasses = (req: Request, res: Response) => {
    const system = req.params.system;
    orchestrator.getPropertyClasses(system)
        .subscribe( methods => {
            res.status(200);
            res.send(JSON.stringify(methods));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};


