import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import * as loader from './loaders';

const app = express();

loader.init(app);
