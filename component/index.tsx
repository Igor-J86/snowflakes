import React from "react";
import {createRoot} from 'react-dom/client';
import { Snowflakes } from "../src/snowflakes";

const root = createRoot(document.getElementById('ijsf-root')!);

root.render(
  <Snowflakes />
);
