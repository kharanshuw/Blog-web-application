import conf from "../config/environment-config.js"
import { Query } from "appwrite";
import { Client } from "appwrite";
import { Databases } from "appwrite";
import { Storage } from "node-appwrite";
import { ID } from "node-appwrite";

export class DatabaseService {

    client;
    databases;
    storage;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
    }

}

const databaseservice = new DatabaseService();

export default databaseservice;