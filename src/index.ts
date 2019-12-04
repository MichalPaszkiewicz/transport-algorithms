import * as matrix from "./maths/matrix";
export var Matrix = matrix;

import * as statistics from "./maths/statistics";
export var Statistics = statistics;

import * as calculus from "./maths/calculus";
export var Calculus = calculus;

import * as economics from "./economics";
export var Economics = economics;

import * as scheduling from "./scheduling";
export var Scheduling  = scheduling;

import * as management from "./management";
export var Management = management;

import * as costing from "./costing/costing";
export var Costing = costing;

import * as delays from "./traffic/delays";
export var Delays = delays;

import * as fuel from "./traffic/fuel";
export var Fuel = fuel;

import * as flow from "./traffic/flow";
export var Flow = flow;

import * as accidents from "./accidents";
export var Accidents = accidents;

import * as roadPricing from "./pricing/road";
export var RoadPricing = roadPricing;

import * as accessibility from "./urbanplanning/accessibility";
import * as landUse from "./urbanplanning/landuse";
import {carOwnershipGenerator} from "./urbanplanning/carownership";

export var UrbanPlanning = {
    Accessibility: accessibility,
    LandUse: landUse,
    carOwnershipGenerator
}