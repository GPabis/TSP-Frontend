import { makeAutoObservable, toJS } from 'mobx';
import L, {BaseIconOptions, LatLngExpression} from "leaflet";

export interface MapPointType {
    lat: number;
    lng: number;
    name: string;
    startingPoint: boolean;
    order?: number;
}

type AlgorithmType = 'ANT COLONY' | 'GENETIC ALGORITHM' | 'SWARM INTELLIGENCE' | 'LKH' | undefined;

export class AppState {
    public pointsArray: MapPointType[] = [];
    public distance?: number;
    public algorithm?: AlgorithmType;

    public constructor() {
        makeAutoObservable(this);
    }

    public get routeIsReady() {
        return this.points.length > 1 && this.pointsArray.filter((point) => point.order !== undefined).length === this.pointsArray.length;
    }

    public get points() {
        return this.pointsArray;
    };

    public get route(): LatLngExpression[] {
        const startingPoint = this.pointsArray.find(point => point.startingPoint === true);
        if(startingPoint === undefined) {
            return []
        }
        const filteredPoints = this.pointsArray.filter(point => !!point.order)
        const pointsByOrder = filteredPoints.sort((a, b) => a.order! - b.order!);
        const finalRoute: [number, number][] =  pointsByOrder.map(points => [points.lat, points.lng]);
        finalRoute.push([startingPoint!.lat, startingPoint!.lng]);
        return finalRoute;
    }

    public addPoint(point: MapPointType) {
        this.points.push(point);
    }

    public setIcon(starting: boolean) {
        const iconBaseSettings: BaseIconOptions = {
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }

        const blueIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            ...iconBaseSettings
        });

        const redIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            ...iconBaseSettings
        });

        return starting ? blueIcon : redIcon;
    }

    public deletePoint(point: MapPointType, e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if(this.routeIsReady === false) {
            const updatedPoints = this.pointsArray.filter(p => p.name !== point.name);
            if(!updatedPoints.find(p => p.startingPoint)) {
                updatedPoints[0].startingPoint = true;
            }
            this.pointsArray = updatedPoints;
        }
    }

    public setStartingPoint(point: MapPointType,  e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if(this.routeIsReady === false) {
            const previousStartingPoint = this.pointsArray.find(p => p.startingPoint);
            const updatedPoints = this.pointsArray.map(p => {
                if(p.name === point.name) {
                    p.startingPoint = true;
                }

                if(p.name === previousStartingPoint?.name) {
                    p.startingPoint = false;
                }
                return p;
            });
            this.pointsArray = updatedPoints;
        }
    }

    public setAlgorithm(algorithm: string) {
        this.algorithm = algorithm as AlgorithmType;
    }

    public findRoute() {}
}