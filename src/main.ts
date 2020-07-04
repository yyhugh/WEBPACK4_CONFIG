console.log("NODE_ENV", process.env.NODE_ENV);

import { sayHello, sayHi } from "./utils";
import { homeInit } from "./views/home";
import _ from "lodash";

sayHello();
sayHi();

homeInit();
console.log("lodash", _);
