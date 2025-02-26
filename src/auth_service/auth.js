import conf from "../config/environment-config.js";
import { Client } from "appwrite";
import { ID } from "appwrite";
import { Account } from "appwrite";

export class AuthService {

    client;
    //the object responsible for handling account-related operations
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }



    /**
     * Given both the createAccount and login methods, here's what happens when you call createAccount:

        Account Creation: createAccount calls this.account.create() to create a new user account in the system.

        Automatic Login (Attempt): If the account creation is successful, createAccount then calls this.login({ email, password }) to log the user in.

        Session Creation: Inside login, this.account.createEmailPasswordSession(email, password) is called to verify the user's credentials and create a session.

        Return Value: login returns the session information (likely a token or cookie) to createAccount. createAccount then returns that session information (the result of the login) to its caller.
     */
    async createAccount({ email, password, username }) {
        try {

            /**
             * create is a method of the account object, specifically for creating new accounts
             */
            /**
             * The result of this.account.create()
             * (which is likely a Promise that resolves to a user object upon success or rejects with an error upon failure) 
             * is assigned to the user variable. This variable will hold the newly created user object if the creation was successful.
             */
            const user = await this.account.create(
                ID.unique(),//This generates a unique ID
                email,
                password,
                username
            );

            /**
             * if (user) Block: This checks if the user variable is truthy. 
             * In JavaScript, objects are generally truthy. 
             * So, if this.account.create() successfully creates the user and returns a user object, this condition will be true. 
             * If the creation fails and returns null, undefined, or false, the condition will be false.
             */
            if (user) {
                console.log("user created successfully");

                let result = this.login({ email, password });

                return result;
            }

            else {
                console.log("user not created some error occured");

            }


        } catch (error) {
            console.log("error occured");
            console.log(error);
            /**
             * This re-throws the error. 
             * This is important because it allows the caller of the createAccount method to handle the error as well. 
             * If you didn't re-throw the error, the caller would never know that the account creation failed.
             */
            throw error;

        }
    }


    async login({ email, password }) {
        try {
            /**
             * this.account.createEmailPasswordSession(email, password): This method is the key. 
             * It attempts to create an email/password session for the user. This likely involves:

            *Verifying that the provided email and password match a user account in the system.

            *If the credentials are valid, creating a session token or cookie that authenticates the user.
             */

            /**
             * The result variable will hold the session information or authentication token returned by createEmailPasswordSession.
             */
            const result = await this.account.createEmailPasswordSession(
                email,
                password
            );

            console.log("result of createEmailPasswordSession is ");
            console.log(result);
            return result;
        }
        catch (error) {
            console.log("error found");
            console.log(error);
            throw error;
        }
    }


    /**
     * The getCurrenctUser method attempts to retrieve the currently logged-in user's information.
     * It calls the get method of an account object, 
     * checks if a user object is returned, and then returns the user object or null if no user is logged in. 
     * It also handles potential errors. 
     */
    async getCurrenctUser() {
        let result = null;
        try {

            /**
             * this.account.get(): This is the core of the method. It calls the get method of the account object. 
             * 
             * The get method is likely responsible for: Checking if a user session exists
             *  (e.g., by looking for a valid session token in a cookie or local storage).
             * If a session exists, retrieving the corresponding user information from the system's database or authentication store.
             * Returning the user object. If no session exists, it might return null, undefined, or throw an error.
             */
            result = await this.account.get();

            /**
             * Checks if the result variable is truthy. 
             * If this.account.get() returns a user object,
             * this condition will be true. 
             * If it returns null, undefined, or false, it will be false.
             */
            if (result) {
                console.log("Current user:", user);
                return result;
            }
            else {
                console.log("No user is currently logged in.");
                return null;
            }

        } catch (error) {
            console.error("Failed to get current user:", error);
        }


    }


    /**
     * The logout method is designed to log the currently authenticated user out of the application 
     * by deleting all of their active sessions.
     */
    async logout() {
        try {

            /**
             * this.account.deleteSessions(): This is the core of the method. It calls the deleteSessions method of the account object. This method typically does the following:

            Identifies all active sessions associated with the currently authenticated user. How it identifies the user varies depending on the authentication library.

            Deletes those sessions. This usually involves removing session tokens from the server-side session store (e.g., a database or cache) and invalidating any client-side session identifiers (e.g., by clearing cookies).

            Because the code uses deleteSessions() (plural, with no arguments), this removes all sessions for the current user, logging them out of all devices and browsers.

            The use of deleteSessions() assumes you want to log the user out everywhere. If you have a use case to log out the user from the current device only, consider using deleteSession('current').
             */
            this.account.deleteSessions();
            console.log("Logged out successfully!");


        }
        catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }


}



const authService = new AuthService();

export default authService;