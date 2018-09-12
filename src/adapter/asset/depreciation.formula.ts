import { Depreciation } from "../../data/asset/depreciation";

export class DepreciationFormula {

    roundValue(value: number): number {
        return Math.round(value * 100) / 100;
    }

    doubleDeclining(cost: number, usefulLife: number, times?: number): number {
        let bookValue = cost;
        // const currentDate = new Date();
        // const incDate: Date = purchaseDate;
        const depRate = (1 / usefulLife) * 2;
        const currentDep = this.roundValue(bookValue * depRate);
        bookValue = this.roundValue(bookValue - currentDep);
        times--;
        if (times < 1) {
            return currentDep;
        } else {
            return this.doubleDeclining(bookValue, usefulLife, times);
        }
    }

    getDoubleDeclining(cost: number, usefulLife: number, purchaseDate: Date, currentDepYear?: number) {
        if (!currentDepYear) {
            const currentDate = new Date();
            let times = 1;
            const incDate: Date = purchaseDate;
            incDate.setFullYear(incDate.getFullYear() + 1);
            while (times < usefulLife && currentDate > incDate) {
                times++;
                incDate.setFullYear(incDate.getFullYear() + 1);
            }
            return this.doubleDeclining(cost, usefulLife, times);
        } else {
            let bookValue = cost;
            let cumulativeDep = 0;
            for (let i = 0; i < currentDepYear; i++) {
                cumulativeDep = this.roundValue(cumulativeDep + this.doubleDeclining(bookValue, usefulLife, 1));
                bookValue = this.roundValue(cost - cumulativeDep);
            }
            return cumulativeDep;
        }
    }

    unitOfProduction(cost: number, salvageVal: number, unitProduced: number, totalUnits: number) {
        const baseDep = this.roundValue(cost - salvageVal);
        const baseRate = this.roundValue(baseDep / totalUnits);
        return this.roundValue(baseRate * unitProduced);
    }

    getCumulativeUnitOfProd(cost: number, salvageVal: number, unitProduced: number[], totalUnits: number) {
        let cumulative = 0;
        for (let i = 0; i < unitProduced.length; i++) {
            cumulative = this.roundValue(cumulative + this.unitOfProduction(cost, salvageVal, unitProduced[i], totalUnits));
        }
        return cumulative;
    }

    findRemainingYears(usefulLife: number, purchaseDate: Date) {
        const incDate = purchaseDate;
        incDate.setFullYear( incDate.getFullYear() + 1);
        const currentDate = new Date();
        let remainingLife = usefulLife;
        while (currentDate > incDate && remainingLife > 1) {
            remainingLife--;
            incDate.setFullYear( incDate.getFullYear() + 1);
        }
        return remainingLife;
    }

    sumOfYears(cost: number, salvageVal: number, usefulLife: number, purchaseDate: Date, currentDepYear?: number) {
        const baseDep = this.roundValue(cost - salvageVal);
        const remainingYears = this.findRemainingYears(usefulLife, purchaseDate);
        const sumOfYears = (usefulLife * (usefulLife + 1)) / 2;
        if (currentDepYear) {
            let cumulativeDep = 0;
            for ( let i = 0; i < currentDepYear; i++) {
                const reYears = usefulLife - i;
                const dep = this.roundValue(baseDep * (reYears / sumOfYears));
                cumulativeDep = this.roundValue(cumulativeDep + dep);
            }
            return cumulativeDep;
        }
        return this.roundValue(baseDep * (remainingYears / sumOfYears));
    }

    getCurrentDepreciation(depreciation: Depreciation) {
        const cost: number = parseFloat(depreciation.cost);
        const salvageVal: number = parseFloat(depreciation.salvageVal);
        const usefulLife: number = parseFloat(depreciation.usefulLife);
        const unitProduced: number[] = depreciation.unitProduced.map( x => parseFloat(x));
        const totalUnits: number = parseFloat(depreciation.totalUnits);
        const purchaseDate: Date = new Date(depreciation.purchaseDate);
        let currentDep = 0;
        switch (depreciation.methodId) {
            case "457b0ac1-b68b-4cbe-a341-b2a9e0c70c3e":
                currentDep = this.roundValue((cost - salvageVal) / usefulLife);
                break;
            case "05da85af-337b-4d09-8a34-d0849f52d0d8":
                currentDep = this.getDoubleDeclining(cost, usefulLife, purchaseDate);
                break;
            case "73a3c0e8-3ce0-4599-820a-77be59603b60":
                currentDep = this.unitOfProduction(cost, salvageVal, unitProduced[unitProduced.length - 1], totalUnits);
                break;
            case "48959b85-7434-4507-ad5f-dcb261b36517":
                currentDep = this.sumOfYears(cost, salvageVal, usefulLife, purchaseDate);
        }
        return currentDep;
    }

    getCumulativeDepreciation(depreciation: Depreciation, currentDep: number) {
        const cost: number = parseFloat(depreciation.cost);
        const salvageVal: number = parseFloat(depreciation.salvageVal);
        const usefulLife: number = parseFloat(depreciation.usefulLife);
        const unitProduced: number[] = depreciation.unitProduced.map(x => parseFloat(x));
        const totalUnits: number = parseFloat(depreciation.totalUnits);
        const purchaseDate: Date = new Date(depreciation.purchaseDate);
        const currentDate = new Date();
        const incDate: Date = purchaseDate;
        let currentDepYear = 1;
        incDate.setFullYear(incDate.getFullYear() + 1);
        while (currentDepYear < usefulLife && currentDate > incDate) {
            currentDepYear++;
            incDate.setFullYear(incDate.getFullYear() + 1);
        }

        let cumulativeDep = 0;
        switch (depreciation.methodId) {
            case "457b0ac1-b68b-4cbe-a341-b2a9e0c70c3e":
                cumulativeDep = this.roundValue(currentDep * currentDepYear);
                break;
            case "05da85af-337b-4d09-8a34-d0849f52d0d8":
                cumulativeDep = this.getDoubleDeclining(cost, usefulLife, purchaseDate, currentDepYear);
                // cumulativeDep = 0;
                break;
            case "73a3c0e8-3ce0-4599-820a-77be59603b60":
                cumulativeDep = this.getCumulativeUnitOfProd(cost, salvageVal, unitProduced, totalUnits);
                break;
            case "48959b85-7434-4507-ad5f-dcb261b36517":
                cumulativeDep = this.sumOfYears(cost, salvageVal, usefulLife, purchaseDate, currentDepYear);
        }
        return cumulativeDep;
    }

    getBookValue(cost: number, depreciation: number): number {
        return this.roundValue(cost - depreciation);
    }
}