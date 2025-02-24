import conf from "../config/environment-config.js"
import { Query } from "appwrite";
import { Client } from "appwrite";
import { Databases } from "appwrite";
import { Storage } from "node-appwrite";
import { ID } from "node-appwrite";
import { use } from "react";
import { data } from "react-router-dom";

export class DatabaseService {

    client;
    databases;
    storage;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);

        this.storage = new Storage(this.client);
    }


    /**
     * This createPost method is a well-structured asynchronous function for creating a new post in a database. It does the following:

        Takes post details (title, content, featuredimages, status, userId).

        Generates a unique ID for the post.

        Calls a database service's createDocument method to create the new post in the database.

        Handles potential errors during the document creation process.

        Provides feedback to the console about the result of the operation.

        return newly created post 

        Re-throws errors to allow the caller to handle them appropriately.
     */
    async createPost({ title, content, featuredimages, status, userId }) {

        try {

            //This is the core of the method. It calls the createDocument method of the databases object to create a new document in the database.
            let result = await this.databases.createDocument(
                conf.appwriteDatabaseId,    //ID of the database where the post should be created


                conf.appwriteCollectionId,  //ID of the collection (or table) where the post should be stored


                ID.unique(),                //This generates a unique identifier (ID) for the new post



                //This is an object that contains the data for the new post
                {
                    title,
                    content,
                    featuredimages,
                    status,
                    userId
                }
            )

            console.log("result");
            console.log(result);

            return result;


        } catch (error) {
            console.log("error", error);

            throw error;
        }

    }



    /**
     * The updatePost method updates an existing post in a database. 
     * It takes the document ID and the fields to be updated as input, 
     * calls the updateDocument method of a database service, and returns the result.
     */
    async updatePost({ title, content, featuredimages, status, documentid }) {
        try {
            let result = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentid, // The ID of the post to update
                {
                    title,
                    content,
                    featuredimages,
                    status,
                }
            )

            console.log("Post updated successfully:", result);

            return result;
        } catch (error) {
            console.error("Failed to update post:", error);
            throw error;
        }
    }



    /**
     * The deletePost method is designed to delete a post (document) from an Appwrite database, given its documentid. 
     */
    async deletePost(documentid) {
        try {
            //This is the core of the method. It calls the deleteDocument method to delete the document.
            let result = await databases.deleteDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                documentid  // documentId
            )

            console.log(result);

            return true;

        }
        catch (error) {
            console.log(error);
            // throw error;
            return false;
        }
    }


    /**
     * The getPost method aims to retrieve a specific post (document) from an Appwrite database, identified by its documentId
     */
    async getPost(documentId) {


        try {
            let result = await this.databases.getDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                documentId  // documentId
            )

            return result;
        } catch (error) {
            console.log("error in getPost", error);
            return false;
        }
    }



    /**
     * The getPosts method is intended to retrieve a list of posts from an Appwrite database, 
     * filtering them to only include posts with a status of "active."
     */
    async getPosts() {
        try {

            //This is the core of the method. It calls the listDocuments method to retrieve a list of documents.
            let result = await databases.listDocuments(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                [
                    Query.equal("status", "active"),

                ]
            )

            console.log("list of post", result)

            return result;

        } catch (error) {
            console.log("error in getPosts", error);
            return false;
        }
    }


    /**
     * method uploads a file to an Appwrite storage bucket and returns the result.
     */
    async uploadFile(file) {
        try {

            //It calls the createFile method to upload the file.
            let result = await this.storage.createFile(
                conf.appwriteBucketId, //The ID of the Appwrite storage bucket where the file should be uploaded.
                ID.unique(), //Generates a unique ID for the file. This ensures that each file has a unique name in the bucket.
                file  // The file object to be uploaded. Appwrite expects this to be a standard JavaScript File object.
            );

            console.log("File uploaded successfully:", result);

            return result;

        } catch (error) {

            console.error("File upload failed:", error);

            return false;
        }

    }


    /**
     * The deleteFile method deletes a file from Appwrite Storage, given its file ID.
     */
    async deleteFile(fileid) {
        try {
            //The core of the method. It calls the deleteFile method to delete the file.
            let result = await this.storage.deleteFile(
                conf.appwriteBucketId, //The ID of the Appwrite storage bucket where the file resides.
                fileid // The ID of the file to be deleted.
            );

            console.log("file delete successfully", result);
            return result;

        } catch (error) {
            console.log("error in deleteFile", error);
            return false;
        }
    }



    getFilePreview(fileid) {
        try {
            const result = this.storage.getFilePreview(
                conf.appwriteBucketId, //The ID of the Appwrite storage bucket where the file resides.
                fileid // The ID of the file to be deleted.
            );

            console.log("file preview available");
            return result;
        } catch (error) {
            console.log("error in file preview");
        }
    }




}





const databaseservice = new DatabaseService();

export default databaseservice;