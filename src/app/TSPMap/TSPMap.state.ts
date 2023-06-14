import { makeAutoObservable } from 'mobx';
import L, {BaseIconOptions, LatLngExpression} from "leaflet";

const API_URL = import.meta.env.VITE_API_URL;

export interface AntColonyResponse {
    bestPathIndexes: number[];
    distance: number;
    time: string;
}

export interface MapPointType {
    lat: number;
    lng: number;
    name: string,
    nodeIndex: number;
    startingPoint: boolean;
    order?: number;
}

type AlgorithmType = 'antColonyAlgorithm' | 'branchAndBoundAlgorithm' | 'linKernighanAlgorithm';

export class TSPMapState {
    public pointsArray: MapPointType[] = [];
    public distance: number = 0;
    public algorithm?: AlgorithmType = 'antColonyAlgorithm'
    public time: string = '0';
    public loading: boolean = false;

    public constructor(public readonly isGuest: boolean) {
        makeAutoObservable(this);
    }

    public get routeIsReady() {
        return this.points.length > 1 && this.pointsArray.filter((point) => point.order !== undefined).length === this.pointsArray.length;
    }

    public get points() {
        return this.pointsArray;
    };

    public get disallowRequest(): boolean {
        if(!this.isGuest) return false;

        if(this.algorithm === 'antColonyAlgorithm') {
            return this.pointsArray.length > 100;
        }

        if(this.algorithm === 'branchAndBoundAlgorithm') {
            return this.pointsArray.length > 25;
        }

        return this.pointsArray.length > 150;
    }

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
            const updatedPoints = this.pointsArray.filter(p => p.nodeIndex !== point.nodeIndex);
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
                if(p.nodeIndex === point.nodeIndex) {
                    p.startingPoint = true;
                }

                if(p.nodeIndex === previousStartingPoint?.nodeIndex) {
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

    public resetPoints() {
        this.pointsArray = [];
        this.distance = 0;
        this.time = '0';
    }

    public async findRoute() {
        if(!this.disallowRequest) {
            const body = {
                nodes: this.pointsArray.map(point => {
                    return {
                        nodeIndex: point.nodeIndex,
                        lat: point.lat,
                        lng: point.lng
                    }
                })
            }

            this.loading = true;
            const response = await fetch(`${API_URL}/algorithms/${this.algorithm}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(body),
            });

            const data = (await response.json()) as AntColonyResponse;

            data.bestPathIndexes.forEach((node, index) => {
                const point = this.pointsArray.find(point => point.nodeIndex === node);
                if(point) {
                    point.order = index + 1;
                }
            });

            this.distance = parseFloat(String(data.distance.toFixed(3)));
            this.time = data.time;
            this.loading = false;
        }
    }
}